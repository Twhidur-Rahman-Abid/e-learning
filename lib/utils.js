import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const selectItems = (items = []) => {
  return items.map((item) => ({
    id: item.id,
    value: item.title,
  }));
};

export function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    // Get the value of the key to group by
    const groupKey = currentValue[key];

    // If the group key doesn't exist in the result, create an empty array
    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    // Push the current value to the group
    result[groupKey].push(currentValue);

    return result;
  }, {});
}

export function groupByQuestionId(data) {
  return data.reduce((acc, item) => {
    const { name, Value } = item;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(Value);
    return acc;
  }, {});
}
