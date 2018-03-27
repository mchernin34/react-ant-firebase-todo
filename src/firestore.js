import firebase from '@firebase/app'
import '@firebase/firestore'

const config = {
  apiKey: 'AIzaSyDWP7jI5wX3dZGfDxjTKr_U0LD8J601lqQ',
  authDomain: 'react-ant-firebase-todo.firebaseapp.com',
  databaseURL: 'https://react-ant-firebase-todo.firebaseio.com',
  projectId: 'react-ant-firebase-todo',
  storageBucket: '',
  messagingSenderId: '634843800222'
}

const app = firebase.initializeApp(config)
const firestore = firebase.firestore(app)

export default firestore
