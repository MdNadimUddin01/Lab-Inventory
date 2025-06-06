import { ObjectId } from "mongodb";
import { MongodbConnector } from "../../database/mongodb";
import { Router } from "express";
import { authUSer } from "../middleware/auth";

export function issuedInstrument(
  router: Router,
  mongodbConnector: MongodbConnector
) {
  router.post("/issue/instrument/:id", authUSer, async (req, res) => {
    const id = req.params.id;
    const userId = req.userInfo.id;

    const { dateOfReturn, costPaid } = req.body;
    //console.log(dateOfReturn);

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
          dateOfIssue: new Date(Date.now()),
          dateOfReturn: dateOfReturn,
          totalCost: existingInstrument.costPerPeice ?? 0,
          costPaid: costPaid ?? 0,
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

        if (existingInstrument.available == 0) {
          existingInstrument.status = "In Use";
        }

        const data = await mongodbConnector.saveDocument(
          "Instrument",
          { _id: existingInstrument._id },
          existingInstrument
        );

        return res.status(200).send({
          message: "Purchase Successfull",
        });
      } else {
        const alreadyRequest = await mongodbConnector.getDocument(
          "RequestInstrument",
          {
            instrumentId: new ObjectId(id),
            studentId: new ObjectId(userId),
          }
        );

        //console.log("alreadyRequest : ", alreadyRequest);

        if (alreadyRequest) {
          return res.status(409).send({
            message: "You have already Request this instrument",
          });
        }

        const requestInstrumentInfo = {
          instrumentId: new ObjectId(id),
          studentId: new ObjectId(userId),
          dateOfRequest: Date.now(),
          dateOfReturn: dateOfReturn,
        };

        const requestInstrument = await mongodbConnector.createDcoument(
          "RequestInstrument",
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

      // console.log("INSTRUMENT INFO ", instrumentInfo);

      const saveInstrument = await mongodbConnector.saveDocument(
        "Instrument",
        { _id: new ObjectId(instrumentInfo._id) },
        instrumentInfo
      );

      const requestInstrument = await mongodbConnector.getAllbasedOnsort(
        "RequestInstrument",
        { instrumentId: new ObjectId(instrumentDetails.instrumentId) },
        { dateOfRequest: 1 }
      );

      if (requestInstrument) {
        const { _id, studentId, instrumentId, dateOfRequest, dateOfReturn } =
          requestInstrument[0];

        const issuedRequestInstrument = await mongodbConnector.createDcoument(
          "IssuedInstrument",
          { instrumentId, studentId, dateOfIssue: dateOfRequest, dateOfReturn }
        );

        if (issuedRequestInstrument) {
          const deletedRequestInstrument =
            await mongodbConnector.deleteDocument("RequestInstrument", {
              studentId,
              instrumentId,
            });
        }

        // console.log("issuedRequestInstrument : ", issuedRequestInstrument);
      }

      // console.log("Sorted instrumentDetails : ", requestInstrument);

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
      const issuedInstrument = await mongodbConnector.getAllInstrument(
        "IssuedInstrument",
        {}
      );
      // console.log(issuedInstrument);
      // console.log("HELLO");
      // console.log(issuedInstrument.populate("studentId"));

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

  router.get(
    "/get/all/issued/instrument/fromLab",
    authUSer,
    async (req, res) => {
      try {
        const userId = req.userInfo.id;

        const instruments = await mongodbConnector.getAllInstrument(
          "IssuedInstrument",
          { studentId: new ObjectId(userId) }
        );

        res.status(200).send({
          message: "Instrument fetched",
          issuedInstrument: instruments,
        });
      } catch (error) {
        res.status(500).send({
          message: error.message,
        });
      }
    }
  );
}
