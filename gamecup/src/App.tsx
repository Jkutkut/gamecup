import { useState } from 'react'
import Users from './component/user/Users';
import InputText from './component/generic/InputText';
import InputTypes from './component/generic/InputTypes';

function App() {
  const [users, setUsers] = useState<string[]>([]);
  const [teams, setTeams] = useState<any[] | null>(null);

  const createTeams = () => {
    console.debug('createTeams');
    const nbrTeamsHtml = document.getElementById('nbrTeams') as HTMLInputElement;
    let nbrTeams;
    nbrTeamsHtml.classList.remove('is-valid');
    try {
      nbrTeams = parseInt(nbrTeamsHtml.value);
    } catch (e) {
      nbrTeamsHtml.classList.add('is-invalid');
      return;
    }
    if (isNaN(nbrTeams) || nbrTeams < 1 || nbrTeams > users.length) {
      nbrTeamsHtml.classList.add('is-invalid');
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
    nbrTeamsHtml.classList.add('is-valid');
    setTeams(newTeams);
  };

  return <>
    <Users users={users} setUsers={setUsers} />
    <h3>Game:</h3>
    <InputText
      id='nbrTeams'
      label='Number of teams'
      placeholder=''
      validText='Teams created successfully'
      invalidText='Invalid number of teams'
      onEnter={createTeams}
      onChange={(e) => {
        e.classList.remove('is-valid');
        e.classList.remove('is-invalid');
      }}
      type={InputTypes.number}
      min={1}
      max={users.length}
    />
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
