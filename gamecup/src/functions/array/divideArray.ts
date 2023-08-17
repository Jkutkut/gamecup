const divideArray: <T>(arr: T[], nbrGroups: number) => T[][] = (arr, nbrGroups) => {
  const groups: T[][] = [];
  for (let i = 0; i < nbrGroups; i++) {
    groups.push([]);
  }
  for (let i = 0, j = 0; i < arr.length; i++, j = (j + 1) % nbrGroups) {
    groups[j].push(arr[i]);
  }
  return groups;
};

export default divideArray;