import { useState } from 'react';
import NewCup from './component/newcup/NewCup';
import Team from './model/Team';
import Game from './model/Game';
import User from './model/User';

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [selectingTeams, setSelectingTeams] = useState<boolean>(true); // TODO default false

  const begin = (teams: Team[]) => {
    setGame(new Game(teams));
    setSelectingTeams(false);
  };

  if (selectingTeams)
    return <NewCup createNewGame={begin} />;
  return <div>
    Stated:
    {game && game.getTeams().map((team: Team, i) => <div key={i}>
      <h4>{team.getName()}</h4>
      <div className="row">
        {team.getPlayers().map((user: User, index) => <div key={index} className="col">{user.getName()}</div>)}
      </div>
      <br /><br />
    </div>)}
  </div>
}

export default App
