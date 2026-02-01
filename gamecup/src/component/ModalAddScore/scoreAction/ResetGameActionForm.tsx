import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";
import setValidity from "../../../functions/InputText/setValidity";
import getString from "../../../functions/form/getString";
import getWholeNumber from "../../../functions/form/getWholeNumber";

const ResetGameActionForm = (_: GameActionFormProps) => {
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

const ResetGameActionFormValidateAndSubmit: (props: GameActionFormProps) => any[] | null = ({game}) => {
  const msg = setValidity('msg', getString('msg'));
  const points = setValidity('points', getWholeNumber('points'));
  console.debug("ResetGameActionFormValidateAndSubmit", points, game);
  if (points == null || msg == null)
    return null;
  const teams = game.getTeams();
  const currentPoints = game.getPoints();
  const teamPoints = teams.map((team, idx) => [team.getName(), currentPoints[idx]]);
  return [msg, points, teamPoints];
};

export default ResetGameActionForm;
export { ResetGameActionFormValidateAndSubmit };
