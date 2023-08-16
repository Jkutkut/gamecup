import { useState } from "react";
import InputText, { setInvalid, setValid } from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import GameActionFormProps from "./GameActionFormProps";

const ScoreActionForm = ({teams}: GameActionFormProps) => {
  const [team, setTeam] = useState<number>(0);

  const validateAndSubmit: () => any[] | null = () => {
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
    const score = getScore();
    if (score === null) {
      setInvalid(scoreHtml);
      return null;
    }
    setValid(scoreHtml);
    return [teams[team], score];
  };

  const html = <>
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

  return {html, validateAndSubmit};
};

export default ScoreActionForm;