import { useState } from "react";

const usePostCard = () => {
  const [like, setLike] = useState<boolean>(true);

  return [like, setLike] as const;
};

export { usePostCard };
 