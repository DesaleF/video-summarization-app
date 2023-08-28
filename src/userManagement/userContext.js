
import React from 'react';

const UserContext = React.createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});
export default UserContext;
