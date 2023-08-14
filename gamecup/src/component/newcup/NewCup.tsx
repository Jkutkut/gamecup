import { useState } from 'react';
import Users from "./user/Users";
import Teams from './teams/Teams';

interface Props {

}

const NewCup = ({}: Props) => {
  const [users, setUsers] = useState<string[]>([]);
  const [teams, setTeams] = useState<any[] | null>(null);

  const updateUsers = (newUsers: string[]) => {
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
        >
          Begin
        </button>
      </div>
    </>}
  </>;
}

export default NewCup;