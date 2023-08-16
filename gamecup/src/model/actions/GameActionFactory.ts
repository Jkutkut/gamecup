import Model from "../Model";
import Team from "../teams/Team";
import GameAction from "./GameAction";
import MsgAction from "./MsgAction";
import ScoreAction from "./ScoreAction";
import GameActionTypes from "./interfaces/GameActionTypes";
import GameActionTypesNames from "./interfaces/GameActionTypesNames";

class GameActionFactory extends Model {
  private static instance: GameActionFactory;

  private constructor() {
    super();
  }

  public static getInstance(): GameActionFactory {
    if (!GameActionFactory.instance) {
      GameActionFactory.instance = new GameActionFactory();
    }

    return GameActionFactory.instance;
  }

  // ----------- FACTORY -------------

  public getTypes(): GameActionTypes[] {
    return Object.values(GameActionTypes);
  }

  public getTypesNames(): GameActionTypesNames[] {
    return Object.values(GameActionTypesNames);
  }

  public newAction(type: string, ...args: any[]): GameAction | null {
    this.debug("Creating a new action of type", type);
    switch (type) {
      case GameActionTypes.SCORE_ACTION:
        return new ScoreAction(
          args[0] as Team,
          args[1] as number,
        );
      case GameActionTypes.MSG_ACTION:
        return new MsgAction(
          args[0] as string
        );
    }
    this.error("Unknown action type", type);
    return null;
  }

  // ----------- JSON -------------

  public fromJSON(json: any[]): GameAction[] {
    const actions: GameAction[] = [];
    for (const action of json) {
      actions.push(this.fromObjJSON(action));
    }
    return actions;
  }

  public fromObjJSON(json: any): GameAction {
    switch (json.class) {
      case ScoreAction.name:
        return ScoreAction.fromJSON(json);
      case MsgAction.name:
        return MsgAction.fromJSON(json);
      default:
        throw new Error("Unknown GameAction class: " + json.class);
    }
  }
}

export default GameActionFactory;