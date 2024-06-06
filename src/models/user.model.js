import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps }
);

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next()
    
    this.password = bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect(async function(password){
    return bcrypt.compare(password, this.password)
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
      _id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
      _id: this.id,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
};

export const User = mongoose.model("User", userSchema);
