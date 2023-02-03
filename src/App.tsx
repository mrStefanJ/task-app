import { Fragment, useContext } from 'react';

import './App.css';
import AuthContext from './store/auth-context';
import HomePage from './pages/home/HomePage';


function App() {
  const ctx = useContext(AuthContext);

  return (
    <Fragment>
        {/* <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <HomePage />}
        </main> */}
        <HomePage />
    </Fragment>
  );
}

export default App;
