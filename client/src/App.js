import React from 'react';
import {Provider} from 'react-redux';
import {AppLoading, Font, Icon} from 'expo';
import {Platform} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import configureStore from './store/configureStore';
import AuthScreen from './screens/AuthScreen';

const store = configureStore();

class App extends React.Component {
  state = {
    isLoaded: false,
  };

  async componentWillMount() {
    const fontName = Platform.OS === 'ios' ? 'Material Icons' : 'MaterialIcons';
    await Font.loadAsync({
      ...Icon.Ionicons.font,
      [fontName]: require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
    });
    this.setState({isLoaded: true});
  }

  render() {
    const {isLoaded} = this.state;
    const theme = {
      ...DefaultTheme,
      roundness: 2,
      colors: {
        text: 'black',
        primary: 'orange',
        accent: 'orange',
        backdrop: 'orange',
        disabled: 'orange',
        background: '#ffffff',
        surface: 'orange',
        placeholder: '#afafaf',
      },
    };
    return isLoaded ? (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AuthScreen />
        </PaperProvider>
      </Provider>
    ) : (
      <AppLoading />
    );
  }
}

export default App;
