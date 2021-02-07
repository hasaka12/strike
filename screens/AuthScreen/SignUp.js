import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import LOGIN_IMAGE from '../../images/login.jpg';
import * as authActions from '../../store/actions/auth';

import { isValidEmail } from './utils';

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', height: '100%' },
  img: { width: '100%', height: '43%' },
  mainText: {
    fontSize: 30,
    fontFamily: 'SemiBold',
    alignSelf: 'center',
  },
  descriptionText: {
    fontFamily: 'SemiBold',
    marginHorizontal: 55,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 25,
    paddingHorizontal: 10,
    borderColor: '#00716F',
    borderRadius: 23,
    paddingVertical: 2,
  },
  input: { paddingHorizontal: 10 },
  loadingContainer: {
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 23,
  },
  buttonContainer: {
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#00716F',
    paddingVertical: 10,
    borderRadius: 23,
  },
  loginButton: {
    color: 'white',
    fontFamily: 'SemiBold',
  },
  newUserButton: {
    alignSelf: 'center',
    color: '#00716F',
    fontFamily: 'SemiBold',
    paddingVertical: 30,
  },
});

const SignUp = ({ setIsSignInPage }) => {
  const [inputFields, setInputfields] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const signUpHandler = async () => {
    if (isValidate) {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(
          authActions.signup(inputFields.userName, inputFields.password),
        );
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      Alert.alert(
        'An Error Occured!',
        'userName should be a valid email and password should be more than 5 charactors',
        [{ text: 'Ok' }],
      );
    }
  };

  const userNameChangeHandler = e => {
    const key = 'userName';
    setInputfields({ ...inputFields, [key]: e });
  };

  const passwordChangeHandler = e => {
    const key = 'password';
    setInputfields({ ...inputFields, [key]: e });
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  useEffect(() => {
    setIsValidate(
      isValidEmail(inputFields.userName) &&
        inputFields.password &&
        inputFields.password.length > 5,
    );
  }, [inputFields.password, inputFields.userName]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}
    >
      <Image source={LOGIN_IMAGE} style={styles.img} />
      <Text style={styles.mainText}>Sign Up</Text>
      <Text style={styles.descriptionText}>Enter your credentials</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" color="#00716F" size={24} />
        <TextInput
          id="userName"
          placeholder="Enter Username"
          value={inputFields.userName}
          style={styles.input}
          onChangeText={userNameChangeHandler}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="qrcode" color="#00716F" size={24} />
        <TextInput
          id="password"
          placeholder="Enter Password"
          secureTextEntry
          value={inputFields.password}
          style={styles.input}
          onChangeText={passwordChangeHandler}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#00716F" />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={signUpHandler}>
          <View style={styles.buttonContainer}>
            <Text style={styles.loginButton}>Sign Up</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          setIsSignInPage(true);
        }}
      >
        <Text style={styles.newUserButton}>Already an User</Text>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

SignUp.propTypes = {
  setIsSignInPage: PropTypes.func.isRequired,
};

export default SignUp;
