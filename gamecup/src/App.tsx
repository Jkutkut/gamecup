import { useState } from 'react'
import Users from './component/user/Users';

function App() {
  const [users, setUsers] = useState<string[]>([]);

  return <>
      <Users users={users} setUsers={setUsers} />
  </>;
}

export default App
