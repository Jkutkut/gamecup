import { useState } from "react";
import InputText from "../../generic/InputText";
import setValid from "../../../functions/InputText/setValid";
import setInvalid from "../../../functions/InputText/setInvalid";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";

const ScoreActionForm = ({teams}: GameActionFormProps) => {
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
  const scoreHtml = document.getElementById('score') as HTMLInputElement;
  const getScore: () => number | null = () => { // TODO refactor
    let score;
    try {
      score = parseInt(scoreHtml.value);
    } catch (e) {
      return null;
    }
    if (isNaN(score) || score < 1) {
      return null;
    }
    return score;
  };
  const teamHtml = document.getElementById('team') as HTMLInputElement;
  const getTeam: () => number | null = () => { // TODO refactor
    let team;
    try {
      team = parseInt(teamHtml.value);
    } catch (e) {
      return null;
    }
    if (isNaN(team) || team < 0 || team >= teams.length) {
      return null;
    }
    return team;
  };

  const score = getScore();
  if (score === null) {
    setInvalid(scoreHtml);
    return null;
  }
  setValid(scoreHtml);
  const team = getTeam();
  if (team === null) {
    setInvalid(teamHtml);
    return null;
  }
  setValid(teamHtml);
  return [teams[team], score];
};

export default ScoreActionForm;
export { scoreActionFormValidateAndSubmit };