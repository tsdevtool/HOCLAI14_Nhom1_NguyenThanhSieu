import { useAuthContext } from "../../context/AuthContext.jsx";
import useConversation from "../../zustand/useConvesation.js";
import { extractTime } from "../../utils/extractTime.js";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const nameAvatar = fromMe ? "You" : selectedConversation.fullName;
  const fommattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt={`Avatar of ${nameAvatar}`} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div
        className={`chat-footer opacity-50 text-xs flex gap-1 items-center text-white`}
      >
        {fommattedTime}
      </div>
    </div>
  );
};

export default Message;
