import { useState } from "react";
import GameAction from "../../model/actions/GameAction";
import GameActionFactory from "../../model/actions/GameActionFactory";
import Game from "../../model/games/Game";
import Modal from "../generic/modal/Modal";
import ScoreActionForm from "./scoreAction/ScoreActionForm";

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

  const gameActionFactory = GameActionFactory.getInstance();
  const actionTypes = gameActionFactory.getTypes();
  const actionTypesNames = gameActionFactory.getTypesNames();
  const teams = game.getTeams();

  const addNew = () => {
    const result = validateAndSubmit();
    if (!result) return;
    console.log("")
    const newAction = gameActionFactory.newAction(
      actionTypes[actionType],
      ...result
    );
    if (newAction === null) return; // TODO handle
    onNewGameAction(newAction);
  };

  const {html, validateAndSubmit} = ScoreActionForm(
    {teams}
  );

  return (
    <Modal
      title='Update Score'
      show={show}
      onHide={onHide}
      confirmText={'Add'}
      onConfirm={addNew}
    >
      <div className="d-flex flex-column gap-3">
        <div className="form-floating">
          <select id="actionType"
            className="form-select"
            value={actionType}
            onChange={(e) => setActionType(parseInt(e.target.value))}
          >
            {actionTypesNames.map((actionTypeName, idx) => (
              <option key={idx} value={idx}>{actionTypeName}</option>
            ))}
          </select>
          <label htmlFor="actionType">Action type</label>
        </div>
        {html}
      </div>
    </Modal>
  );
};

export default ModalAddScore;