import InputText from "../../../generic/InputText";
import UserComponent from "./User";
import User from "../../../../model/User";
import CollapsableContainer from "../../../generic/collapse/CollapsableContainer";
import setInvalid from "../../../../functions/InputText/setInvalid";
import setValid from "../../../../functions/InputText/setValid";
import removeState from "../../../../functions/InputText/removeState";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

const Users = ({ users, setUsers }: Props) => {
  const addUsr = () => {
    const input = document.getElementById('addUsr') as HTMLInputElement;
    const userName = input.value.trim();
    if (userName === '') {
      setInvalid(input);
      return;
    }
    const user = new User(input.value.trim());
    if (users.find((u) => u.getName() === user.getName())) {
      setInvalid(input);
      return;
    }
    setValid(input);
    setUsers([...users, user]);
    input.value = '';
    input.focus();
  };

  const removeUsr = (user: User) => {
    setUsers(users.filter((u) => u.getName() !== user.getName()));
  };

  let usersHtml;
  if (users.length > 0) {
    usersHtml = users.map((user: User, index) => (
      <UserComponent key={index} user={user} removeUsr={removeUsr} />
    ));
  } else {
    usersHtml = <div>No users</div>;
  }

  return (<>
    <CollapsableContainer title="Users:">
      <div className='container text-center' style={{maxHeight:'60vh', overflowX:"scroll"}}>
        {usersHtml}
      </div>
      <br />
      <InputText
        id="addUsr"
        label="Username"
        placeholder=""
        validText="User added successfully"
        invalidText="Invalid username"
        onEnter={addUsr}
        onChange={removeState}
      />
      <div className="d-grid col-6 mx-auto">
        <button type='button' className='btn btn-primary'
          onClick={addUsr}
        >
          Add
        </button>
      </div>
    </CollapsableContainer>
  </>);
}

export default Users;