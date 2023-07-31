import { fetchActionType, fetchState } from "../../../model/Interface";

export const fetchReducer = async (
  state: fetchState,
  action: fetchActionType
) => {
  switch (action.type) {
    case "get":
      return {
        data: await fetch(action.url, {
          // this cannot be 'no-cors'
          method: "GET",
          headers: { Authorization: `Bearer ${action.token}` },
        }).then((response) => response.json()),
      };
    case "patch":
      return {
        data: await fetch(action.url, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${action.token}`,
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()),
      };
    case "post":
      return {
        data: await fetch(action.url, {
          // this cannot be 'no-cors'
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(action.data),
        }).then((response) => response.json()),
      };
    default:
      throw new Error();
  }
};
