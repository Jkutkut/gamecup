import InputText from "../../../generic/InputText";
import InputTypes from "../../../generic/InputTypes";
import { setValid, setInvalid, removeState } from "../../../generic/InputText";
import User from "../../../../model/User";
import Team from "../../../../model/teams/Team";
import { useState } from "react";
import CollapsableContainer from '../../../generic/collapse/CollapsableContainer';
import Modal from "../../../generic/modal/Modal";

interface Props {
  users: User[];
  teams: Team[] | null;
  setTeams: (teams: Team[]) => void;
}

const TeamsComponent = ({users, teams, setTeams}: Props) => {
  const [renameTeamModal, setRenameTeamModal] = useState<Team | null>(null);

  const createTeams = () => {
    console.debug('createTeams');
    const nbrTeamsHtml = document.getElementById('nbrTeams') as HTMLInputElement;
    const getNbrTeams: () => number | null = () => {
      let nbrTeams;
      try {
        nbrTeams = parseInt(nbrTeamsHtml.value);
      } catch (e) {
        return null;
      }
      if (isNaN(nbrTeams) || nbrTeams < 1 || nbrTeams > users.length) {
        return null;
      }
      return nbrTeams;
    };
    removeState(nbrTeamsHtml);
    const nbrTeams = getNbrTeams();
    if (nbrTeams === null) {
      setInvalid(nbrTeamsHtml);
      return;
    }
    console.debug('nbrTeams', nbrTeams);
    const shuffleArr = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    const shuffledUsers = shuffleArr([...users]);
    const newTeams: any[] = [];
    for (let i = 0; i < nbrTeams; i++) {
      newTeams.push([]);
    }
    for (let i = 0, j = 0; i < shuffledUsers.length; i++, j = (j + 1) % nbrTeams) {
      newTeams[j].push(shuffledUsers[i]);
    }
    setValid(nbrTeamsHtml);
    setTeams(newTeams.map((players) => new Team(players)));
  };

  const renameTeam = () => {
    if (!teams || !renameTeamModal) return;
    const newNameInput = document.getElementById('renameTeam') as HTMLInputElement;
    const newName = newNameInput.value.trim();
    removeState(newNameInput);
    if (newName.length === 0) {
      setInvalid(newNameInput);
      return;
    }
    for (let i = 0; i < teams.length; i++) {
      if (teams[i] === renameTeamModal) continue;
      if (teams[i].getName() === newName) {
        setInvalid(newNameInput);
        return;
      }
    }
    renameTeamModal.setName(newName);
    setValid(newNameInput);
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