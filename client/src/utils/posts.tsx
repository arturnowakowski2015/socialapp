import { Posts, User, DataCreateComment } from "../model/Interface";
import { axios } from "./api";

const getPostsQuery = async (token: string): Promise<Posts[]> => {
  const resp = await axios.get<Posts[]>("/p", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

//patch: (url: string, {},data: any) => axios.patch(url, {},data),

const addComment = async (data: DataCreateComment) => {
  const resp = await axios.patch(
    "/createcomment",
    {
      body: {
        postid: data.postid,
        userid: data.userid,
        comment: data.comment,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // db.patch('/users/me', {
  //   name, email, password
  // }, {
  //   headers: {'Authorization': `Bearer ${token}`}
  // })

  return resp.data;
};
export { getPostsQuery, addComment };
/*
    const response = await fetch(`http://localhost:3001/createpost`, {
      method: "PATCH",
      body: JSON.stringify({
        input: post.input,
        commentPicture: post.imagePath,
        picturePath: onlineUser.picturePath,
        userid: onlineUser._id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    await api.patch<RecordData>(url, data),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
*/
