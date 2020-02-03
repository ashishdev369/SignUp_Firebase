import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAZ-qsxf6mUDz0Yv3oPaNRMIayMlLzPXqQ",
    authDomain: "fir-demo-a09ed.firebaseapp.com",
    databaseURL: "https://fir-demo-a09ed.firebaseio.com",
    projectId: "fir-demo-a09ed",
    storageBucket: "fir-demo-a09ed.appspot.com",
    messagingSenderId: "1040337539910",
    appId: "1:1040337539910:web:6906732ab564f969810b47",
    measurementId: "G-9FTCNRB7QV"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire