import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";
import setValidity from "../../../functions/InputText/setValidity";
import getString from "../../../functions/form/getString";
import getWholeNumber from "../../../functions/form/getWholeNumber";

const ResetGameActionForm = () => {
  return <>
    <InputText
      id="points"
      label="Points"
      invalidText="Invalid points."
      placeholder=""
      validText="Valid points."
      onChange={() => {}}
      onEnter={() => {}}
      type={InputTypes.number}
      min={Number.MIN_VALUE}
      max={Number.MAX_VALUE}
    />
    <InputText
      id="msg"
      label="Message"
      placeholder="Why did the game restarted?"
      validText="Nice message!"
      invalidText=""
      onChange={() => {}}
      onEnter={() => {}}
      type={InputTypes.text}
    />
  </>;
};

const ResetGameActionFormValidateAndSubmit: ({}: GameActionFormProps) => any[] | null = ({}) => {
  const msg = setValidity('msg', getString('msg'));
  const points = setValidity('points', getWholeNumber('points'));
  console.debug("ResetGameActionFormValidateAndSubmit", points);
  if (points == null || msg == null)
    return null;
  return [msg, points];
};

export default ResetGameActionForm;
export { ResetGameActionFormValidateAndSubmit };
