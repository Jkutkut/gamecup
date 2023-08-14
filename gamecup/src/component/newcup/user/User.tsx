interface Props {
  user: string;
  removeUsr: (user: string) => void;
}

const User = ({ user, removeUsr }: Props) => {
  return (
  <div className="container text-center">
    <div className="row">
      <div className="col">
        <span>{user}</span>
      </div>
      <div className="col">
        <button type="button" className="btn-close" aria-label="Close" onClick={() => removeUsr(user)}></button>
      </div>
    </div>
  </div>);
}

export default User;