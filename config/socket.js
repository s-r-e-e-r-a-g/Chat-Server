import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const users = {}; 


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('addUser', ({ userId, socketId }) => {
        users[userId] = socketId; 
        console.log("Users list:", users);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const newMessage = new Message({ senderId, receiverId, text: message });
        // console.log(`${senderId} sends ${message} to ${receiverId} `)

        try {
            await newMessage.save();
            await User.findByIdAndUpdate(senderId, { lastMessage: message });
            await User.findByIdAndUpdate(receiverId, { lastMessage: message });
            
            const receiverSocketId = users[receiverId];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
            }
        } catch (error) {
            console.error("Message saving error:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        Object.keys(users).forEach(userId => {
            if (users[userId] === socket.id) {
                delete users[userId];
            }
        });
    });
});
export { app, server }
