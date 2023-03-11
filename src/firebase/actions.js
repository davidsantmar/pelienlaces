import { authentication } from '.';


export async function firebaseLogin() {
  const provider = new authentication.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const data = await authentication.auth().signInWithPopup(provider);
  return data?.additionalUserInfo?.profile.email;
  
}

export function firebaseLogout() {
  authentication.auth().signOut();
}