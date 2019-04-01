import React from 'react';
import {connect} from 'react-redux';
import {googleLogin} from 'actions/loginActions';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

class LoginScreen extends React.Component {
  logIn = async () => {
    const {googleLogin} = this.props;
    await googleLogin();
  };

  render() {
    const {loginFailed} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loginFailed ? <Text>Innlogging feilet</Text> : null}
        <Button mode="contained" dark onPress={() => this.logIn()}>
          Logg inn med Google
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginFailed: state.login.loginFailed,
});

export default connect(
  mapStateToProps,
  {googleLogin},
)(LoginScreen);
