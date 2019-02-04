import React from "react";
import Firebase from "./firebase";

export const FirebaseContext = React.createContext<Firebase | null>(null);

export interface IWithFirebaseProps {
  firebase?: Firebase | null;
}


export const withFirebaseSFC = <P extends object>(
  Component: React.ComponentType<P>
): React.SFC<P & IWithFirebaseProps> => ({
  firebase,
  ...props
}: IWithFirebaseProps) => <FirebaseContext.Consumer>{fb => <Component {...props as P} firebase={fb} />}</FirebaseContext.Consumer>;


export const withFirebaseSC = <P extends object>(
  Component: React.ComponentType<P>
): React.SFC<P & IWithFirebaseProps> => ({
  firebase,
  ...props
}: IWithFirebaseProps) => <FirebaseContext.Consumer>{fb => <Component {...props as P} firebase={fb} />}</FirebaseContext.Consumer>;


