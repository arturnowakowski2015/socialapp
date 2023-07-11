import { User, Notifications } from "../data/Interface";
import { useReducer } from "react";
import { reducer, Action } from "../hooks/useNotificationReducer";
import "./Owner.css";
interface IProps {
  login: User;
  notifications: Notifications;
  refresh: () => void;
}

const Owner = ({ refresh, notifications, login }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    users: [],
    likes: [],
    comments: [],
    posts: [],
  });
  return (
    <div className="nav">
      <div className="icons">
        <i className="fa fa-bell-o" aria-hidden="true">
          {" "}
          {JSON.stringify(notifications.comments)}
          {notifications &&
            notifications.posts &&
            notifications.posts.length !== 0 && (
              <div
                className="alert"
                onClick={() => {
                  dispatch({ type: "resetPost" });
                }}
              >
                {notifications &&
                  notifications.posts &&
                  notifications.posts.length}
              </div>
            )}
        </i>

        <i className="f fa-regular fa-user">
          {state.users.length !== 0 && (
            <div
              className="alert"
              onClick={() => {
                dispatch({ type: "resetUsers" });
              }}
            >
              {notifications &&
                notifications.users &&
                notifications.users.length}
            </div>
          )}
        </i>
        <i className="f fa-regular fa-heart">
          {state.likes.length !== 0 && (
            <div
              className="alert"
              onClick={() => {
                dispatch({ type: "resetLikes" });
              }}
            >
              {notifications &&
                notifications.likes &&
                notifications.likes.length}
            </div>
          )}
        </i>
        <i className="f fa-regular fa-comment">
          {state.comments.length !== 0 && (
            <div
              className="alert"
              onClick={() => {
                dispatch({ type: "resetComments" });
              }}
            >
              {notifications &&
                notifications.comments &&
                notifications.comments.length}
            </div>
          )}
        </i>
      </div>
      <div className="label">{login && login.email}</div>
      <div>
        {login &&
          login.friends &&
          login.friends.map((t) => {
            return <div>{t}</div>;
          })}
      </div>
    </div>
  );
};
export default Owner;
