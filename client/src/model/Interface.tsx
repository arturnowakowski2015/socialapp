import { z } from "zod";
const LikesSchema = z.array(
  z.object({ id: z.record(z.string(), z.boolean()) })
);
export type Likes = z.infer<typeof LikesSchema>;

const CommentsSchema = z.array(z.string());

const PostsSchema = z.object({
  _id: z.string().uuid(),
  userId: z.number(),
  firstName: z.string().optional(),
  laststName: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  picturePath: z.string().optional(),
  userPicturePath: z.string().optional(),
  likes: LikesSchema,
  comments: CommentsSchema,
});
export type Posts = z.infer<typeof PostsSchema>;

export interface Notifications {
  users: string[];
  likes: string[];
  comments: string[];
  posts: string[];
}

const Notification = z.object({
  user: z.array(z.string()),
  likes: z.array(z.string()),
  comments: z.array(z.string()),
  posts: z.array(z.string()),
});

const PostInputSchema = z.object({
  input: z.string(),
  imagePath: z.string(),
  userId: z.string(),
  userPicture: z.string(),
});

export type PostInput = z.infer<typeof PostInputSchema>;

const UserSchema = z.object({
  _id: z.string().uuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  picturePath: z.string().optional(),
  occupation: z.string().optional(),
  viewedProfile: z.number(),
  impressions: z.number(),
  friends: z.array(z.string()),
  email: z.string().email(),
  online: z.boolean(),
});

//export type JSONResult = User | Login | Posts | User[] | Posts[];

export type User = z.infer<typeof UserSchema>;
const LoginSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type Login = z.infer<typeof LoginSchema>;

const IFriendSchema = z.object({
  login: UserSchema,
  userid: z.number(),
  token: z.string(),
});

export type IFriend = z.infer<typeof IFriendSchema>;
const JSONResultSchema = z.union([
  UserSchema,
  LoginSchema,
  PostsSchema,
  z.array(UserSchema),
  z.array(PostsSchema),
]);
export type JSONResult = z.infer<typeof JSONResultSchema>;

const fetchActionKindSchema = z.union([
  z.literal("get"),
  z.literal("patch"),
  z.literal("post"),
]);
export type fetchActionKind = z.infer<typeof fetchActionKindSchema>;
const fetchActionSetSchema = z.object({
  type: fetchActionKindSchema,
  url: z.string().optional(),
  token: z.string().optional(),
  data: JSONResultSchema,
});

export type fetchActionSet = z.infer<typeof fetchActionSetSchema>;

const fetchActionTypeSchema = z.object({
  type: fetchActionKindSchema,
  url: z.string(),
  token: z.string(),
  postid: z.string().optional(),
  userid: z.string().optional(),
  data: z.any(),
});

export type fetchActionType = z.infer<typeof fetchActionTypeSchema>;

// An interface for our actions
export interface fetchState {
  data: JSONResult;
}
