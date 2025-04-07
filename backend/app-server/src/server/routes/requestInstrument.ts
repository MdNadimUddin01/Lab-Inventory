import { MongodbConnector } from "../../database/mongodb";
import { Router } from "express";
import { authUSer } from "../middleware/auth";
import { ObjectId } from "mongodb";

export function requestInstrument(
  router: Router,
  mongodbConnector: MongodbConnector
) {

  router.get("/get/requested/instrument/:id", authUSer, async (req, res) => {
    const userId = req.userinfo.id;
    const { id } = req.params;

    try {

      const requestedInstrument = await mongodbConnector.getDocument(
        "RequestInstrument",
        {instrumentId: new ObjectId(id) }
      );

      if (!requestedInstrument) {
        return res.status(404).send({
          message: "You haven't requested this instrument",
        });
      }

      return res.status(200).send({
        message: "Instrument fetched successfull",
        instrument: requestedInstrument,
      });
      
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  });

  router.get("/get/all/requested/instrument", async (req, res) => {
    try {
    
      const requestedInstrument = await mongodbConnector.getAllInstrument(
        "RequestInstrument",
        {}
      );

      if (!requestedInstrument) {
        return res.status(404).send({
          message: "Instrument not found",
        });
      }

      return res.status(200).send({
        message: "Instrument fetched",
        requestedInstrument,
      });

    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

}
