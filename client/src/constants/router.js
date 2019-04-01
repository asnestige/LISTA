import React from 'react';
import {Platform} from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import HeaderIcon from 'components/HeaderIcon';
import {
  appTitle,
  HeaderBackIcon,
  HeaderMenuIcon,
  HeaderFriendIcon,
  colors,
} from './appConfig.js';
import HomeScreen from 'screens/HomeScreen';
import FriendScreen from 'screens/FriendScreen';
import ShoppingListScreen from 'screens/ShoppingListScreen';

const getIonicon = ionicon =>
  Platform.OS === 'ios' ? 'ios-' + ionicon : 'md-' + ionicon;

const DrawerNavigatorOptions = {
  initialRouteName: 'Home',
  drawerBackgroundColor: colors.AColor,
  drawerType: 'front',
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      title: 'Home',
      screen: HomeScreen,
    },
  },
  DrawerNavigatorOptions,
);

const StackNavigator = createStackNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator,
    },
    Friends: {
      title: 'Add Friends to the list',
      screen: FriendScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: (
          <HeaderIcon
            name={getIonicon(HeaderBackIcon)}
            onPress={() => navigation.goBack()}
          />
        ),
      }),
    },
    ShoppingList: {
      title: 'ShoppingList',
      path: 'lists/:name',
      screen: ShoppingListScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: (
          <HeaderIcon
            name={getIonicon(HeaderBackIcon)}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: (
          <HeaderIcon
            name={getIonicon(HeaderFriendIcon)}
            onPress={() =>
              navigation.navigate('Friends', {
                listId: navigation.state.params.listId,
              })
            }
          />
        ),
      }),
    },
  },
  {
    headerMode: 'float',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitle: appTitle,
      headerLeft: (
        <HeaderIcon
          name={getIonicon(HeaderMenuIcon)}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  },
);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
