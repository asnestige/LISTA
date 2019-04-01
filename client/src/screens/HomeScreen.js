import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import ListOverview from 'components/ListOverview';
import AddItemInput from 'components/AddItemInput';
import AddItemButton from 'components/AddItemButton';
import {fetchUser} from 'actions/userActions';
import lista from 'constants/lista';

class HomeScreen extends React.Component {
  state = {
    newList: '',
  };

  componentDidMount = () => {
    const {userEmail, fetchUser} = this.props;
    this.interval = setInterval(() => {
      fetchUser(userEmail)
    }, 2000)
  };

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleTextInput = text => {
    this.setState({newList: text});
  };

  handleAddList = async () => {
    const {newList} = this.state;
    const {fetchUser, userEmail} = this.props;
    if (newList === '') {
      return;
    }
    try {
      await lista().createUserList({
        userId: userEmail,
        listName: newList,
      });
      this.setState({newList: ''});
      fetchUser(userEmail);
    } catch (err) {
      console.log(err);
    }
  };

  deleteList = async listId => {
    const {fetchUser, userEmail} = this.props;
    try {
      await lista().deleteList({listId});
      fetchUser(userEmail);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {user} = this.props;
    console.log(user.lists);
    if (!user.fetched && !user.fetchingFailed) {
      return (
        <View style={{flex: 1}}>
          <Text style={{padding: 20}}>Laster inn...</Text>
        </View>
      );
    } else if (user.fetched && user.fetchingFailed) {
      return (
        <View style={{flex: 1}}>
          <Text style={{padding: 20}}>
            Noe gikk galt, kontroller internettforbindelsen din.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <AddItemInput
            label="Navn på handleliste"
            value={this.state.newList}
            tekstInput={this.handleTextInput}
          />
          <AddItemButton
            title="Opprett ny handleliste"
            buttonPress={this.handleAddList}
          />
          <ListOverview
            lists={user.lists}
            deleteList={this.deleteList}
            {...this.props}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userEmail: state.login.email,
});

export default connect(
  mapStateToProps,
  {fetchUser},
)(HomeScreen);
