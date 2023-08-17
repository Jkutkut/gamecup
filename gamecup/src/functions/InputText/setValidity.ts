import setInvalid from "./setInvalid";
import setValid from "./setValid";

const setValidity: <T>(id: string, val: T | null) => T | null = (id, val) => {
  const input = document.getElementById(id) as HTMLInputElement;
  if (val === null)
    setInvalid(input);
  else
    setValid(input);
  return val;
}

export default setValidity;