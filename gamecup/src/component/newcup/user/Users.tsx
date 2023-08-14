import InputText from "../../generic/InputText";
import UserComponent from "./User";
import { setInvalid, setValid, removeState } from "../../generic/InputText";
import User from "../../../model/User";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

const Users = ({ users, setUsers }: Props) => {

  const addUsr = () => {
    const input = document.getElementById('addUsr') as HTMLInputElement;
    // const user = input.value.trim();
    const userName = input.value.trim();
    if (userName === '') {
      setInvalid(input);
      return;
    }
    const user = new User(input.value.trim());
    if (users.includes(user)) {
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