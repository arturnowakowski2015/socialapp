import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login, User } from "../../../../model/Interface";
import { GenericList } from "../../../../shared/generic";
import { Friend } from "./components/Friend";
import useProfileLabel from "./api/useProfileLabel";
interface IProps {
  user?: User;
  onlineUser: User;
  token: string;
  changeProfile: (user: User, token: string, url: string) => void;
}

export const ProfileLabel = ({
  user,
  token,
  onlineUser,
  changeProfile,
}: IProps) => {
  const { friends, set } = useProfileLabel(
    token,
    user?.friends as unknown as number[]
  );
  useEffect(() => {
    set();
    console.log(9999);
  }, [changeProfile]);
  return (
    <>
      <div>?{user && user.email}?</div>
      <div>
        <div className="firstThree">
          <div className="firstName">
            <div>first name</div>
            <div>{user?.firstName}</div>
          </div>
          <div className="secondName">
            <div>email</div>
            <div>{user?.friends}</div>
          </div>
        </div>
        ....
        <div>
          <GenericList items={friends} childComp={<Friend item={""} />} />
        </div>
      </div>
    </>
  );
};
