import list1 from "./10202023";
import originalList from "./originalList";

const normalized = [
  ...originalList,
  ...list1.map((item) => item.toLowerCase()),
];

export default JSON.stringify(normalized);
