import React from 'react';
import {connect} from 'react-redux';
import {hideModal} from './redux/actions/app';
import Profile from './pages/Profile';
import MyNav from './components/MyNav';
import MyModal from './components/MyModal';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Fetcher from './pages/Fetcher';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import AddGroup from './pages/AddGroup';
import JoinGroup from './pages/JoinGroup';
import Groupviewer from './pages/Groupviewer';

import {
  BrowserRouter as Router, 
  Route, 
  Redirect
} from 'react-router-dom';


const App = (props) => {
  return (
     <Router>
        <div className="App">
          <MyNav/>
          <MyModal 
            show={props.showModal}
            onHide={props.hideModal}
            success={props.success}
            message={props.message}/>
          <Route href="" path="/" exact component={Welcome}/>
          <Route href="" path="/login" exact component={Login}/>
          <Route href="" path="/fetcher" exact component={Fetcher}/>
          <Route href="" path="/signup" exact component={Signup}/>
          { props.isAuthenticated ?
              <> 
                <Route href="" path="/profile" exact component = {Profile}/>
                <Route href="" path="/dashboard" exact component = {Dashboard}/>
                <Route href="" path="/group/view/:name/:id" component={Groupviewer}/>
                <Route href="" path="/group/add" component={AddGroup}/>
                <Route href="" path="/group/join" component={JoinGroup}/>
                <Route href="" path="/logout" exact component={Logout} />
              </>
              : <Redirect push to="/login"/>
          }
        </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  showModal: state.app.showModal,
  success: state.app.success,
  message: state.app.message
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);