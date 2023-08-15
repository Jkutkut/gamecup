import User from "../../../../model/User";

interface Props {
  user: User;
  removeUsr: (user: User) => void;
}

const UserComponent = ({ user, removeUsr }: Props) => {
  return (
  <div className="container text-center">
    <div className="row">
      <div className="col">
        <span>{user.getName()}</span>
      </div>
      <div className="col">
        <button type="button" className="btn-close" aria-label="Close" onClick={() => removeUsr(user)}></button>
      </div>
    </div>
  </div>);
}

export default UserComponent;