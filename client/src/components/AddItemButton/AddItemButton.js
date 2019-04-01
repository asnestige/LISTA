import * as React from 'react';
import {Button} from 'react-native-paper';

const AddItemButton = ({title, buttonPress}) => (
  <Button mode="contained" dark onPress={() => buttonPress()}>
    {title}
  </Button>
);

export default AddItemButton;
