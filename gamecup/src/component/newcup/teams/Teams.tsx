import Modal from 'react-bootstrap/Modal';
import InputText from "../../generic/InputText";
import InputTypes from "../../generic/InputTypes";
import { setValid, setInvalid, removeState } from "../../generic/InputText";
import User from "../../../model/User";
import Team from "../../../model/Team";
import { useState } from "react";
import { Button } from 'react-bootstrap';
import CollapsableContainer from '../../generic/collapse/CollapsableContainer';

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
    <CollapsableContainer title='Game:' defaultCollapsed={true}>
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
          Create teams
        </button>
      </div>
      {teams && <>
        <br />
        <h3>Teams:</h3>
        <div className='container text-center'>
          {teams.map((t: Team, i) => <div key={i}>
            <h4>
              {t.getName()}
              &nbsp;&nbsp;
              <button type="button" className="btn btn-outline-secondary btn-sm"
                onClick={() => setRenameTeamModal(t)}
              >
                Rename
              </button>
            </h4>
            <div className="row">
              {t.getPlayers().map((user: User, index) => <div key={index} className="col">{user.getName()}</div>)}
            </div>
            <br /><br />
          </div>)}
        </div>
        <Modal
          show={renameTeamModal !== null}
          onHide={closeModal}
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Rename {renameTeamModal?.getName()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <InputText id='renameTeam'
                label='New name'
                placeholder=''
                validText='Team renamed successfully'
                invalidText='Invalid name for team'
                onEnter={renameTeam}
                onChange={removeState}
                type={InputTypes.text}
              />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => renameTeam()}>
              Rename
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
    </CollapsableContainer>
  );
}

export default TeamsComponent;