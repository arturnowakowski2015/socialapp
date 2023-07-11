import {useEffect, useState} from "react"
import {JSONResult} from "./useApiReducer";
type fetchActionKind = 
    "get" | "patch" | "post" |""
   
    export interface fetchActionSet {
      type:fetchActionKind;
      url?: RequestInfo | URL ;
      token?:string;
      data:JSONResult;
    }

export const useFetch = () =>{ 
const [fetchAction, setFetchAction]=useState<fetchActionSet>({
    type:"",
    url: "localhost:3000",
    token:"",
    data:[]
  } as fetchActionSet)
let result:any=[]
useEffect(() => {
  const f = async()=>{
    switch (fetchAction && fetchAction.type) {
        case 'get':
          return  await fetch( fetchAction.url!   , {
            // this cannot be 'no-cors'
            method: "GET",
            headers: { Authorization: `Bearer ${fetchAction.token}` },
          }).then(response=>response.json())
         
        case 'patch':
          return  await fetch(
            fetchAction.url!,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${fetchAction.token}`,
                "Content-Type": "application/json",
              },
            }
          ).then(response=>response.json())
      
        case 'post':
          return  await fetch(fetchAction.url!, {
            // this cannot be 'no-cors'
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(fetchAction.data),
          }).then(response=> response.json())
          case '':return {}
             
        }
    }
 
    result =f();
 }, [fetchAction]);
    
return [result, setFetchAction];
}