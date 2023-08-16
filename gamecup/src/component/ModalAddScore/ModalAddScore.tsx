import { useState } from "react";
import GameAction from "../../model/actions/GameAction";
import GameActionFactory from "../../model/actions/GameActionFactory";
import Game from "../../model/games/Game";
import Modal from "../generic/modal/Modal";
import InputText, { setInvalid, setValid } from "../generic/InputText";
import InputTypes from "../generic/InputTypes";

interface Props {
  show: boolean;
  onHide: () => void;
  game: Game;
  onNewGameAction: (action: GameAction) => void;
}

const ModalAddScore = ({
  show,
  game,
  onHide,
  onNewGameAction
}: Props) => {
  const [actionType, setActionType] = useState<number>(0);
  const [team, setTeam] = useState<number>(0);

  const gameActionFactory = GameActionFactory.getInstance();
  const actionTypes = gameActionFactory.getTypes();
  const teams = game.getTeams();

  const addNew = () => {
    const scoreHtml = document.getElementById('score') as HTMLInputElement;
    const getScore: () => number | null = () => {
      let nbrTeams;
      try {
        nbrTeams = parseInt(scoreHtml.value);
      } catch (e) {
        return null;
      }
      if (isNaN(nbrTeams) || nbrTeams < 1) {
        return null;
      }
      return nbrTeams;
    };
    const score = getScore();
    if (score === null) {
      setInvalid(scoreHtml);
      return;
    }
    setValid(scoreHtml);

    const newAction = gameActionFactory.newAction(
      actionTypes[actionType],
      teams[team],
      score
    );
    if (newAction === null) return; // TODO handle
    onNewGameAction(newAction);
  };

  return (
    <Modal
      title='Update Score'
      show={show}
      onHide={onHide}
      confirmText={'Add'}
      onConfirm={addNew}
    >
      <div className="form-floating">
        <select id="actionType"
          className="form-select"
          value={actionType}
          onChange={(e) => setActionType(parseInt(e.target.value))}
        >
          {actionTypes.map((actionType, idx) => (
            <option key={idx} value={idx}>{actionType}</option>
          ))}
        </select>
        <label htmlFor="actionType">Action type</label>
      </div>
      <br />
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
      <br />
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

  </Modal>
  );
};

export default ModalAddScore;