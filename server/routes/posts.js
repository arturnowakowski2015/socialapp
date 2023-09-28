import express from "express";
import { posts, socketids } from "../data/index.js";
import { usersarr } from "../data/index.js";
const router = express.Router();

export const createPost = async (req, res) => {
  let uid = 0;
  try {
    const { input, commentPicture, picturePath, userid } = req.body;
    console.log(JSON.stringify(req.body));
    uid = userid;
    posts.unshift({
      _id: Math.floor(Math.random() * 100000),
      userId: userid,
      firstName: "Jane",
      lastName: "Doe",
      location: "Utah, CA",
      description: input,
      picturePath: commentPicture.split("\\")[2],
      userPicturePath: picturePath,
      likes: [],
      comments: [],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  req.app.get("socketio").emit("message_from_posts", {
    text: `user fff has created post `,
    uid: uid,
  });
};

export const addComment = async (req, res) => {
  console.log(4444);
  let post_id = 0;
  let comments = "";
  let u_id = 0;

  try {
    const { postid, userid, comment } = req.body.body;

    post_id = postid;
    comments = comment;
    posts?.[
      posts?.findIndex((t) => {
        return Number(t._id) === Number(post_id);
      })
    ].comments.unshift(comments);
    res.status(200).json(posts);
    u_id = userid;
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  usersarr.map((t) => {
    console.log(t._id + ":::" + u_id);
  });
  req.app
    .get("socketio")
    .to(
      socketids.get(
        usersarr[
          usersarr.findIndex((t) => {
            return Number(t._id) === Number(u_id);
          })
        ]._id
      )
    )
    .emit("message_from_comments", {
      text: `user ${
        usersarr[
          usersarr.findIndex((t) => {
            return Number(t._id) === Number(u_id);
          })
        ].email
      }
    commented your post ${
      posts[
        posts.findIndex((t) => {
          return Number(t._id) === Number(post_id);
        })
      ].description
    } `,
      flag: 1,
      uid: u_id,
    });
};
export const doLikes = async (req, res) => {
  let uid = 0;
  let postid = 0;
  let flag = 0;
  try {
    const { id, userId } = req.params;
    const likes = [];
    postid = id;
    uid = userId;
    posts.map((t) => {
      if (t._id === Number(id)) {
        if (t.likes.indexOf(Number(userId)) != -1) {
          t.likes.splice(
            t.likes.findIndex((tt) => {
              return tt === Number(userId);
            }),
            1
          );
          flag = 0;
        } else {
          t.likes.push(Number(userId));
          flag = 1;
        }
      }
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  console.log("uid   " + uid);
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
    .emit("message_from_likes", { text: `user  `, uid: uid, flag: flag });
};
export const postsOfUser = (req, res) => {
  try {
    const { userId } = req.params;

    res.status(200).json(
      posts.filter((t) => {
        return t.userId === Number(userId) && t;
      })
    );
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  console.log("fffffffffffffffffffffff");
};
export const getComments = async (req, res) => {
  try {
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export default router;
