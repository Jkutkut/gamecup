import { useState } from "react";
import GameAction from "../../model/actions/GameAction";
import GameActionFactory from "../../model/actions/GameActionFactory";
import Game from "../../model/games/Game";
import Modal from "../generic/modal/Modal";
import ScoreActionForm, { scoreActionFormValidateAndSubmit } from "./scoreAction/ScoreActionForm";
import GameActionTypes from "../../model/actions/interfaces/GameActionTypes";
import MsgActionForm, { msgActionFormValidateAndSubmit } from "./scoreAction/MsgActionForm";
import GameActionFormProps from "./scoreAction/GameActionFormProps";
import PenaltyActionForm from "./scoreAction/PenaltyActionForm";
import ResetGameActionForm, { ResetGameActionFormValidateAndSubmit } from "./scoreAction/ResetGameActionForm";

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
  const [actionType, setActionType] = useState<GameActionTypes>(GameActionTypes.SCORE_ACTION);

  const gameActionFactory = GameActionFactory.getInstance();
  const actionTypes = gameActionFactory.getTypes();
  const actionTypesNames = gameActionFactory.getTypesNames();
  const teams = game.getTeams();

  let htmlForm: JSX.Element;
  let validateAndSubmit: (obj: GameActionFormProps) => any[] | null;
  const props = {teams, game};
  switch(actionType) {
    case GameActionTypes.SCORE_ACTION:
      htmlForm = <ScoreActionForm {...props} />;
      validateAndSubmit = scoreActionFormValidateAndSubmit;
      break;
    case GameActionTypes.MSG_ACTION:
      htmlForm = <MsgActionForm {...props} />;
      validateAndSubmit = msgActionFormValidateAndSubmit;
      break;
    case GameActionTypes.PENALTY_ACTION:
      htmlForm = <PenaltyActionForm {...props} />;
      validateAndSubmit = scoreActionFormValidateAndSubmit;
      break;
    case GameActionTypes.RESET_GAME_ACTION:
      htmlForm = <ResetGameActionForm {...props}/>
      validateAndSubmit = ResetGameActionFormValidateAndSubmit;
      break;
    default:
      throw new Error("Invalid action type");
  }

  const addNew = () => {
    const result = validateAndSubmit(props);
    if (!result) return;
    console.log("")
    const newAction = gameActionFactory.newAction(
      actionType,
      ...result
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
      <div className="d-flex flex-column gap-3">
        <div className="form-floating">
          <select id="actionType"
            className="form-select"
            value={actionType}
            onChange={(e) => {
              setActionType(e.target.value as GameActionTypes);
            }}
          >
            {actionTypesNames.map((actionTypeName, idx) => (
              <option key={idx} value={actionTypes[idx]}>{actionTypeName}</option>
            ))}
          </select>
          <label htmlFor="actionType">Action type</label>
        </div>
        {htmlForm}
      </div>
    </Modal>
  );
};

export default ModalAddScore;
