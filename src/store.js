import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//Reducers
// @toDo

const firebaseConfig = {
  apiKey: "AIzaSyCrjF5cknITeG7iR4V2YcB7KCOeNY6g4Jk",
  authDomain: "reactclientpanel-640a8.firebaseapp.com",
  databaseURL: "https://reactclientpanel-640a8.firebaseio.com",
  projectId: "reactclientpanel-640a8",
  storageBucket: "reactclientpanel-640a8.appspot.com",
  messagingSenderId: "844503490079"
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Initialize firebase instance

firebase.initializeApp(firebaseConfig);

//Initialize firestore

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state

const initialState = {};

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
