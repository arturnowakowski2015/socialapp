import { User, Notifications } from "../data/Interface";
import { useState, useEffect } from "react";
import "./Owner.css";
interface IProps {
  login: User; 
  notifications:Notifications;
  refresh:()=>void
}

const Owner = ({refresh,  notifications, login }: IProps) => {
  return (
    <div className="nav">
      <div className="icons">


      <i className="fa fa-bell-o" aria-hidden="true"> {JSON.stringify(notifications.comments)}
             {notifications&& notifications.posts && notifications.posts.length!==0 && <div className="alert" onClick={refresh}>{notifications&& notifications.posts && notifications.posts.length}</div>}</i>

        <i className="f fa-regular fa-user">
          {notifications&& notifications.users && notifications.users.length!==0 && <div className="alert">{notifications&& notifications.users && notifications.users.length}</div>}
        </i> 
        <i className="f fa-regular fa-heart">
          {notifications && notifications.likes && notifications.likes.length!==0 && <div className="alert">{notifications && notifications.likes && notifications.likes.length}</div>}
        </i>
        <i className="f fa-regular fa-comment">
          {notifications&& notifications.comments && notifications.comments.length!==0 && <div className="alert">{notifications&& notifications.comments && notifications.comments.length}</div>}
        </i>
      </div> 
      <div className="label">{login && login.email}</div> 
      <div>
        {login &&
          login.friends.map((t) => {
            return <div>{t}</div>;
          })}
      </div>
    </div>
  );
};
export default Owner;
