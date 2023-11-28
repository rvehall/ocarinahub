import { useContext } from 'preact/hooks';

import { AppContext } from '../AppContext';

export function Profile() {
  const { state, dispatch } = useContext(AppContext);
  
  return (<section>
    <h1>Profile</h1>
    <p><strong>email:</strong> {state.user.email}</p>
    <p><strong>Username:</strong> {state.user.username}</p>
    <p><strong>Name:</strong> {state.user.full_name}</p>
  </section>
  )
}
