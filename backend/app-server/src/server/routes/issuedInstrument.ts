import { ObjectId } from "mongodb";
import { MongodbConnector } from "../../database/mongodb";
import { Router } from "express";
import { authUSer } from "../middleware/auth";

export function issuedInstrument(
  router: Router,
  mongodbConnector: MongodbConnector
) {
  
  router.get("/issue/instrument/:id", authUSer, async (req, res) => {
    const id = req.params.id;
    const userId = req.userInfo.id;

    const { dateOfReturn, costPaid } = req.body;

    try {
      const existingInstrument = await mongodbConnector.getDocument(
        "Instrument",
        { _id: new ObjectId(id) }
      );

      if (!existingInstrument) {
        return res.status(404).send({
          message: "Instrument not found",
        });
      }

      const alreadyIssued = await mongodbConnector.getDocument(
        "IssuedInstrument",
        {
          instrumentId: new ObjectId(id),
          studentId: new ObjectId(userId),
        }
      );

      if (alreadyIssued) {
        return res.status(409).send({
          message: "You have already issued this instrument",
        });
      }

      if (existingInstrument.available > 0) {
        const issueInstrumentInfo = {
          instrumentId: new ObjectId(id),
          studentId: new ObjectId(userId),
          dateOfIssue: Date.now(),
          dateOfReturn: dateOfReturn,
          totalCost: existingInstrument.costPerPeice,
          costPaid: costPaid,
        };

        const issuedInstrument = await mongodbConnector.createDcoument(
          "IssuedInstrument",
          issueInstrumentInfo
        );

        if (!issuedInstrument) {
          return res.status(400).send({
            message: "Purchase Failed",
          });
        }

        existingInstrument.available--;

        const data = await mongodbConnector.saveDocument(
          "Instrument",
          { _id: existingInstrument._id },
          existingInstrument
        );

        return res.status(200).send({
          message: "Purchase Successfull",
        });
      } else {
        console.log("REQUEST HERE");
        const alreadyRequest = await mongodbConnector.getDocument(
          "RequestInstrument",
          {
            instrumentId: new ObjectId(id),
            studentId: new ObjectId(userId),
          }
        );

        if (alreadyRequest) {
          return res.status(409).send({
            message: "You have already Request this instrument",
          });
        }

        const requestInstrumentInfo = {
          instrumentId: new ObjectId(id),
          studentId: new ObjectId(userId),
          dateOfReques: Date.now(),
          dateOfReturn: dateOfReturn,
        };

        const requestInstrument = await mongodbConnector.createDcoument(
          "requestInstrument",
          requestInstrumentInfo
        );

        if (!requestInstrument) {
          return res.status(400).send({
            message: "Request Failed",
          });
        }

        return res.status(200).send({
          message: "Request Successfull",
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  });

  router.delete("/submit/instrument/:id", authUSer, async (req, res) => {
    const userId = req.userInfo.id;
    const { id } = req.params;

    try {
      const instrumentDetails = await mongodbConnector.getDocument(
        "IssuedInstrument",
        { _id: new ObjectId(id), studentId: new ObjectId(userId) }
      );

      console.log("ISSUED INSTRUMENT : ", instrumentDetails);
      if (!instrumentDetails) {
        return res.status(404).send({
          message: "Instrument Not Found",
        });
      }

      const deletedIssuedInstrument = await mongodbConnector.deleteDocument(
        "IssuedInstrument",
        { _id: new ObjectId(id) }
      );

      if (!deletedIssuedInstrument) {
        return res.status(400).send({
          message: "Instrument submission failed",
        });
      }

      const instrumentInfo = await mongodbConnector.getDocument("Instrument", {
        _id: new ObjectId(instrumentDetails.instrumentId),
      });

      instrumentInfo.available = instrumentInfo.available + 1;

      console.log("INSTRUMENT INFO ", instrumentInfo);

      const saveInstrument = await mongodbConnector.saveDocument(
        "Instrument",
        { _id: new ObjectId(instrumentInfo._id) },
        instrumentInfo
      );

      return res.status(200).send({
        message: "Instrument submission successfull",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  });

  router.get("/get/issued/instrument/:id", authUSer, async (req, res) => {
    const { id } = req.params;

    try {

      const alreadyIssued = await mongodbConnector.getDocument(
        "IssuedInstrument",
        {
          instrumentId: new ObjectId(id),
        }
      );

      if (!alreadyIssued) {
        return res.status(404).send({
          message: "You haven't issued this instrument",
        });
      }

      return res.status(200).send({
        message: "Instrument fetched successfull",
        instrument: alreadyIssued,
      });

    } catch (error) {
      return res.status(501).send({
        message: "Internal Server Error",
      });
    }
    
  });

  router.get("/get/all/issued/instrument", async (req, res) => {
    try {
      const issuedInstrument = await mongodbConnector.getDocuments(
        "IssuedInstrument",
        {}
      );

      if (!issuedInstrument) {
        return res.status(404).send({
          message: "Instrument not found",
        });
      }

      return res.status(200).send({
        message: "Instrument fetched",
        issuedInstrument,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

}
