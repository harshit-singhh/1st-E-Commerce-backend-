import { User } from "../Models/User.js";
import { generateToken } from "../Middlewares/jwt.js";
import asyncHandler from "express-async-handler";

// user register
export const register = asyncHandler(async (req, res) => {
    const data = req.body;
    let user = await User.findOne({ email: data.email });
    if (user) {
        return res.json({ message: "User Already exist ", success: false });
    }
    const newUser = new User(data);
      
    const response = await newUser.save();
    if (!response) {
      throw new Error("Server Error");
    }
   
    res.json({
        message: "User register successfully...! ",
        user : newUser,
        success: true,
    });
});
  

// user login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  let user = await User.findOne({ email });
  
  if (!user) return res.json({ message: "User Not Found", success: false });

    if (!(await user.comparePassword(password))) {
         return res.json({ message: "Invalid Credential", success: false });
    }
    
    const payload = {
      id: user._id,
    };
      
    const token = generateToken(payload);

    res.json({ message: `Welcome ${user.name}`, token, success: true });
  
});

// get All users
export const users = asyncHandler(async (req, res) => {
  
    let users = await User.find().sort({ createdAt: -1 });
    if (!users) {
        throw new Error("Internal Server Issue");
    }
    res.json(users);
  
});

// get profile
export const profile = async (req, res) => {
  res.json({ user: req.user });
};
