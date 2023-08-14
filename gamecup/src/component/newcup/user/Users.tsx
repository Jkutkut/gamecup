import InputText from "../../generic/InputText";
import User from "./User";
import { setInvalid, setValid, removeState } from "../../generic/InputText";

interface Props {
  users: string[];
  setUsers: (users: string[]) => void;
}

const Users = ({ users, setUsers }: Props) => {

  const addUsr = () => {
    const input = document.getElementById('addUsr') as HTMLInputElement;
    const user = input.value.trim();
    removeState(input);
    if (user === '') return;
    if (users.includes(user)) {
      setInvalid(input);
      return;
    }
    setValid(input);
    setUsers([...users, user]);
    input.value = '';
    input.focus();
  };

  const removeUsr = (user: string) => {
    setUsers(users.filter((u) => u !== user));
  };

  let usersHtml;
  if (users.length > 0) {
    usersHtml = users.map((user: string) => (
      <User key={user} user={user} removeUsr={removeUsr} />
    ));
  } else {
    usersHtml = <div>No users</div>;
  }

  return (<>
    <h3>Users:</h3>
    <InputText
      id="addUsr"
      label="Username"
      placeholder=""
      validText="User added successfully"
      invalidText="Invalid username"
      onEnter={addUsr}
      onChange={removeState}
    />
    <button type="button" className="btn btn-primary" onClick={addUsr}>Add</button>
    <br/><br/>
    <h3>Users:</h3>
    <div className='container text-center'>
      {usersHtml}
    </div>
  </>);
}

export default Users;