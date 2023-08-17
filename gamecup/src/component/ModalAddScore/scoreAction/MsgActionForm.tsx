import setValidity from "../../../functions/InputText/setValidity";
import getNonEmptyString from "../../../functions/form/getNonEmptyString";
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
  const msg = setValidity('msg', getNonEmptyString('msg'));
  if (!msg)
    return null;
  return [msg];
}

export default MsgActionForm;
export { msgActionFormValidateAndSubmit };