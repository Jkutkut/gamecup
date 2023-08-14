import { useState } from 'react';
import Users from "./user/Users";
import Teams from './teams/Teams';
import User from '../../model/User';
import Team from '../../model/Team';
import GameType from '../../model/games/GameType';
import InputText, { setInvalid, setValid } from '../generic/InputText';
import InputTypes from '../generic/InputTypes';

interface Props {
  createNewGame: (type: GameType, name: String, teams: Team[]) => void;
}

const NewCup = ({createNewGame}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[] | null>(null);

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    setTeams(null);
  };

  const begin = () => {
    const cupNameHtml = document.getElementById('cupName') as HTMLInputElement;
    const cupName = cupNameHtml.value.trim();
    if (cupName === "") {
      setInvalid(cupNameHtml);
      return;
    }
    // TODO check other games
    setValid(cupNameHtml);
    if (teams && teams.length > 0)
      createNewGame(GameType.BASIC, cupName, teams); // TODO other games
  };

  return <>
    <h1>New gamecup</h1>
    <InputText
      id='cupName'
      label='Name'
      placeholder=''
      validText='Nice name!'
      invalidText='Please enter a valid name'
      onChange={() => {}}
      onEnter={() => {}}
      type={InputTypes.text}
    />
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