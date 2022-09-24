import express from "express";
import connect from './db/mongodb.js';
import cors from 'cors';
import Transaction from "./models/Transaction.js";
import User from "./models/User.js";
import {isAuthenticated} from './middleware/authenticate.js'


const app = express();
const PORT=4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/transaction", isAuthenticated, async(req, res) => {
    //res.send("Hello Backend...");
    let transaction = await Transaction.find().sort({_id:-1});
    console.log('--fetch--', transaction);
    //res.json({ data: transaction });
    return res.status(200).send(transaction);
  });

  app.post("/transaction", async(req, res) => {
    //console.log('--req--', req.body);
    const {amount, description, transaction_date}= req.body;
    const transaction = new Transaction({amount, description, transaction_date});
    await transaction.save();
    res.status(200).json({ message: "Added successfully" });
  });

  app.delete("/transaction/:id", async(req, res) => {
    try{
        if(req.params.id){
            const transaction = await Transaction.findByIdAndDelete({_id: req.params.id})
            res.status(200).json({ message: "Deleted successfully" });
        }
    }catch(err){
        console.log('--catch err---', err);
        return res.status(500).send(err);
    }

   
    
  });

  app.patch("/transaction/:id", async(req, res) => {
    try{
        if(req.params.id){
            const update = await Transaction.findByIdAndUpdate({_id: req.params.id},  { $set: req.body })
            res.status(200).json({ message: "Updated successfully" });
        }
    }catch(err){
        console.log('--catch err---', err);
        return res.status(500).send(err);
    } 
    
  });

  // Register New User
app.post('/auth/register', async(req, res) => {
    try {    
        console.log('--req.bdy--', req.body);   
        const email = req.body.email;
        const checkUser = await User.findOne({email});
        if(checkUser) {            
            return res.status(406).send(`{"errorCode":"USER0008", "error":"User already exists"}`);
        }   
               
       const userDetails = new User();    
           userDetails.firstName = req.body.firstName;
           userDetails.lastName = req.body.lastName;      
           userDetails.email= req.body.email;
           userDetails.password= req.body.password;    
           userDetails.is_active= 1;
           userDetails.user_type= 1;
           userDetails.created_at= new Date();
           await userDetails.save();    
           //let token = generateToken(userDetails, res);
           
           return res.status(201).send(userDetails); 
   } catch (error) {
       console.log("--Register error", error)       
        return res.status(500).send(error);
     
   }
   });

// Login
app.post('/auth/login', async  (req, res)=> {
    try{
        //console.log('---req---', req.body);
        const { email, password } = req.body;
        if (!email) return res.status(500).send(`{"errorCode":"USER0005", "error":"Email Required"}`);
        if (!password) return res.status(500).send(`{"errorCode":"USER0007", "error":"Password Required"}`);
        
        const user = await User.findOne({ email }).select("+password");
        if(!user) {            
            return res.status(401).send(`{"errorCode":"USER0008", "error":"Email or Password Wrong"}`);
        }
        const isPasswordMatched = await user.comparePassword(password);
        console.log('--Match--', isPasswordMatched);
        if (!isPasswordMatched) {
            return res.status(STATUS.UNAUTHORIZED).send(`{"errorCode":"USER0008", "error":"${ERRORCODE.USER.USER0008}"}`);
        }
        //let token = await generateToken(user, res);
        let token = await user.getJWTToken(); 
        console.log('--token--', token);
        //res.status(200).send(token);
        res.status(200).json({ message: "succesfully logged in.", token, user });
        
    } catch (error) {
        
            return res.status(500).send(error);
        
    }
});


const generateToken = async(user, res) => {
    try{
      const token = user.getJWTToken();  
      // options for cookie
      const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options);
      let tokResp = {success: true, user,token};
      return  tokResp;
      
    }catch (error) {
      console.log("--jwt error--", error)     
      return res.status(STATUS.INTERNAL_SERVER_ERROR).send(error);      
  }
    
};

  await connect();   
  
const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});