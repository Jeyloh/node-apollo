import React from 'react';
import './App.css';
import Authentication from './components/Authentication';
import UserPage from './components/UserPage/UserPage';


export const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  handleLogout: () => { },
  setAuthToken: () => { }
});

const AuthState = ({ children }) => {
  const token = sessionStorage.getItem("authToken")
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!token);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }
  const setAuthToken = React.useCallback( (token) => {
    if (token) {
      sessionStorage.setItem("authToken", token);
      window.location.reload();
    }
  }, [])


  React.useEffect(() => {
    if (token) setIsAuthenticated(true);
  }, [setIsAuthenticated, token])

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, setAuthToken, handleLogout }}>
    {children}
  </AuthContext.Provider>
}

function App() {

  return (
    <AuthState>
      <div className="app">
        <header className="app-header">
          <h1>Notedly</h1>
        </header>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <main>
              {isAuthenticated ?
                <UserPage />
                :
                <Authentication />
              }
            </main>
          )}
        </AuthContext.Consumer>

      </div>
    </AuthState>
  );
}

export default App;
