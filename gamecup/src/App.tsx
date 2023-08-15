import { useState } from 'react';
import Team from './model/teams/Team';
import Game from './model/games/Game';
import User from './model/User';
import StorageHandler from './model/db/StorageHandler';
import GameSelector from './component/gameSelector/GameSelector';
import Navbar from './component/navbar.tsx/Navbar';

function App() {
  const [gameHandler] = useState<StorageHandler>(StorageHandler.getInstance());
  const [game, setGame] = useState<Game | null>(gameHandler.getCurrentGame());
  const [points, setPoints] = useState<number[]>(game?.getPoints() || []);

  if (game == null)
    return <GameSelector setGame={(game: Game) => {
      setGame(game);
      setPoints(game.getPoints());
    }} />;
  console.log(game.getPoints());
  return <>
    <Navbar
      game={game}
      openGameSelector={() => setGame(null)}
    />
    <div className="body-content p-3">
      {game.getTeams().map((team: Team, index) =>
        <div key={index}>
          <div className="row">
            <h4 className="col col-8">{team.getName()}</h4>
            <h4 className="col text-end">
              {points[index]}
            </h4>
          </div>
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
    </div>
    <button onClick={() => {
      game.testScore();
      setPoints([...points]);
      gameHandler.hardSave();
    }}>Add point</button>
  </>;
}

export default App
