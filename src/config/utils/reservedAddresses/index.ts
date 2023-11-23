import { toLower } from "rambda";

import list1 from "./10202023";
import list2 from "./11232023";
import originalList from "./originalList";

const additionalList = [list1, list2].flatMap(toLower);

const normalized = [...originalList, ...additionalList];

export default JSON.stringify(normalized);
