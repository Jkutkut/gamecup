import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";
import setValidity from "../../../functions/InputText/setValidity";
import getString from "../../../functions/form/getString";
import getWholeNumber from "../../../functions/form/getWholeNumber";

const RoundActionForm = ({teams}: GameActionFormProps) => {
  return <>
    <InputText
      id="msg"
      label="Message"
      placeholder="Enter a message for this round..."
      validText="Nice message!"
      invalidText=""
      onChange={() => {}}
      onEnter={() => {}}
      type={InputTypes.text}
    />
    <div className="d-flex flex-column">
      {teams.map((team) => (
        <InputText
          key={`points-${team.getName()}`}
          id={`points-${team.getName()}`}
          label={team.getName()}
          invalidText="Invalid points."
          placeholder=""
          validText="Valid points."
          onChange={() => {}}
          onEnter={() => {}}
          type={InputTypes.number}
          min={Number.MIN_VALUE}
          max={Number.MAX_VALUE}
        />
      ))}
    </div>
  </>;
};

const RoundActionFormValidateAndSubmit: (props: GameActionFormProps) => any[] | null = ({teams}) => {
  const msg = setValidity('msg', getString('msg'));
  const points: ([string, number])[] = [];
  for (const team of teams) {
    const pts = setValidity(`points-${team.getName()}`, getWholeNumber(`points-${team.getName()}`));
    points.push([team.getName(), pts == null ? 0 : pts]);
  }
  console.debug("RoundActionFormValidateAndSubmit", points, teams);
  if (points == null || msg == null)
    return null;
  return [msg, points];
};

export default RoundActionForm;
export { RoundActionFormValidateAndSubmit };
