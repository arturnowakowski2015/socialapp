import { User } from "../data/Interface";
import "./CreatePostCard.css";
interface IProps {
  token: string;
  onlineUser: User;
  setInput: (str: string, str2: string, onlineUser: User) => void;
  sendPost: (token: string, onlineUser: User) => void;
  socket:Object;
} 
const CreateCommentCard = ({
  token,
  setInput,
  sendPost,
  onlineUser,
  socket
}: IProps) => {
  return (
    <div className="card"> 
      <div className="commentsInput">
        <div>
          <div className="text">
            <textarea
              onChange={(e) =>
                setInput("input", e.currentTarget.value, onlineUser)   
              }  
            ></textarea>   
          </div>
          <div className="imageInput">  
            <input
              type="file"
              onChange={(e) =>
                setInput("imagePath", e.currentTarget.value, onlineUser)
              } 
            />
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="button">
        <button onClick={() => sendPost(token, onlineUser)}>submit</button>
      </div>
    </div>
  );
};
export default CreateCommentCard;
