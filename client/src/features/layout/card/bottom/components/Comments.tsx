import "./comments.css";
interface IProps {
  item: string;
  i: number;
  picturePath?: string;
}
export const Comments = ({ item, i, picturePath }: IProps) => {
  return (
    <div className="commentsContainer">
      <div>{i + 1}.</div>{" "}
      <div>
        <img
          className="avatar"
          style={{ width: "20px", height: "20px" }}
          src={"http://localhost:3001/assets/" + picturePath}
        />{" "}
      </div>
      <div className="comment">{"  " + item}</div>
    </div>
  );
};
