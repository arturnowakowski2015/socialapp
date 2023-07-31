import { Posts } from "../../../../../model/Interface";
import { useState } from "react";
const useLabelComments = () => {
  const [comments, setPosts] = useState<string[]>([]);
  const [string, setString] = useState<string>("");
  const [show, setShow] = useState<boolean>();
  const [showInput, setShowInput] = useState<boolean>(false);
  const showComments = (post: Posts) => {
    setPosts(post.comments);
  };
  const setCommentValue = (str: string) => {
    setString(str);
  };

  return [
    comments,
    show,
    showInput,
    string,
    setShow,
    showComments,
    setCommentValue,
    setShowInput,
  ] as const;
};
export default useLabelComments;
