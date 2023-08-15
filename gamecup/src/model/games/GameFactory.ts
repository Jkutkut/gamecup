import Team from "../teams/Team";
import Game from "./Game";
import GameType from "./GameType";

class GameFactory {
  private static instance: GameFactory;

  private constructor() {
  }

  public static getInstance(): GameFactory {
    if (!GameFactory.instance) {
      GameFactory.instance = new GameFactory();
    }
    return GameFactory.instance;
  }

  public createGame(type: GameType, name: String, teams: Team[]): Game {
    switch (type) {
      case GameType.BASIC:
        return new Game(name, teams);
    }
  }
}

export default GameFactory;