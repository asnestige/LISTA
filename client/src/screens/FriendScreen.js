import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import ListMembers from 'components/ListMembers';
import AddItemButton from 'components/AddItemButton';
import AddItemInput from 'components/AddItemInput';
import lista from 'constants/lista';

class FriendScreen extends React.Component {
  state = {
    newItem: '',
    members: [],
  };

  componentDidMount = async () => {
    const {navigation} = this.props;
    const {listId} = navigation.state.params;
    this.fetchMembers();
    this.interval = setInterval(() => {
      this.setState(({listId}), () => {
        this.fetchMembers();
      });
    }, 2000)
  };

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchMembers = async () => {
    const {listId} = this.props.navigation.state.params;
    try {
      const members = await lista().getListUsers({listId});
      this.setState({members});
    } catch (err) {
      console.log(err);
    }
  };

  addMember = async userEmail => {
    const {listId} = this.props.navigation.state.params;
    try {
      await lista().addListUser({userEmail, listId});
      this.fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };

  MemberTextInput = text => {
    this.setState({newItem: text});
  };

  kickUser = async userEmail => {
    const {navigation} = this.props;
    const {listId} = navigation.state.params;
    try {
      await lista().removeListUser({userEmail, listId});
      this.fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };

  leaveList = async userEmail => {
    const {navigation} = this.props;
    const {listId} = navigation.state.params;
    try {
      await lista().removeListUser({userEmail, listId});
      this.fetchMembers();
      navigation.pop(2);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {newItem, members} = this.state;
    // Quick and dirty logic to determine wether the user that is loggedIn is admin to the list or not
    let adminPriveleges = false;
    members.forEach(person => {
      if (person.user_email == this.props.userEmail && person.is_admin) {
        adminPriveleges = true;
      }
    });
    return (
      <View style={{flex: 1}}>
        {adminPriveleges ? (
          <React.Fragment>
            <AddItemInput
              label="E-post adresse"
              value={this.state.newItem}
              tekstInput={this.MemberTextInput}
            />
            <AddItemButton
              title="Legg til medlem"
              buttonPress={() => this.addMember(newItem)}
            />
          </React.Fragment>
        ) : null}
        <ListMembers
          peopleInList={members}
          handleDelete={this.kickUser}
          userEmail={this.props.userEmail}
          adminPriveleges={adminPriveleges}
        />
        {!adminPriveleges ? (
          <AddItemButton
            title="Forlat listen"
            buttonPress={() => this.leaveList(this.props.userEmail)}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.login.email,
});

export default connect(mapStateToProps)(FriendScreen);
