importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCNqfN1A3XlKUf4lwlZAzqYK-JnVP7oKPI",
  authDomain: "healthpill-53153.firebaseapp.com",
  projectId: "healthpill-53153",
  storageBucket: "healthpill-53153.appspot.com",
  messagingSenderId: "590917719651",
  appId: "1:590917719651:web:37df51b239cee25ff88a56",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = "알림";
  const notificationOptions = {
    body: payload.data.content,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
