import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        required: [true, "Password is required"],
        type: String,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    verifyCode: {
        type: String,
        required: false,
    },
    verifyCodeExpiry: {
        type: Date,
        required: false
    },
    isAcceptingMessages: {
        type: Boolean,
        required: true
    },
    messages: {
        type: [MessageSchema],
        required: false
    }
})