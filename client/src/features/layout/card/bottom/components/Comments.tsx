interface IProps{
    item:string;
}
export const Comments = ({item}:IProps)=>{
    return <div>{item}</div>
}