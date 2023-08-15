import { useState } from 'react';
import Game from './model/games/Game';
import StorageHandler from './model/db/StorageHandler';
import GameSelector from './component/gameSelector/GameSelector';
import Navbar from './component/navbar.tsx/Navbar';
import TeamRanking from './component/teamRanking/TeamRanking';
import GameAction from './model/actions/GameAction';

function App() {
  const [gameHandler] = useState<StorageHandler>(StorageHandler.getInstance());
  const [game, setGame] = useState<Game | null>(gameHandler.getCurrentGame());
  const [points, setPoints] = useState<number[]>(game?.getPoints() || []);

  if (game == null)
    return <GameSelector setGame={(game: Game) => {
      setGame(game);
      setPoints(game.getPoints());
    }} />;
  return <>
    <Navbar
      game={game}
      openGameSelector={() => setGame(null)}
    />
    <div className="body-content p-3">
      <TeamRanking
        teams={game.getTeams()}
        points={points}
      />
    </div>
    <button onClick={() => {
      game.testScore();
      setPoints([...game.getPoints()]);
      gameHandler.hardSave();
    }}>Add point</button>
    {game.getHistory().map((action: GameAction, index: number) => 
      <div key={index}>
        {action.toJSX()}
      </div>
    )}
  </>;
}

export default App
