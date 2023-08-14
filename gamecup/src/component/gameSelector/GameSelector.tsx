import { useState } from "react";
import Team from "../../model/Team";
import StorageHandler from "../../model/db/StorageHandler";
import Game from "../../model/games/Game";
import GameFactory from "../../model/games/GameFactory";
import GameType from "../../model/games/GameType";
import NewCup from "../newcup/NewCup";
import User from "../../model/User";

interface Props {
  setGame: (game: Game) => void;
}

const GameSelector = ({setGame}: Props) => {
  const [gameHandler] = useState<StorageHandler>(StorageHandler.getInstance());
  const currentGame = gameHandler.getCurrentGame();
  const [isNewGame, setIsNewGame] = useState<boolean>(currentGame == null);
  const [games, setGames] = useState<Game[]>(gameHandler.getGames());

  const begin = (type: GameType, name: String, teams: Team[]) => {
    const gameFactory = GameFactory.getInstance();
    let newGame = gameHandler.addGame(gameFactory.createGame(type, name, teams));
    if (!newGame) return; // TODO handle
    setGame(newGame);
  };

  const changeGame = (game: Game) => {
    gameHandler.setCurrentGame(game);
    setGame(game);
  };

  const destroyGame = (game: Game) => {
    gameHandler.deleteGame(game);
    // Note: Can't delete current game
    setGames([...gameHandler.getGames()]);
  };

  if (isNewGame)
    return <NewCup createNewGame={begin} />;

  return <>
    {games.length > 0 &&
      <>
        <h1>Choose a game</h1>
        {games.map((game: Game, index) =>
          <div key={index}
            className="card card-body"
            style={{marginBottom: '10px'}}
          >
            <div className="row">
              <h4 className="col justify-content-end">
                {game.getName()}
              </h4>
              <div className="col text-end">
                <button className="btn btn-outline-primary btn-sm"
                  onClick={() => changeGame(game)}
                >
                  Select
                </button>
                &nbsp;&nbsp;&nbsp;
                {game.getName() === currentGame?.getName() &&
                  <span className="badge bg-primary">Current</span> ||
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => destroyGame(game)}
                  >
                    Delete
                  </button>
                }
              </div>
            </div>

            <div className="row justify-content-center gap-3"
              style={{padding: '20px'}}
            >
              {game.getTeams().map((team: Team, idx) =>
                <div key={idx} className="card row gap-1 p-2" 
                >
                  <h5>{team.getName()}</h5>
                  <div className="row">
                    {team.getPlayers().map((user: User, i) =>
                      <div key={i} className="col">
                        {user.getName()}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    }
    <h1>Or create a new game</h1>
    <div className="d-grid">
      <button type='button' className='btn btn-primary'
        onClick={() => setIsNewGame(true)}
      >
        New game
      </button>
    </div>
  </>;
}

export default GameSelector;