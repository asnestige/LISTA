import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {ScrollView} from 'react-native';

class ListMembers extends React.Component {
  render() {
    const {peopleInList, adminPriveleges} = this.props;
    return (
      <ScrollView>
        <View style={styles.row}>
          {peopleInList.map(({user_name, user_email, is_admin}) => {
            if (is_admin || !adminPriveleges) {
              return (
                <Chip
                  key={user_email}
                  style={this.Style(is_admin)}
                  icon="person">
                  {user_name}
                </Chip>
              );
            } else {
              return (
                <Chip
                  onClose={() => this.props.handleDelete(user_email)}
                  key={user_email}
                  style={this.Style(is_admin)}
                  icon="person">
                  {user_name}
                </Chip>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  }

  Style = isAdmin => {
    return {
      margin: 4,
      backgroundColor: 'lightgray',
      borderColor: 'orange',
      borderWidth: isAdmin ? 2 : 0,
    };
  };
}

export default ListMembers;

const styles = StyleSheet.create({
  member: {
    margin: 4,
    backgroundColor: 'lightgray',
  },
  row: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});
