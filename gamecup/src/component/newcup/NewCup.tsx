import { useState } from 'react';
import Users from "./user/Users";
import Teams from './teams/Teams';
import User from '../../model/User';

interface Props {
  teams: any[] | null;
  setTeams: (teams: any[] | null) => void;
  begin: () => void;
}

const NewCup = ({teams, setTeams, begin}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  // const [teams, setTeams] = useState<any[] | null>(null);

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    setTeams(null);
  };

  return <>
    <Users users={users} setUsers={updateUsers} />
    <Teams users={users} teams={teams} setTeams={setTeams} />
    <br />
    {teams && teams.length > 0 && <>
      <div className="d-grid">
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