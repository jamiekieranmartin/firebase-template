import * as functions from "firebase-functions";

exports.onUserCreated = functions.firestore
  .document("users/{userId}")
  .onCreate((user, context) => {
    const data = user.data();
    console.log(`User created: ${data.email}`);
  });
