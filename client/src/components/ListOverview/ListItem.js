import * as React from 'react';
import {List, IconButton} from 'react-native-paper';

class ListItem extends React.Component {
  render() {
    const {id, title, deleteList, navigation, isAdmin} = this.props;
    return (
      <List.Item
        title={title}
        left={() => <List.Icon icon="shopping-cart" />}
        right={() =>
          isAdmin ? (
            <IconButton icon="clear" size={20} onPress={() => deleteList(id)} />
          ) : null
        }
        onPress={() =>
          navigation.push('ShoppingList', {
            listId: id,
            isAdmin: isAdmin
          })
        }
      />
    );
  }
}

export default ListItem;

//key={item.listId}
//title={item.listName}
