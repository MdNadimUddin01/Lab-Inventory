import {MongodbConnector} from "../../database/mongodb/index"

export const checkPermission = (permissionFor , mongodbConnector:MongodbConnector) => {


    return async(req , res, next) => {

        try {

            const {id} = req.userInfo;
            console.log("ID " , id)
            const permission = await mongodbConnector.getDocument("Permition" , {userId :id});
            console.log("permission : " , permission);
            next();

        } catch (error) {

            return res.status(500).send({
                message:"Internal server error"
            })
            
        }

    }
    

}