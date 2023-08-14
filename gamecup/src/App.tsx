import { useState } from 'react';
import NewCup from './component/newcup/NewCup';
import Team from './model/Team';
import Game from './model/games/Game';
import User from './model/User';
import GameFactory from './model/games/GameFactory';
import GameType from './model/games/GameType';
import StorageHandler from './model/db/StorageHandler';

function App() {
  const [gameHandler] = useState<StorageHandler>(StorageHandler.getInstance());
  const [game, setGame] = useState<Game | null>(gameHandler.getCurrentGame());

  const begin = (type: GameType, name: String, teams: Team[]) => {
    const gameFactory = GameFactory.getInstance();
    let newGame = gameHandler.addGame(gameFactory.createGame(type, name, teams));
    if (!newGame) return; // TODO handle
    setGame(newGame);
  };

  if (game == null)
    return <NewCup createNewGame={begin} />;
  return <>
    <h1>{game.getName()}</h1>
    {game.getTeams().map((team: Team, index) =>
      <div key={index}>
        <h4>{team.getName()}</h4>
        <div className="row">
          {team.getPlayers().map((user: User, idx) =>
            <div key={idx} className="col">
              {user.getName()}
            </div>
          )}
        </div>
        <br /><br />
      </div>
    )}
  </>;
}

export default App
