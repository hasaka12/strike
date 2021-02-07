import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import 'react-native-gesture-handler';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import MontserratSemiBold from './assets/fonts/Montserrat-SemiBold.otf';
import MontserratMedium from './assets/fonts/Montserrat-Medium.otf';
import MontserratRegular from './assets/fonts/Montserrat-Regular.otf';

import reducers from './store/reducers';
import AppNavigator from './navigations/AppNavigator';

const App = () => {
  const [loaded] = useFonts({
    Roboto,
    Roboto_medium: RobotoMedium,
    SemiBold: MontserratSemiBold,
    Medium: MontserratMedium,
    Regular: MontserratRegular,
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={createStore(reducers, applyMiddleware(ReduxThunk))}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
