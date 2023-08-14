import { useState } from 'react';
import NewCup from './component/newcup/NewCup';

function App() {
  const [teams, setTeams] = useState<any[] | null>(null);
  const [selectingTeams, setSelectingTeams] = useState<boolean>(true); // TODO default false

  const begin = () => {
    setSelectingTeams(false);
  };

  if (selectingTeams)
    return <NewCup teams={teams} setTeams={setTeams} begin={begin} />;
  return <div>
    Stated
  </div>
}

export default App
