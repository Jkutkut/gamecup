import { useState } from 'react';
import Game from './model/games/Game';
import StorageHandler from './model/db/StorageHandler';
import GameSelector from './component/gameSelector/GameSelector';
import Navbar from './component/navbar.tsx/Navbar';
import TeamRanking from './component/teamRanking/TeamRanking';
import GameAction from './model/actions/GameAction';
import CollapsableContainer from './component/generic/collapse/CollapsableContainer';
import Modal from './component/generic/modal/Modal';
import ScoreAction from './model/actions/ScoreAction';
import GameActionFactory from './model/actions/GameActionFactory';

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
    <div className='fixed-bottom d-grid'>
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => setAddingScore(true)}
      >
        Add Score
      </button>
    </div>
    <Modal
      title='Add Score'
      show={addingScore}
      onHide={() => setAddingScore(false)}
      confirmText={'Add'}
      onConfirm={() => {
        const teams = game.getTeams();

        const randomTeamIdx = Math.floor(Math.random() * teams.length);
        const randomScore = Math.floor(Math.random() * 5) + 1;

        // const r = new ScoreAction(teams[randomTeamIdx], Math.floor(Math.random() * 10) + 1);
        const gameActionFactory = GameActionFactory.getInstance();
        const types = gameActionFactory.getTypes();
        const randomTypeIdx = Math.floor(Math.random() * types.length);
        const newAction = gameActionFactory.newAction(
          types[randomTypeIdx],
          teams[randomTeamIdx],
          randomScore
        );
        if (newAction === null) return; // TODO handle
        game.addAction(newAction);
        setPoints([...game.getPoints()]);
        gameHandler.hardSave();
        setAddingScore(false);
      }}
    >

    </Modal>
  </>;
}

export default App
