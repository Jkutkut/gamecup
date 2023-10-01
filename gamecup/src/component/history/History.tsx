import {useState} from "react";
import GameAction from "../../model/actions/GameAction";
import Game from "../../model/games/Game";
import CollapsableContainer from "../generic/collapse/CollapsableContainer";

interface Props {
  game: Game;
};

const History = ({game}: Props) => {
  const [reverse, setReverse] = useState<boolean>(true);
  const iterator = reverse ? game.getHistory().rIter() : game.getHistory().iter();
  const history = Array.from(iterator);
  return <>
    <CollapsableContainer title='History' >
      {history.length > 0 &&
        <div className="card gap-2 p-2" style={{maxHeight: '50vh', overflowX: 'scroll'}}>
          <div className="form-floating">
            <select className="form-select" id="historyStyle"
              value={reverse? 0 : 1}
              onChange={(e) => setReverse(e.target.value === '0')}
            >
              <option value="1">Latest first</option>
              <option value="0">Oldest first</option>
            </select>
            <label htmlFor="historyStyle">History style</label>
          </div>
          {history.map((action: GameAction, index: number) =>
            <div key={index}>
              {action.toJSX()}
            </div>
          ).reverse()}
        </div>
      }
    </CollapsableContainer>
  </>;
};

export default History;
