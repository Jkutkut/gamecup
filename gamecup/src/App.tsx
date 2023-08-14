import { useState } from 'react';
import NewCup from './component/newcup/NewCup';
import Team from './model/Team';
import Game from './model/games/Game';
import User from './model/User';
import GameFactory from './model/games/GameFactory';
import GameType from './model/games/GameType';

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [selectingTeams, setSelectingTeams] = useState<boolean>(true); // TODO default false

  const begin = (type: GameType, name: String, teams: Team[]) => {
    const gameFactory = GameFactory.getInstance();
    setGame(gameFactory.createGame(type, name, teams));
    setSelectingTeams(false);
  };

  if (selectingTeams)
    return <NewCup createNewGame={begin} />;
  if (!game)
    throw new Error("Game is null");
  return <div>
    <h1>{game.getName()}</h1>
    {game.getTeams().map((team: Team, i) => <>
      <div key={i}>
        <h4>{team.getName()}</h4>
        <div className="row">
          {team.getPlayers().map((user: User, index) => <div key={index} className="col">{user.getName()}</div>)}
        </div>
        <br /><br />
      </div>
    </>)}
  </div>;
}

export default App
