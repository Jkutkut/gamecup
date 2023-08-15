import GameAction from "./GameAction";
import ScoreAction from "./ScoreAction";

class GameActionFactory {
  private static instance: GameActionFactory;

  private constructor() {}

  public static getInstance(): GameActionFactory {
    if (!GameActionFactory.instance) {
      GameActionFactory.instance = new GameActionFactory();
    }

    return GameActionFactory.instance;
  }

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
      default:
        throw new Error("Unknown GameAction class: " + json.class);
    }
  }
}

export default GameActionFactory;