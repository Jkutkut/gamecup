import getWholeNumber from "./getWholeNumber";

const getInRange: (id: string, min?: number, max?: number) => number | null = (id, min, max) => {
  const nbr = getWholeNumber(id);
  if (!nbr)
    return null;
  if (min && nbr < min)
    return null;
  if (max && nbr > max)
    return null;
  return nbr;
};

export default getInRange;