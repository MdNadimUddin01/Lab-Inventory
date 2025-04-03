import { Router } from "express";
import { User } from "model";
import { Db } from "mongodb";
import { MongodbConnector } from "../../database/mongodb";
import bcrypt from "bcrypt";
import { userInfo } from "os";
import jwt from "jsonwebtoken"
import { environment } from "../../environment";

export function user(router: Router, mongodbConnector: MongodbConnector) {
  router.post("/signup", async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;

    if (!name || !email || !password || !role || !phoneNumber) {
      return res.status(400).send("Wrong Credentilas");
    }

    try {
      const result = await mongodbConnector.getDocument("User", { email });

      if (result) {
        return res.status(409).send("User already exist");
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await mongodbConnector.createDcoument("User", {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        phoneNumber: phoneNumber,
      });

      
      const userId = user.insertedId;

      const flag = role === "Admin";

      const permition = await mongodbConnector.createDcoument("Permition", {
        userId,
        canAddInstrument: flag,
        canEditInstrument: flag,
        issueAnInstrument: flag,
        requestForIssue: !flag,
        canDeleteInstrument: flag,
      });

      // console.log("USER : ", user);

      res.status(200).send({
        message: `User Signup sucessfully as ${role}`,
        user,
      });
    } catch (error) {
      return res.status(500).send({
        message: "User Creation Failed",
      });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await mongodbConnector.getDocument("User", { email: email });
      // console.log(user);

      if (!user) {
        return res
          .status(404)
          .send("User not registered. Please sign up to create an account.");
      }

        const match = bcrypt.compareSync(password , user.password);

        if (!match) {
          return res.status(401).send("Invalid Password");
        }

        const payload = {
          email,
          id:user._id
        }
  
        const token = jwt.sign(payload ,environment.jwtSecret , {expiresIn : "24h"})

      return res.cookie("token" , token).status(200).send({
        message: "Login successful. Welcome back!",
        user,
      });

    } catch (error) {
      return res.status(501).send("Internal serval error");
    }
  });
}
