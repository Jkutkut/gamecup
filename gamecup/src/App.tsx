import { useState } from 'react'
import Users from './component/user/Users';

function App() {
  const [users, setUsers] = useState<string[]>([]);
  const [teams, setTeams] = useState<any[] | null>(null);

  const createTeams = () => {
    console.debug('createTeams');
    const nbrTeamsHtml = document.getElementById('nbrTeams') as HTMLInputElement;
    let nbrTeams;
    try {
      nbrTeams = parseInt(nbrTeamsHtml.value);
    } catch (e) {
      alert('Invalid number of teams'); // TODO handle this better
      return;
    }
    if (isNaN(nbrTeams) || nbrTeams < 1 || nbrTeams > users.length) {
      alert('Invalid number of teams'); // TODO handle this better
      return;
    }
    console.debug('nbrTeams', nbrTeams);
    const shuffledUsers = [...users];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
    }
    const newTeams: any[] = [];
    for (let i = 0; i < nbrTeams; i++) {
      newTeams.push([]);
    }
    let j = 0;
    for (let i = 0; i < shuffledUsers.length; i++) {
      newTeams[j].push(shuffledUsers[i]);
      j++;
      if (j === nbrTeams) j = 0;
    }
    setTeams(newTeams);
  };

  return <>
    <Users users={users} setUsers={setUsers} />
    <h3>Game:</h3>
    <div className="input-group mb-3">
      <span className="input-group-text" id="nbrTeamsText">Number of teams</span>
      <input id="nbrTeams" type="number" className="form-control"
        placeholder="" aria-label="Number of teams" aria-describedby="nbrTeamsText"
        min={1} max={users.length}
      />
    </div>
    <button type="button" className="btn btn-primary"
      onClick={createTeams} disabled={users.length === 0}
    >
      Create teams
    </button>
    {teams && <>
      <h3>Teams:</h3>
      <div className='container text-center'>
        {teams.map((team, i) => <div key={i}>
          <h4>team {i + 1}</h4>
          <div className="row">
            {team.map((user: string) => <div className="col">{user}</div>)}
          </div>
          <br /><br />
        </div>)}
      </div>
    </>}
  </>;
}

export default App
