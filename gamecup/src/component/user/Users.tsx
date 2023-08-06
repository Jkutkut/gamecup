import User from "./User";

interface Props {
  users: string[];
  setUsers: (users: string[]) => void;
}

const Users = ({ users, setUsers }: Props) => {

  const addUsr = () => {
    const input = document.getElementById('addUsr') as HTMLInputElement;
    const user = input.value.trim();
    if (user === '') return;
    if (users.includes(user)) {
      alert('User already exists');
      return; // TODO handle this better
    }
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
    <div className="input-group mb-3">
      <span className="input-group-text" id="addUsrText">Username</span>
      <input id="addUsr" type="text" className="form-control"
        placeholder="" aria-label="Username" aria-describedby="addUsrText"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addUsr();
        }}
      />
    </div>
    <button type="button" className="btn btn-primary" onClick={addUsr}>Add</button>
    <br/><br/>
    <h3>Users:</h3>
    <div className='container text-center'>
      {usersHtml}
    </div>
  </>);
}

export default Users;