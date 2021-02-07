import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

// let timer;

export const setDidTryAl = () => ({ type: SET_DID_TRY_AL });

export const authenticate = (userId, token, email) => dispatch => {
  // dispatch(setLogoutTimer(expiryTime));
  dispatch({ type: AUTHENTICATE, userId, token, email });
};

export const signup = (email, password) => async dispatch => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGzMlWj_8jjtJFVlg6R8Aydgn5VTLydl4',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exists already!';
    }
    throw new Error(message);
  }

  const resData = await response.json();
  console.log(resData);
  // dispatch({
  //   type: AUTHENTICATE,
  //   token: resData.idToken,
  //   userId: resData.localId,
  //   email: resData.email,
  // });
  dispatch(
    authenticate(
      resData.localId,
      resData.idToken,
      resData.email,
      // eslint-disable-next-line radix
      // parseInt(resData.expiresIn) * 1000,
    ),
  );
  const expirationDate = new Date(
    // eslint-disable-next-line radix
    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
  );
  saveDataToStorage(
    resData.idToken,
    resData.localId,
    resData.email,
    expirationDate,
  );
};

export const signin = (email, password) => async dispatch => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGzMlWj_8jjtJFVlg6R8Aydgn5VTLydl4',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!';
    }
    throw new Error(message);
  }

  const resData = await response.json();
  console.log(resData);
  // dispatch({
  //   type: AUTHENTICATE,
  //   token: resData.idToken,
  //   userId: resData.localId,
  //   email: resData.email,
  // });
  dispatch(
    authenticate(
      resData.localId,
      resData.idToken,
      resData.email,
      // eslint-disable-next-line radix
      // parseInt(resData.expiresIn) * 1000,
    ),
  );
  const expirationDate = new Date(
    // eslint-disable-next-line radix
    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
  );
  saveDataToStorage(
    resData.idToken,
    resData.localId,
    resData.email,
    expirationDate,
  );
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };

// const setLogoutTimer = expirationTime => dispatch => {
//   timer = setTimeout(() => {
//     dispatch(logout());
//   }, expirationTime);
// };

const saveDataToStorage = (token, userId, email, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      email,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
