import {reducer} from "./useApiReducer";
import {useReducer, useEffect, useState} from "react";
import {useFetch} from "./useFetch";
import {JSONResult} from "./useApiReducer";
import {fetchActionSet} from "./useFetch"
const useApi = (initialUrl:string, []) => {
    const [action, setAction] = useState<fetchActionSet>();
  
    const [{
        data,
        isLoading,
        error
        }, dispatch] = useReducer(reducer, { isLoading: false });
        const [result, setFetchAction]=useFetch()
    useEffect(() => {
      let didCancel = false;
 
      const fetchData = async () => {
        dispatch({ type: 'request' });
  
        try {
            setFetchAction( action)
            const data = result;
          if (!didCancel) {
            dispatch({ type: 'success', results: result.result as JSONResult});
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: 'failure' , error:error as string});
          }
        }
      };
  
      fetchData();
  
      return () => {
        didCancel = true;
      };
    }, [action]);
  
    return [data, setAction];
  };