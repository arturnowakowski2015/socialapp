interface IProps{
    friend:string;
}

export const Usersfriends = ({friend}:IProps)=>{
    return <div>{friend}</div>
}