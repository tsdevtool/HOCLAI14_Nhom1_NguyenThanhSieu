import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req, res)=>{
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        //Kiem tra co tin nhan nao giua 2 nguoi hay chua
        let conversation = await Conversation.findOne({
            participants: {$all:[senderId, receiverId]},
        });

        //Neu chua co set them thong tin vi du lieu default da duoc setup ben model nen khong can phai them message ma chi can them nguoi nhan nguoi gui
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();


        //this will run in parallel - chay song song
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    }catch(error){
        console.log("Error is sendMessage controller: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessage = async(req, res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId, userToChatId]},
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }


        const messages = conversation.messages;

        res.status(200).json(messages);

        
    } catch (error) {
        console.log("Error is getMessage controller: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}