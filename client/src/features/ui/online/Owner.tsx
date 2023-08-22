import { User, Notifications } from "../../../model/Interface";
import { useReducer } from "react";
import { reducer, Action } from "./api/useNotificationReducer";
import "./Owner.css";
interface IProps {
  login: User;
  notifications: Notifications;
  refresh: () => void;
}

export const Owner = ({ refresh, notifications, login }: IProps) => {
  return (
    <div className="nav">
      <div className="icons">
        <i className="fa fa-bell-o" aria-hidden="true">
          {" "}
          {JSON.stringify(notifications.comments)}
          { 
            notifications?.posts?.length !== 0 && (
              <div
                className="alert"
                onClick={() => {
                  refresh();
                }}
              >
                { 
                  notifications?.posts?.length}
              </div>
            )}
        </i>

        <i className="f fa-regular fa-user">
          {notifications.users.length !== 0 && (
            <div className="alert" onClick={() => {}}>
              { 
                notifications?.users?.length}
            </div>
          )}
        </i>
        <i className="f fa-regular fa-heart">
          {notifications.likes.length !== 0 && (
            <div className="alert" onClick={() => {}}>
              { 
                notifications?.likes?.length}
            </div>
          )}
        </i>
        <i className="f fa-regular fa-comment">
          {notifications.comments.length !== 0 && (
            <div className="alert" onClick={() => {}}>
              { 
                notifications?.comments?.length}
            </div>
          )}
        </i>
      </div>
      <div className="label">{login && login.email}</div>
      <div>
        {
          login?.friends?.map((t: any) => {
            return <div>{t}</div>;
          })}
      </div>
    </div>
  );
};
