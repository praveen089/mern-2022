import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;


let UserSchema = new Schema(
  {
    firstName: { type: String, required: ["First name field is required"] },
    lastName: { type: String, required: ["Last name field is required"] },
    mobile: {type: Number},
    email: { type: String, required: ["Email field is required"] },
    password: { type: String, required: ["Password field is required"] , max: 15, select: false},
    categories: [{ label: String, icon: String }],
    dob: {type: String},
    address: {type: String},
    photo: {type: String},
    is_active: Number,
    user_type: Number,
	  created_at: { type: Date },
	  updated_at: { type: Date }
  },
  { timestamps: true }
);
//Hashing Password
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
      next();
  }
  this.password= await bcrypt.hash(this.password, 10);
});

// Compare Password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT TOKEN
UserSchema.methods.getJWTToken = function () {
  const payload= {id: this._id, email:this.email};
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


export default new mongoose.model("User", UserSchema);

//module.exports = mongoose.model('User', UserSchema);