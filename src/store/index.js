import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import appReducer, { appReducerInit } from './appreducer';
import thunk from 'redux-thunk';
import { createFirestoreInstance, firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore';

// Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const createStoreWithFirebase = compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase))(createStore);

const rootReducer = combineReducers({ firebase: firebaseReducer, firestore: firestoreReducer, appReducer });

const store = createStoreWithFirebase(rootReducer, { appReducer: appReducerInit });

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export const configureStore = () => {
  return { rrfProps, store };
}