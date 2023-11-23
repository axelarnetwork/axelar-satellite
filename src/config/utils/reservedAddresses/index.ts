import { toLower } from "rambda";

import list1 from "./10202023";
import list2 from "./11232023";
import originalList from "./originalList";

const normalized = [
  ...originalList,
  // additional reserved address lists
  ...list1,
  ...list2,
].map(toLower);

export default JSON.stringify(normalized);
