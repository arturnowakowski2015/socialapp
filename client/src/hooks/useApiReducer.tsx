import {User, Login, Posts} from "../data/Interface";
type State = {
    data?: JSONResult;
    isLoading: boolean;
    error?: string;
   }
   
   export type JSONResult = User | Login | Posts | User[] | Posts[];

   type Action =
 | { type: 'request' }
 | { type: 'success', results: JSONResult }
 | { type: 'failure', error: string };

 export function reducer(state: State, action: Action): State {
    switch (action.type) {
    case 'request':
    return { isLoading: true };
    case 'success':
    return { isLoading: false, data: action.results };
    case 'failure':
    return { isLoading: false, error: action.error };
    }
   }