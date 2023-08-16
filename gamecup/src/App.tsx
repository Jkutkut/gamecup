import { useState } from 'react';
import Game from './model/games/Game';
import StorageHandler from './model/db/StorageHandler';
import GameSelector from './component/gameSelector/GameSelector';
import Navbar from './component/navbar.tsx/Navbar';
import TeamRanking from './component/teamRanking/TeamRanking';
import GameAction from './model/actions/GameAction';
import CollapsableContainer from './component/generic/collapse/CollapsableContainer';
import ModalAddScore from './component/ModalAddScore/ModalAddScore';

function App() {
  const [gameHandler] = useState<StorageHandler>(StorageHandler.getInstance());
  const [game, setGame] = useState<Game | null>(gameHandler.getCurrentGame());
  const [points, setPoints] = useState<number[]>(game?.getPoints() || []);
  const [addingScore, setAddingScore] = useState<boolean>(false);

  if (game == null)
    return <GameSelector setGame={(game: Game) => {
      setGame(game);
      setPoints(game.getPoints());
    }} />;

  const score = (action: GameAction) => {
    game.addAction(action);
    setPoints([...game.getPoints()]);
    gameHandler.hardSave();
    setAddingScore(false);
  };

  return <>
    <Navbar
      game={game}
      openGameSelector={() => setGame(null)}
    />
    <div className="body-content p-3">
      <CollapsableContainer title='Teams'>
        <TeamRanking
            teams={game.getTeams()}
            points={points}
          />
      </CollapsableContainer>
      <br />
      <CollapsableContainer title='History' >
        <div className="card" style={{maxHeight: '50vh', overflowX: 'scroll'}}>
          {game.getHistory().map((action: GameAction, index: number) =>
            <div key={index}>
              {action.toJSX()}
            </div>
          ).reverse()}
        </div>
      </CollapsableContainer>
    </div>
    <br />
    <br />
    <div className='d-grid'>
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => setAddingScore(true)}
      >
        Add Score
      </button>
    </div>
    <ModalAddScore
      show={addingScore}
      onHide={() => setAddingScore(false)}
      game={game}
      onNewGameAction={score}
    />
  </>;
}

export default App
