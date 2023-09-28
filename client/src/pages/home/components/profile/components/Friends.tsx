import { User } from "../../../../../model/Interface";
interface IProps {
  item: User;
  token: string;
  changeProfile: (item: User, token: string, url: string) => void;
}
export const Friends = ({ item, token, changeProfile }: IProps) => {
  return (
    <div
      onClick={(e) => {
        changeProfile(item, token, "http://localhost:3001/users/" + item._id);
      }}
    >
      /////{item.email}???
    </div>
  );
};
