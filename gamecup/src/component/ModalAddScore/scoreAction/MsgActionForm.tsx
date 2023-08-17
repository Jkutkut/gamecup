import setInvalid from "../../../functions/InputText/setInvalid";
import setValid from "../../../functions/InputText/setValid";
import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";

const MsgActionForm = ({}: GameActionFormProps) => {
  return <>
    <InputText
      id="msg"
      label="Message"
      placeholder="Enter message"
      validText="Nice message!"
      invalidText="Please enter a message"
      onChange={() => {}}
      onEnter={() => {}}
      type={InputTypes.text}
    />
  </>;
}

const msgActionFormValidateAndSubmit: ({}: GameActionFormProps) => any[] | null = ({}) => {
  const msgHtml = document.getElementById("msg") as HTMLInputElement;
  const msg = msgHtml.value.trim();
  if (msg.length === 0) {
    setInvalid(msgHtml);
    return null;
  }
  setValid(msgHtml);
  return [msg];
}

export default MsgActionForm;
export { msgActionFormValidateAndSubmit };