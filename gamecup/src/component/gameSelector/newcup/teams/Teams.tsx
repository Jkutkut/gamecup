import InputText from "../../../generic/InputText";
import InputTypes from "../../../generic/InputTypes";
import User from "../../../../model/User";
import Team from "../../../../model/teams/Team";
import { useState } from "react";
import CollapsableContainer from '../../../generic/collapse/CollapsableContainer';
import Modal from "../../../generic/modal/Modal";
import removeState from "../../../../functions/InputText/removeState";
import setValidity from "../../../../functions/InputText/setValidity";
import getInRange from "../../../../functions/form/getInRange";
import shuffleArray from "../../../../functions/array/shuffleArray";
import divideArray from "../../../../functions/array/divideArray";
import getNonEmptyString from "../../../../functions/form/getNonEmptyString";

interface Props {
  users: User[];
  teams: Team[] | null;
  setTeams: (teams: Team[]) => void;
}

const TeamsComponent = ({users, teams, setTeams}: Props) => {
  const [renameTeamModal, setRenameTeamModal] = useState<Team | null>(null);

  const createTeams = () => {
    console.debug('createTeams');
    const nbrTeams = setValidity('nbrTeams', getInRange('nbrTeams', 1, users.length));
    if (nbrTeams === null)
      return;
    console.debug('nbrTeams', nbrTeams);
    const shuffledUsers = shuffleArray([...users]);
    const newTeams: User[][] = divideArray(shuffledUsers, nbrTeams);
    setTeams(newTeams.map((players) => new Team(players)));
  };

  const renameTeam = () => {
    if (!teams || !renameTeamModal) return;
    let newName: String | null = getNonEmptyString('renameTeam');
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].equals(renameTeamModal)) continue;
      if (teams[i].getName() === newName) {
        newName = null;
        break;
      }
    }
    setValidity('renameTeam', newName);
    if (newName === null) {
      return;
    }
    renameTeamModal.setName(newName);
    setTeams([...teams]);
  }

  const closeModal = () => {
    setRenameTeamModal(null);
  }

  return (
    <CollapsableContainer title='Game:' defaultCollapsed={false}>
      <InputText id='nbrTeams'
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
      <div className='d-grid col-6 mx-auto'>
        <button type="button" className="btn btn-primary"
          onClick={createTeams} disabled={users.length === 0}
        >
          {teams ? 'Shuffle' : 'Create teams'}
        </button>
      </div>
      {teams && <>
        <br />
        <div
          className='container text-center card gap-3 p-3'
          style={{maxHeight:'60vh', overflowX:"scroll"}}
        >
          {teams.map((t: Team, i) =>
            <div key={i} className="card p-3">
              <div className="row p-2">
                <h4 className="col">
                  {t.getName()}
                </h4>
                <div className="col text-end">
                  <button type="button" className="btn btn-outline-secondary btn-sm"
                    onClick={() => setRenameTeamModal(t)}
                  >
                    Rename
                  </button>
                </div>
              </div>
              <div className="row p-2">
                {t.getPlayers().map((user: User, index) => 
                  <div key={index} className="col">
                    {user.getName()}
                  </div>)
                }
              </div>
            </div>)
          }
        </div>
        <Modal
          show={renameTeamModal !== null}
          onHide={closeModal}
          title={`Rename ${renameTeamModal?.getName()}`}
          confirmText={'Rename'}
          onConfirm={renameTeam}
        >
          <InputText id='renameTeam'
            label='New name'
            placeholder=''
            validText='Team renamed successfully'
            invalidText='Invalid name for team'
            onEnter={renameTeam}
            onChange={removeState}
            type={InputTypes.text}
          />
        </Modal>
      </>}
    </CollapsableContainer>
  );
}

export default TeamsComponent;