import { Posts } from "../../../../model/Interface";
interface IProps {
  post: Posts;
}
export const CenterCard = ({ post }: IProps) => {
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
