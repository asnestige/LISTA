import React from 'react';
import {List} from 'react-native-paper';
import ShoppingListItem from './ShoppingListItem';
import {ScrollView} from 'react-native';

class ShoppingListList extends React.Component {
  render() {
    const {list, ShoppingListCheckItem, ShoppingListUncheckItem, ShoppingListDeleteItem} = this.props;
    return (
      <ScrollView>
        <List.Section>
          {list.map(({item_id, item_name, checked_by}) => (
            <ShoppingListItem
              key={item_id}
              id={item_id}
              title={item_name}
              checkedBy={checked_by}
              ShoppingListDeleteItem={ShoppingListDeleteItem}
              ShoppingListCheckItem={ShoppingListCheckItem}
              ShoppingListUncheckItem={ShoppingListUncheckItem}
            />
          ))}
        </List.Section>
      </ScrollView>
    );
  }
}

export default ShoppingListList;
