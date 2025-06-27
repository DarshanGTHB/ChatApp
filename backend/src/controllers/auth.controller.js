import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      // console.log("Already signed user : " , user );
      return res
        .status(400)
        .json({ success: false, message: "Email is already exist" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          fullName,
          email,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      generateToken(user._id, res);

      return res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          email,
          profilePic: user.profilePic,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("login error : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "Logged Out successfully" });
  } catch (error) {
    console.log("login error : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const  updateProfilePic = async (req, res) => {
  try {
    const { _id } = req.user;
    const { profilePic } = req.body;
    if (!profilePic) {
      return res
        .status(400)
        .json({ success: false, message: "Profile Pic is Required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.log("Error in updateProfilePic controller ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


// below function used at time of refresh a page.
export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in checkAuth controller ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });  
  }
};
