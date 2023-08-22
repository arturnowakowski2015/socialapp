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
export interface Likes {
  [id: string]: boolean;
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
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  friends: string[];
  location: String;
  description: string;
  picturePath: string;
  ocupation: string;
  viewedProfile: number;
  impresions: number;
  likes: Likes[];
  comments: string[];
  online:boolean;
}
export interface Login {
  user: User;
  token: string;
}
export interface Posts {
  _id: number;
  userId: number;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Likes[];
  comments: string[];
}
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
