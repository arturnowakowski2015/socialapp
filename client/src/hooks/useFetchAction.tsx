enum fetchActionKind {
  GET='GET',
  POST='POST',
  PATCH='PATCH'
  }
  export interface fetchActionType{
    type:fetchActionKind;
    url:string;
    token:string;
    postid?:string;
    userid?:string;
    data:any;
  }
  import {JSONResult} from "./useApiReducer"
  // An interface for our actions
  interface fetchState { 
    data:JSONResult;
  }
  
   
  
  export const fetchReducer = async (state:fetchState, action:fetchActionType) => {
    switch (action.type) {
      case 'GET':
        return {data:await fetch(action.url, {
          // this cannot be 'no-cors'
          method: "GET",
          headers: { Authorization: `Bearer ${action.token}` },
        }).then(response=>response.json())
        };
      case 'PATCH':
        return {data:await fetch(
          action.url,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${action.token}`,
              "Content-Type": "application/json",
            },
          }
        ).then(response=>response.json())
        };
      case 'POST':
        return {data:await fetch(action.url, {
          // this cannot be 'no-cors'
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(action.data),
        }).then(response=> response.json())
        };
      default:
        throw new Error();
    }
  };

 