import InputText from "../generic/InputText";
import User from "./User";

interface Props {
  users: string[];
  setUsers: (users: string[]) => void;
}

const Users = ({ users, setUsers }: Props) => {

  const addUsr = () => {
    const input = document.getElementById('addUsr') as HTMLInputElement;
    const user = input.value.trim();
    input.classList.remove('is-invalid');
    if (user === '') return;
    if (users.includes(user)) {
      input.classList.add('is-invalid');
      return;
    }
    input.classList.add('is-valid');
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
    <h3>Add User:</h3>
    <InputText
      id="addUsr"
      label="Username"
      placeholder=""
      validText="User added successfully"
      invalidText="Invalid username"
      onEnter={addUsr}
      onChange={(e) => {
        e.classList.remove('is-invalid');
        e.classList.remove('is-valid');
      }}
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