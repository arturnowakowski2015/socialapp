import { User, Posts, DataCreateComment } from "../../../../model/Interface";
import { usePostCard } from "./api//usePostCard";
import useLabelComments from "./api/useLabelComments";
import { GenericList } from "../../../../shared/generic";
import { Comments } from "./components";
interface IProps {
  onlineUser: User;
  post: Posts;
  users?: User[];
  token: string;
  doLikes: (postid: number, token: string, userid?: number) => void;
  createComment: (item: DataCreateComment) => void;
}
export const BottomCard = ({
  onlineUser,
  post,
  users,
  token,
  doLikes,
  createComment,
}: IProps) => {
  const [
    comments,
    show,
    showInput,
    string,
    setShow,
    showComments,
    setCommentValue,
    setShowInput,
  ] = useLabelComments();
  const [like, setLike] = usePostCard();
  return (
    <div>
      <div className="commentsContainer">
        {" "}
        <div className="commentsLength">{post.comments.length}</div>
        <div className="commentslabel">
          <div
            onClick={() => {
              setShow(!show);
              showComments(post);
              setShowInput(true);
            }}
            className="commentsText"
          >
            comments
          </div>{" "}
        </div>
        <div className="wrapper">
          <div className="postCardLabel">
            {like ? (
              <i
                onClick={() => {
                  doLikes(
                    Number(post._id),
                    token,

                    Number(
                      users?.[
                        users.findIndex((t) => {
                          return Number(t._id) == post.userId;
                        })
                      ]._id
                    )
                  );

                  users?.findIndex((t) => {
                    console.log(t._id + ":::" + post.userId);
                    return Number(t._id) == post.userId;
                  });

                  setLike(!like);
                }}
                className="f fa-solid fa-heart"
              ></i>
            ) : (
              <i
                onClick={() => {
                  doLikes(
                    Number(post._id),
                    token,

                    Number(
                      users?.[
                        users.findIndex((t) => {
                          return Number(t._id) == post.userId;
                        })
                      ]._id
                    )
                  );

                  users?.findIndex((t) => {
                    console.log(t._id + ":::" + post.userId);
                    return Number(t._id) == post.userId;
                  });

                  setLike(!like);
                }}
                className="f fa-regular fa-heart"
              ></i>
            )}{" "}
            <div className="likesAmount">{post.likes.length}</div>
          </div>
        </div>
        <hr></hr>
      </div>{" "}
      {show && (
        <div>
          <div className="inputText">
            {showInput && (
              <>
                <input
                  type="text"
                  placeholder="put your comment"
                  onClick={() => setShow(true)}
                  onChange={(e) => setCommentValue(e.currentTarget.value)}
                />{" "}
                <button
                  onClick={() => {
                    createComment({
                      userid: post.userId,
                      postid: Number(post._id),
                      comment: string,
                      token: token,
                    });
                    showComments(post);
                  }}
                >
                  submit
                </button>
              </>
            )}
          </div>
          <hr></hr>
          <div className="commentsList">
            <GenericList
              items={post.comments}
              childComp={
                <Comments
                  i={0}
                  picturePath={onlineUser.picturePath}
                  item={"" as string}
                />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
