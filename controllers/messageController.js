import Message from "../models/messageModel.js";

export const sendMessageController = async (req, res) => {
    try {
        const { senderId, receiverId, text, image } = req.body;

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
}

export const recieveMessageController = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
}