import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
const PORT=4000;


app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello Backend...");
  });

  app.post("/transaction", (req, res) => {
    console.log('--req--');
    res.send("form data...");
  });

  await mongoose.connect('mongodb+srv://mongo089:mongo089@cluster0.lxk3ppj.mongodb.net/?retryWrites=true&w=majority');
console.log('Mongo Db connected..');
  app.listen(PORT, () => {
    console.log("Server is running at http://localhost:4000");
  });