import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Basketball",
  },
  {
    _id: uuid(),
    categoryName: "Boxing",
  },
  {
    _id: uuid(),
    categoryName: "Cricket",
  },
  {
    _id: uuid(),
    categoryName: "Football",
  },
];
