import express from "express";
import { usersarr, socketids } from "../data/index.js";

const router = express.Router();
export const getUsers = async (req, res) => {
  res.status(200).json(usersarr);
};
export const addFriend = async (req, res) => {
  let uemail = "";
  let uid = 0;
  let flag = 0;
  try {
    const { email, userId } = req.params;
    uemail = email;
    uid = userId;
    usersarr.map((t) => {
      if (t.email === email) {
        if (t.friends.indexOf(Number(userId)) != -1) {
          console.log(
            333333333 + "::" + JSON.stringify(t.friends) + ":::" + userId
          );
          t.friends.splice(
            t.friends.findIndex((tt) => {
              return tt === Number(userId);
            }),
            1
          );
          console.log(
            44444444 + "::" + JSON.stringify(t.friends) + ":::" + userId
          );
          flag = 0;
        } else {
          t.friends.push(Number(userId));
          flag = 1;
        }
      }
    });

    res.status(200).json(
      usersarr.filter((t) => {
        return t.email === email && t;
      })[0]
    );
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  if (uid !== undefined)
    req.app
      .get("socketio")
      .to(
        socketids.get(
          usersarr &&
            usersarr[
              usersarr &&
                usersarr.findIndex((t) => {
                  return Number(t._id) === Number(uid);
                })
            ]._id
        )
      )
      .emit("message_from_users", {
        text: `user ${
          usersarr?.[
            usersarr?.findIndex((t) => {
              return Number(t._id) === Number(uid);
            })
          ].email
        }
    added You to friends  `,
        flag1: flag,
      });
};
export const getUser = (req, res) => {
  try {
    const { userId } = req.params;

    res.status(200).json(
      usersarr.filter((t) => {
        return t._id === Number(userId) && t;
      })[0]
    );
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getFriends = (req, res) => {
  try {
    const { set } = req.params;
    let setarr = [];
    if (set !== undefined) setarr = set.split(",");

    const namearr = [];
    const resp = [];
    if (set !== undefined)
      usersarr.forEach((t) => {
        setarr.map((tt) => {
          if (tt.indexOf(t._id) !== -1)
            if (resp.indexOf(t.email) === -1) {
              resp.push(t.email);
            } else
              resp.splice(
                resp.findIndex((t) => {
                  return t === t.email && t;
                }),
                1
              );
        });
      });
    // console.log(
    //   "op            " + JSON.stringify(set) + ":::" + JSON.stringify(resp)
    // );
    res.status(200).json(resp);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export default router;
