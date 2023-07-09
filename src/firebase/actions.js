import { authentication } from '.';
import { db } from ".";
import { getAuth } from 'firebase/auth';


export async function addComment(movieId, comment) {
  await db.collection(`comments_${movieId}`).add(comment);
}
export async function addCommentToUser(user, comment) {
  await db.collection(`${user.uid}_comments`).add(comment);
}
export async function addRatingToUser(user, rating) {
  await db.collection(`${user.uid}_ratings`).add(rating);
}
export async function firebaseLogin() {
  const provider = new authentication.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const data = await authentication.auth().signInWithPopup(provider);
  return data?.additionalUserInfo?.profile.email;
  
}

export function firebaseLogout() {
  authentication.auth().signOut();
}