import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiverId: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
  
    return res.status(200).json({success: true, messages});
  } catch (error) {
    console.error("Error in getMessages: ", error.message);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { text } = req.body;
    const myId = req.user._id;

    let imageUrl ;
    if(req.file){
      imageUrl = req.file.path; // The path to the uploaded image
      // imagePublicId = req.file.filename; // The public ID of the uploaded image in Cloudinary
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId,
      text,
      image: imageUrl || null,
    });

    await newMessage.save();
    
    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};  