import InputText, { setInvalid, setValid } from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";

const MsgActionForm = ({}: GameActionFormProps) => {
  const validateAndSubmit: () => any[] | null = () => {
    const msgHtml = document.getElementById("msg") as HTMLInputElement;
    const msg = msgHtml.value.trim();
    if (msg.length === 0) {
      setInvalid(msgHtml);
      return null;
    }
    setValid(msgHtml);
    return [msg];
  }

  const html = <>
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
  return {html, validateAndSubmit}
}

export default MsgActionForm;