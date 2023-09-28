interface IF {
  item: string;
}
export const Friend = ({ item }: IF) => {
  return <div>{item}</div>;
};
