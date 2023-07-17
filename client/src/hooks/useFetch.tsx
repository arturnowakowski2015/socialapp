import { fetchActionSet } from "../data/Interface";
import { JSONResult } from "../data/Interface";
import { useState } from "react";
enum fetchActionKind {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
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
interface fetchState {
  data: JSONResult;
}
const useFetch = () => {
  const [data, setData] = useState<JSONResult>([] as JSONResult);
  const [loader, setLoader] = useState<boolean>(false);
  const setParams = async (action: fetchActionSet) => {
    switch (action.type) {
      case "get":
        setLoader(true);
        const response1 = await fetch(action && (action.url as string), {
          // this cannot be 'no-cors'
          method: "GET",
          headers: {
            Authorization: `Bearer ${action && action.token}`,
          },
        });

        const t = await response1.json();
        setData(t);

        setLoader(false);
        return t;
      case "patch":
        setLoader(true);
        const response2 = await fetch(action && (action.url as string), {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${action.token}`,
            "Content-Type": "application/json",
          },
        });

        const t2 = await response2.json();

        setLoader(false);
        return t2;
      case "post":
        setLoader(true);
        const response3 = await fetch(action && (action.url as string), {
          // this cannot be 'no-cors'
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(action.data),
        });

        const t3 = await response3.json();

        setLoader(false);
        return t3;
    }
  };
  return [loader, setParams] as const;
};

export default useFetch;
