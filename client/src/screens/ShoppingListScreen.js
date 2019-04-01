import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import ShoppingListList from 'components/ShoppingListList';
import AddItemButton from 'components/AddItemButton';
import AddItemInput from 'components/AddItemInput';
import lista from 'constants/lista';

class ShoppingListScreen extends React.Component {
  state = {
    items: [],
    list: [],
    newItem: '',
  };

  componentDidMount = async () => {
    const {navigation} = this.props;
    const {listId} = navigation.state.params;
    lista().getListItems({listId})
      .then(items => this.setState({listId, items:items}))
      .catch(err => console.log(err)) 
    this.interval = setInterval(() => {
      lista().getListItems({listId})
        .then(items => this.setState({listId, items:items}))
        .catch(err => console.log(err)) 
    }, 2000)
  };

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  ShoppingListTextInput = text => {
    this.setState({newItem: text});
  };

  ShoppingListAddItem = async () => {
    const {listId} = this.props.navigation.state.params;
    let {newItem} = this.state;
    if (newItem === '') {
      return;
    }

    await lista().createListItem({listId, itemName: newItem});
    const items = await lista().getListItems({listId});
    this.setState({items: items, newItem: ''});
  };

  ShoppingListDeleteItem = async itemId => {
    const {listId} = this.props.navigation.state.params;
    await lista().deleteItem({itemId});
    const items = await lista().getListItems({listId});
    this.setState({items: items});
  };

  ShoppingListCheckItem = async (itemId, checkedBy) => {
    const {userEmail} = this.props
    try {
      const res = await lista().checkItem({itemId, checkedBy: userEmail})
      return true
    }
    catch(err) {
      console.log(err);
      return false
    }
  }

  ShoppingListUncheckItem = async (itemId, checkedBy) => {
    const {userEmail, navigation} = this.props
    const {isAdmin} = navigation.state.params;
    if (userEmail === checkedBy || isAdmin===1) {
      try {
        const res = await lista().checkItem({itemId, checkedBy: null})
        return false
      }
      catch(err) {
        console.log(err);
        return true
      }
    }
    return true
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AddItemInput
          label="Vare"
          value={this.state.newItem}
          tekstInput={this.ShoppingListTextInput}
        />
        <AddItemButton
          title="Legg til vare"
          buttonPress={this.ShoppingListAddItem}
        />
        <ShoppingListList
          list={this.state.items}
          ShoppingListDeleteItem={this.ShoppingListDeleteItem}
          ShoppingListCheckItem={this.ShoppingListCheckItem}
          ShoppingListUncheckItem={this.ShoppingListUncheckItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.login.email,
});

export default connect(
  mapStateToProps
)(ShoppingListScreen);
