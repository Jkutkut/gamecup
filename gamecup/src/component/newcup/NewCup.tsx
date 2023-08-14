import { useState } from 'react';
import Users from "./user/Users";
import Teams from './teams/Teams';
import User from '../../model/User';
import Team from '../../model/Team';

interface Props {
  createNewGame: (teams: Team[]) => void;
}

const NewCup = ({createNewGame}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[] | null>(null);

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    setTeams(null);
  };

  const begin = () => {
    if (teams && teams.length > 0)
      createNewGame(teams);
  };

  return <>
    <Users users={users} setUsers={updateUsers} />
    <br />
    <Teams users={users} teams={teams} setTeams={setTeams} />
    <br />
    {teams && teams.length > 0 && <>
      <div className="fixed-bottom d-grid">
        <button type='button' className='btn btn-primary'
          onClick={begin}
        >
          Begin
        </button>
      </div>
    </>}
  </>;
}

export default NewCup;