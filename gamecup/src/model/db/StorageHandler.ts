import Model from "../Model";
import Game from "../games/Game";

class StorageHandler extends Model {
  private static instance: StorageHandler;
  private games: Game[];
  private currentGame: Game | null;

  private constructor() {
    super();
    this.games = [];
    this.currentGame = null;
    this.loadGames();
  }

  public static getInstance(): StorageHandler {
    if (!StorageHandler.instance) {
      StorageHandler.instance = new StorageHandler();
    }
    return StorageHandler.instance;
  }

  // -----------------------------------

  public getGames(): Game[] {
    return this.games;
  }

  public getCurrentGame(): Game | null {
    return this.currentGame;
  }

  public setCurrentGame(game: Game): void {
    this.debug("Setting current game to", game.getName());
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].getName() === game.getName()) {
        this.setCurrentGameObj(this.games[i]);
        return;
      }
    }
    this.error("game not found");
  }

  private setCurrentGameObj(game: Game): void {
    this.currentGame = game;
    this.save();
  }

  public unsetCurrentGame(): void {
    this.currentGame = null;
    this.save();
  }

  public addGame(game: Game): Game | null {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].getName() === game.getName()) {
        return null;
      }
    }
    this.games.push(game);
    this.setCurrentGameObj(game);
    this.save();
    return game;
  }

  public deleteGame(game: Game): void {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].getName() === game.getName()) {
        this.games.splice(i, 1);
        if (this.currentGame === game) {
          this.unsetCurrentGame(); // saves for us
        }
        return;
      }
    }
    this.error("game not found");
  }

  // -----------------------------------

  private loadGames(): void {
    this.debug("Loading games from localStorage");
    const currentGame = localStorage.getItem("currentGame");
    if (currentGame) {
      this.debug("Loading current game");
      try {
        this.currentGame = Game.fromJSON(JSON.parse(currentGame));
      }
      catch (e) {
        this.error(
          "Failed to load current game from LocalStorage\n",
          e, "\n", JSON.parse(currentGame)
        );
        localStorage.removeItem("currentGame");
      }
    }
    const games = localStorage.getItem("games");
    if (games) {
      this.debug("Loading games from localStorage");
      try {
        this.games = JSON.parse(games).map((game: any) => Game.fromJSON(game));
      } catch (e) {
        this.error(
          "Failed to load games from localStorage\n",
          e, "\n", JSON.parse(games)
        );
        localStorage.removeItem("games");
        localStorage.removeItem("currentGame");
      }
    }
    this.debug("Loaded games from localStorage");
  }

  private save(): void {
    this.debug("Saving games to localStorage");
    localStorage.setItem("games", JSON.stringify(this.games));
    localStorage.setItem("currentGame", JSON.stringify(this.currentGame));
    this.debug("Saved games to localStorage");
  }
}

export default StorageHandler;