import express from "express";
import { usersarr, posts, socketids } from "../data/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
export const loginUser = async (req, res) => {
 
  try {
    const { email, password } = req.body;
 
    const user = usersarr.filter((t) => {
      return t.email === email && t;
    });
    if (user === 0)
      return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 


};
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    if (
      usersarr.filter((t) => {
        return t.email === email || (t.password === password && t);
      }).length > 0
    )
      res.status(404).json({ message: "already exists user" });
    else {
      usersarr.push({
        _id: new Date().getTime(),
        firstName,
        lastName: "sssssss",
        email:email,
        password: passwordHash,
        picturePath,
        friends: [],
        location: "New York",
        occupation: "private",
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
 
      res.status(201).json(
        usersarr.filter((t) => {
          return t.email === email && t;
        })[0]
      );
    }
    console.log(9999)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default router;
