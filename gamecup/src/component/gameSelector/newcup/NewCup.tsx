import { useState } from 'react';
import Users from "./user/Users";
import Teams from './teams/Teams';
import User from '../../../model/User';
import Team from '../../../model/teams/Team';
import GameType from '../../../model/games/GameType';
import InputText from '../../generic/InputText';
import InputTypes from '../../generic/InputTypes';
import setValidity from '../../../functions/InputText/setValidity';
import getNonEmptyString from '../../../functions/form/getNonEmptyString';

interface Props {
  createNewGame: (type: GameType, name: String, teams: Team[]) => void;
  cancelable: boolean;
  onCancel: () => void;
}

const NewCup = ({createNewGame, cancelable, onCancel}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[] | null>(null);

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    setTeams(null);
  };

  const begin = () => {
    const cupName = setValidity('cupName', getNonEmptyString('cupName'));
    if (!cupName || !teams || teams.length <= 0 || teams.length > users.length)
      return;
    createNewGame(GameType.BASIC, cupName, teams);
  };

  return <div className='p-3'>
    <div className='row mb-3'>
      <h1 className='col-8'>New gamecup</h1>
      <div className='col text-end'>
        {cancelable &&
          <button type='button' className='btn btn-danger'
            onClick={onCancel}
          >
            Cancel
          </button>
        }
      </div>
    </div>
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
  </div>;
}

export default NewCup;