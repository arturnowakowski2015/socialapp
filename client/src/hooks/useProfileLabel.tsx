import { useState } from "react";
const useProfileLabel = () => {
  const [friends, setFriends] = useState<boolean>(false);
  return [friends, setFriends] as const;
};
export default useProfileLabel;
 