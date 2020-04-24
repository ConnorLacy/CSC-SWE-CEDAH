import React from 'react';
import {connect} from 'react-redux';
import {hideModal} from './redux/actions/app';
import MyNav from './components/nav';
import MyModal from './components/modal';
import Welcome from './pages/welcome';
import Fetcher from './pages/fetcher';
import Dashboard from './pages/dashboard';
import Logout from './pages/logout';
import Groupviewer from './pages/group_details';

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
          <Route href="" path="/fetcher" exact component={Fetcher}/>
          { props.isAuthenticated ?
              <> 
                <Route href="" path="/dashboard" component={Dashboard}/>
                <Route href="" path="/view/:name/:id" component={Groupviewer}/>
                <Route href="" path="/logout" exact component={Logout} />
              </>
              : <Redirect push to="/"/>
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