//const STATUS = require("../constants/STATUS");
import jwt from "jsonwebtoken";
import User from "../models/User.js";
//const ERRORCODE = require("../constants/ERRORCODE");

export async function isAuthenticated(req, res, next) {
    try{
        let token = null;
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            token = req.headers.authorization.split(" ")[1];
          }
        //const { token } = req.cookies;
        console.log('--token--', token);       
        if(token==="undefined") {            
            return res.status(401).send(`{"errorCode":"USER0009", "error":"Unauthenticated Access!"}`);
          }        
          const decodedData = jwt.verify(token, process.env.JWT_SECRET);        
          req.user = await User.findById(decodedData.id);        
          next();

    }catch (error) {
      console.log("--Authenticate error--", error)
      if (JSON.stringify(error).includes("errorCode") || JSON.stringify(error).includes("message")) {
          return res.status(400).send(error);
      } else {
          return res.status(500).send(error);
      }
  }
   
};