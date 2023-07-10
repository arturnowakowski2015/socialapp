import { Posts } from "../data/Interface";
interface IProps {
  post: Posts;
}
const CenterCard = ({ post }: IProps) => {
  return (
    <div>
      {" "}
      <img  
        className="postPicture"
        src={"http://localhost:3000/assets/" + post.picturePath}              
      ></img>
      <div className="description">{post.description}</div>   
    </div>
  ); 
};
export default CenterCard;
 