import { useState } from "react";
import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";
import setValidity from "../../../functions/InputText/setValidity";
import getInRange from "../../../functions/form/getInRange";

const PenaltyActionForm = ({teams}: GameActionFormProps) => {
  const [team, setTeam] = useState<number>(0);

  return <>
    <div className="form-floating">
      <select id="team"
        className="form-select"
        value={team}
        onChange={(e) => setTeam(parseInt(e.target.value))}
      >
        {teams.map((team, idx) => (
          <option key={idx} value={idx}>{team.getName()}</option>
        ))}
      </select>
      <label htmlFor="team">Team</label>
    </div>
    <InputText
      id="score"
      label="Score"
      invalidText="Invalid score. It must be a natural number."
      placeholder=""
      validText="Valid score."
      onChange={() => {}}
      onEnter={() => {}}
      type={InputTypes.number}
      min={0}
      max={Number.MAX_VALUE}
    />
  </>;
};

const scoreActionFormValidateAndSubmit: ({}: GameActionFormProps) => any[] | null = ({teams}) => {
  const score = setValidity('score', getInRange('score', 1));
  const teamSelector = document.getElementById('team') as HTMLSelectElement;
  const team = parseInt(teamSelector.value);
  console.debug("scoreActionFormValidateAndSubmit", score, team);
  if (score == null || team == null)
    return null;
  return [teams[team], score];
};

export default PenaltyActionForm;
export { scoreActionFormValidateAndSubmit };
