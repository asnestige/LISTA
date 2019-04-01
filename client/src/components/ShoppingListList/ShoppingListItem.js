import * as React from 'react';
import {Checkbox} from 'react-native-paper';
import {List, IconButton} from 'react-native-paper';

class ShoppingListItem extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount () {
    if (this.props.checkedBy) {
      this.setState({checked:true})
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.checkedBy !== this.props.checkedBy) {
      if (this.props.checkedBy !== null) {
        this.setState({checked:true})
      }
      else {
        this.setState({checked:false})
      }
    }
  }

  handleCheckBoxPress = async (itemId, checkedBy) => {
    const {checked} = this.state
    const {ShoppingListUncheckItem, ShoppingListCheckItem} = this.props;
    if (checked == true) {
      const checked = await ShoppingListUncheckItem(itemId, checkedBy);
      console.log(checked)
      this.setState({checked});
    }
    else {
      const checked = await ShoppingListCheckItem(itemId, checkedBy);
      this.setState({checked});
    }
  }


  render() {
    const {id, title, checkedBy, ShoppingListDeleteItem}  = this.props;
    const {checked} = this.state;
    return (
      <List.Item
        title={title}
        left={() => (
          <Checkbox
            uncheckedColor="#000"
            status={checked ? 'checked' : 'unchecked'}
          />
        )}
        right={() => (
          <IconButton
            icon="clear"
            size={20}
            onPress={() => ShoppingListDeleteItem(id)}
          />
        )}
        onPress={() => this.handleCheckBoxPress(id, checkedBy)}
      />
    );
  }
}

export default ShoppingListItem;
