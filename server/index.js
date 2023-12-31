import express from "express";
import bodyParser from "body-parser";

import cors from "cors";

import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { loginUser, register } from "./routes/auth.js";
import {
  addComment,
  createPost,
  doLikes,
  postsOfUser,
  getFeedPosts,
  getComments,
} from "./routes/posts.js";
import { addFriend, getUser, getFriends, getUsers } from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";

import { socketids } from "./data/index.js";
import http from "http";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

const server = http.createServer(app);
import { Server } from "socket.io";

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3002",
      "http://localhost:3000",
      "http://127.0.0.1:3002",
    ],
  })
);
//  console.clear();
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const serv = app.listen(3002);
const io = new Server(serv, {
  origin: "*",
  credentials: true,
  cors: {
    "Access-Control-Allow-Origin": "http://localhost:3002:*",
    "Access-Control-Request-Method": "*",
  },
});

io.on("connection", async (socket) => {
  socket.on("message_about_userid", (userid) => {
    socketids.set(userid.uid, socket.id);

    // req.app.get('socketio').to(socketids.get(usersarr[usersarr.findIndex((t)=>{t.email===email})]._id)).emit('message_from_likes',
    // `user ${email} has logg ed`)

    // console.log("Made socket connection");
  });
});

app.set("socketio", io);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
/* REGISTER USER */
console.clear();
app.put("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */

app.post("/login", loginUser);

app.get("/friends", verifyToken, getFriends);
/* READ */
app.get("/p", verifyToken, getFeedPosts);
app.get("/users", verifyToken, getUsers);
app.get("/users/:userId", verifyToken, getUser);
app.get("/:userId/posts", verifyToken, postsOfUser);
app.get("/friends/:set", verifyToken, getFriends);

app.patch("/createcomment", verifyToken, addComment);

app.patch("/:id/:userId/likes", verifyToken, doLikes);
app.patch("/addfriend/:email/:userId", verifyToken, addFriend);
//

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

// next line is the money
