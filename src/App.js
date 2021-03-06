import React from 'react';
import Header from './components/header';
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import ContactList from './components/contactList';
import EditContact from './components/editContact';

function App() {


  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path={"/"} exact component={ContactList} />
          <Route path={"/list/:id"}  component={EditContact} />
        </Switch>
      </div>
    </Router>
  );

}

export default App;
