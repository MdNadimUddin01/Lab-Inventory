import { Router } from "express";
import { MongodbConnector } from "../../database/mongodb";
import { authUSer } from "../middleware/auth";
import { checkPermission } from "../middleware/checkPermission";
import {ObjectId} from "mongodb"

export function instrument(router: Router, mongodbConnector: MongodbConnector) {
  router.post(
    "/create/instrument",
    authUSer,
    checkPermission("canAddInstrument", mongodbConnector),
    async (req, res) => {
      const { id } = req.userInfo;

      try {
        const { instrument } = req.body;
        instrument.userId = id;

        const addInstrumentStatus = await mongodbConnector.createDcoument(
          "Instrument",
          { ...instrument, userId: id }
        );

        if (!addInstrumentStatus) {
          return res.status(400).json({
            message: `${instrument.instrumentName} failed to add in lab`,
          });
        }

        return res.status(200).send({
          message: `${instrument.instrumentName} added in Lab`,
          addInstrumentStatus,
        });
      } catch (error) {
        return res.status(500).send({
          message: error.message,
        });
      }
    }
  );

  router.get("/get/instrument/:id", async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) {
        return res.status(400).send("Inventory Id is required");
      }

      const instrument = await mongodbConnector.getDocument("Instrument", {
        "_id": new ObjectId(id),
      });

      if (!instrument) {
        return res.status(404).send({
          message: "Instrument not found",
        });
      }

      return res.status(200).send({
        message: "Instrument fetched",
        instrument,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  router.get("/get/all/instrument", async (req, res) => {

    try {
      
      const instrument = await mongodbConnector.getDocuments("Instrument" , {});

      if (!instrument) {
        return res.status(404).send({
          message: "Instrument not found",
        });
      }

      return res.status(200).send({
        message: "Instrument fetched",
        instrument,
      });

    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  });

  router.put(
    "/update/instrument/:id",
    authUSer,
    checkPermission("canEditInstrument", mongodbConnector),
    async (req, res) => {

        const instrument = req.body;
        const id = req.params.id;
        instrument.userId = req.userInfo.id

        try {

            const existingInstrument = await mongodbConnector.getDocument("Instrument" , {"_id" : new ObjectId(id)});

            if(!existingInstrument){
                return res.status(404).send({
                    message:"Instrument not found"
                })
            }

            await mongodbConnector.saveDocument("Instrument" ,{"_id" : new ObjectId(id)} , instrument)

            const updatedInstrument = await mongodbConnector.getDocument("Instrument" , {"_id" : new ObjectId(id)});
        
    
            return res.status(200).send({
                message:"Instrument updated",
                updatedInstrument
            })
    
        } catch (error) {
            return res.status(500).send({
                message : error.message
            })
        }
    }
  );

  router.delete(
    "/delete/instrument/:id",
    authUSer,
    checkPermission("canDeleteInstrument", mongodbConnector),
    async (req, res) => {}
  );

  // router.
}
