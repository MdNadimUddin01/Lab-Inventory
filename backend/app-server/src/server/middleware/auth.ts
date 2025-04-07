import jwt from "jsonwebtoken"
import {environment} from "../../environment"
export function authUSer(req , res , next){

    const token = req.body.token || req.cookies
    console.log("TOKEN " , req.body);
    req.userInfo = jwt.verify(token , environment.jwtSecret);
    next();

}