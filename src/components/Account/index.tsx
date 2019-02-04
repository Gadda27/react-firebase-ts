import React from 'react';
import { withAuthentication, IAuthUserProps } from '../Session/context';

const Account = ({authUser}:IAuthUserProps) => (
  <div>
    {authUser? authUser.displayName : <p>No User logged in</p>}
  </div>
);

export default withAuthentication(Account);