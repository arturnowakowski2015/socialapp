import { z } from 'zod';
const LikesSchema= z.array(z.object({id:z.record(z.string(), z.boolean())}))
export type Likes = z.infer<typeof LikesSchema>; 

const CommentsSchema= z.array(  z.string() )

const PostsSchema =  
    z.object({
      _id: z.string().uuid(),
      userId: z.number(),
      firstName: z.string().optional(),
      laststName: z.string().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
      picturePath: z.string().optional(),
      userPicturePath: z.string().optional(),
      likes:LikesSchema,
      comments:CommentsSchema
 
})
export type Posts = z.infer<typeof PostsSchema>;
 


export interface IFile {
  url: string;
  name: string;
}
export interface IFriend {
  login: User;
  userid: number;
  token: string;
}
export interface Notifications {
  users: string[];
  likes: string[];
  comments: string[];
  posts: string[];
}

export interface PostInput {
  input: string;
  imagePath: string;
  userId: string;
  userPicture: string;
}

type State = {
  data?: JSONResult;
  isLoading: boolean;
  error?: string;
};

export type JSONResult = User | Login | Posts | User[] | Posts[];

type Action =
  | { type: "request" }
  | { type: "success"; results: JSONResult }
  | { type: "failure"; error: string };
  const UserSchema=  z.object({
         _id: z.string().uuid(),
   firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  picturePath: z.string().optional(),
  occupation: z.string().optional(),
  viewedProfile:z.number(),
  impressions:z.number(),
  friends:z.array(z.string()),
  email:z.string().email(),
  online:z.boolean()
})
export type User = z.infer<typeof UserSchema>; 
const LoginSchema=  z.object({
  token:z.string(),
user:UserSchema})
  export type Login = z.infer<typeof LoginSchema>

export type fetchActionKind = "get" | "patch" | "post" | "";
export interface fetchActionSet {
  type: fetchActionKind;
  url?: RequestInfo | URL;
  token?: string;
  data: JSONResult;
}

export interface fetchActionType {
  type: fetchActionKind;
  url: string;
  token: string;
  postid?: string;
  userid?: string;
  data: any;
}
// An interface for our actions
export interface fetchState {
  data: JSONResult;
}
