import React from 'react';
import {connect} from 'react-redux';
import LoginScreen from 'screens/LoginScreen';
import AppContainer from 'constants/router';

class AuthScreen extends React.Component {
  render() {
    const {loggedIn} = this.props;
    console.log(loggedIn);
    return loggedIn ? <AppContainer /> : <LoginScreen />;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  username: state.login.username,
  photoUrl: state.login.photoUrl,
});

export default connect(mapStateToProps)(AuthScreen);
