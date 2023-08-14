import { useState } from 'react';
import Team from './model/Team';
import Game from './model/games/Game';
import User from './model/User';
import StorageHandler from './model/db/StorageHandler';
import GameSelector from './component/gameSelector/GameSelector';

function App() {
  const [gameHandler] = useState<StorageHandler>(StorageHandler.getInstance());
  const [game, setGame] = useState<Game | null>(gameHandler.getCurrentGame());

  if (game == null)
    return <GameSelector setGame={setGame} />;
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
    <button type='button' className='btn btn-primary' onClick={() => setGame(null)}>Select game</button>
  </>;
}

export default App
