import { User } from "../../../../model/Interface";
import "./whoisonline.css";
interface IProps {
  onlineUser: User;
  token: string;
  changeProfile: (user: User, token: string, url: string) => void;
}
export const WhoisOnline = ({ onlineUser, token, changeProfile }: IProps) => {
  return (
    <>
      <div className="containerOnline">
        <label className="titleOnline">online:</label>
        <span className="span"></span>
        <div
          className="image"
          onClick={() => {
            alert(9);
            changeProfile(
              onlineUser,
              token,
              "http://localhost:3001/users/" + onlineUser._id
            );
          }}
        >
          <img
            className="avatarOnline"
            src={"http://localhost:3001/assets/" + onlineUser.picturePath}
          />
        </div>{" "}
        <span className="span"></span>
        <div
          className="title"
          onClick={() =>
            changeProfile(
              onlineUser,
              token,
              "http://localhost:3001/users/" + onlineUser._id
            )
          }
        >
          {onlineUser.email}{" "}
        </div>
      </div>
      <hr />
    </>
  );
};
