import React from "react";

import { withFirebaseSFC, IWithFirebaseProps } from "../Firebase/context";
import Firebase from "../Firebase";

const SignOutButton = ({ firebase }: IWithFirebaseProps) =>
  firebase ? (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  ) : (
    <button type="button">Sign Out</button>
  );

export default withFirebaseSFC(SignOutButton);
