import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import About from './about';
import Error from './error';
import NavBar from './navbar';

const App = () => {
  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <NavBar />
            <Home />
          </Route>
          <Route exact path='/about'>
            <NavBar />
            <About />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
