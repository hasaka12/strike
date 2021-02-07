import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthScreen = ({ navigation }) => {
  const [isSignInPage, setIsSignInPage] = useState(true);

  return (
    <View>
      {isSignInPage ? (
        <SignIn setIsSignInPage={setIsSignInPage} navigation={navigation} />
      ) : (
        <SignUp setIsSignInPage={setIsSignInPage} navigation={navigation} />
      )}
    </View>
  );
};

AuthScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AuthScreen;
