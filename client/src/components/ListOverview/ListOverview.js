import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import ListItem from './ListItem';

class ListOverview extends React.Component {
  render() {
    const {lists, navigation, deleteList} = this.props;
    return (
      <ScrollView>
        <List.Section title="Handlelister">
          {lists.map(({listId, listName, isAdmin}) => (
            <ListItem
              key={listId}
              id={listId}
              isAdmin={isAdmin}
              title={listName}
              navigation={navigation}
              deleteList={deleteList}
            />
          ))}
        </List.Section>
      </ScrollView>
    );
  }
}

export default ListOverview;
