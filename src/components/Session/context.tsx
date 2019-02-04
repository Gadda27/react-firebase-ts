import React from "react";

const AuthUserContext = React.createContext<firebase.User | null>(null);

export default AuthUserContext;

export interface IAuthUserProps {
  authUser?: firebase.User | null;
}

export const withAuthentication = <P extends object>(
    Component: React.ComponentType<P>
  ): React.SFC<P & IAuthUserProps> => ({
    authUser,
    ...props
  }: IAuthUserProps) => <AuthUserContext.Consumer>{user => <Component authUser={user} {...props as P} />}</AuthUserContext.Consumer>;
