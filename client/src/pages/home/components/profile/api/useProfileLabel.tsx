import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../../../../utils/users";

const useProfileLabel = (token: string, id: number[]) => {
  const [flag, setFlag] = useState<boolean>(false);

  const { data: friends } = useQuery({
    queryKey: ["friends", flag],

    queryFn: () => getFriends(token, id),
  });

  const set = () => {
    setFlag(!flag);
  };
  return { friends, set };
};
export default useProfileLabel;
