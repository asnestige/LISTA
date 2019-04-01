import * as React from 'react';
import {TextInput} from 'react-native-paper';

class AddItemInput extends React.Component {
  render() {
    const {label, value, tekstInput} = this.props;
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={text => tekstInput(text)}
      />
    );
  }
}

export default AddItemInput;
