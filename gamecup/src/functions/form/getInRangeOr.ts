import getWholeNumber from "./getWholeNumber";

const getInRangeOr: (id: string, min: number, max: number, or: number) => number | null = (id, min, max, or) => {
  const nbr = getWholeNumber(id);
  if (!nbr)
    return or;
  if (min && nbr < min)
    return null;
  if (max && nbr > max)
    return null;
  return nbr;
};

export default getInRangeOr;
