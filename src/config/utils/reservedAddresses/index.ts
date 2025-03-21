import { toLower } from "rambda";

import list1 from "./10202023";
import list2 from "./11232023";
import list3 from "./20240921";
import list4 from "./20241117";
import list5 from "./20250225";
import originalList from "./originalList";

const normalized = [
  ...originalList,
  // additional reserved address lists
  ...list1,
  ...list2,
  ...list3,
  ...list4,
  ...list5,
].map(toLower);

export default JSON.stringify(normalized);
