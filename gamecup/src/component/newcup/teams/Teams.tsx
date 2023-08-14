import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import { setValid, setInvalid, removeState } from "../../generic/InputText";
import User from "../../../model/User";

interface Props {
  users: User[];
  teams: any[] | null;
  setTeams: (teams: any[] | null) => void;
}

const Teams = ({users, teams, setTeams}: Props) => {

  const createTeams = () => { // TODO refactor
    console.debug('createTeams');
    const nbrTeamsHtml = document.getElementById('nbrTeams') as HTMLInputElement;
    let nbrTeams;
    removeState(nbrTeamsHtml);
    try {
      nbrTeams = parseInt(nbrTeamsHtml.value);
    } catch (e) {
      setInvalid(nbrTeamsHtml);
      return;
    }
    if (isNaN(nbrTeams) || nbrTeams < 1 || nbrTeams > users.length) {
      setInvalid(nbrTeamsHtml);
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
    setValid(nbrTeamsHtml);
    setTeams(newTeams);
  };

  return (
    <div>
      <h3>Game:</h3>
      <InputText
        id='nbrTeams'
        label='Number of teams'
        placeholder=''
        validText='Teams created successfully'
        invalidText='Invalid number of teams'
        onEnter={createTeams}
        onChange={removeState}
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
              {team.map((user: User, index) => <div key={index} className="col">{user.getName()}</div>)}
            </div>
            <br /><br />
          </div>)}
        </div>
      </>}
    </div>
  );
}

export default Teams;