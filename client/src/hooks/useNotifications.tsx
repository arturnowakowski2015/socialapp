import {useState} from "react";
import {Notifications} from "../data/Interface";
const useNotifications = () =>{
    const [notifications, setNotifications] = useState<Notifications>({  users:[],
        likes:[],
        comments:[],
        posts:[]});
    const [socket, setSocket] =useState<any>(null);
    return [notifications, setNotifications,socket, setSocket] as const;
} 
export default useNotifications;   