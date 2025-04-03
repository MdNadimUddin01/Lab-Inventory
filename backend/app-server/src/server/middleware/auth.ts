import jwt from "jsonwebtoken"
import {environment} from "../../environment"
export function authUSer(req , res , next){

    const {token} = req.cookies
    req.userInfo = jwt.verify(token , environment.jwtSecret);
    next();

}