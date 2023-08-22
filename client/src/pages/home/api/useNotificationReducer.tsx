import { User } from "../../../model/Interface";
type State = {
  users: string[];
  likes: string[];
  comments: string[];
  posts: string[];
};

interface Data {
  text: string;
  uid: number;
  flag: number;
  flag1: number;
}

export type Action =
  | { type: "user"; data: Data }
  | { type: "likes"; data: Data; onlineUser: User  }
  | { type: "comments"; data: Data}
  | { type: "posts"; data: Data; onlineUser: User }
  | { type: "resetPost" }
  | { type: "resetUsers" }
  | { type: "resetComments" }
  | { type: "resetLikes" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "user":
      if ( 
        state?.users?.indexOf(action.data.text) === -1
      ) {
        if (1 !== action.data.flag1) {
            state?.users?.pop();
          state = { ...state, users: state.users };
        } else {
          state?.users?.unshift(action.data.text);
          state = { ...state, users: state.users };
        }
      }

      return state;
    case "comments":
      if (state.comments.indexOf(action.data.text) === -1)
        state.comments.unshift(action.data.text);

      return { ...state, comments: state.comments };
    case "likes":
      if (Number(action.onlineUser._id) === Number(action.data.uid)) {
        if (action.data.flag === 1) state.likes.unshift(action.data.text);
        else state.likes.pop();
      }
      return { ...state, likes: state.likes };
    case "posts":
      if (Number(action.onlineUser._id) !== action.data.uid)
        state.posts.unshift(action.data.text);
      return { ...state, posts: state.posts };
    case "resetPost":
      return { ...state, posts: [] };
    case "resetUsers":
      return { ...state, users: [] };
    case "resetLikes":
      return { ...state, likes: [] };
    case "resetComments":
      return { ...state, comments: [] };
  }
}
