import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: "https://picsum.photos/200/300",
    },
    lastMessage:{
        type: String,
        default: "No message yet"
    }
},
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;