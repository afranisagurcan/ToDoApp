import { db } from '../config/firebaseConfig';
import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Google ile giriş yapan kullanıcıyı Firestore'a ekler (eğer kayıtlı değilse).
 */
export const registerUserIfNotExists = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("❌ Kullanıcı oturumu yok.");
    return;
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', user.email)));

  if (userSnapshot.empty) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email?.trim().toLowerCase(),
      name: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });
    console.log('✅ Yeni kullanıcı Firestore\'a eklendi.');
  } else {
    console.log('ℹ️ Kullanıcı zaten kayıtlı.');
  }
};

/**
 * Email adresi ile Firestore'da kullanıcı arar.
 * @param email Aranacak email adresi
 * @returns Kullanıcı bilgisi veya null
 */
export const findUserByEmail = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();

  const q = query(
    collection(db, 'users'),
    where('email', '==', normalizedEmail)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } else {
    return null;
  }
};

/**
 * Arkadaş eklemek için kullanılır.
 * @param friendId Eklenecek arkadaşın UID'si
 * @param friendEmail Arkadaşın email adresi
 * @param friendName Arkadaşın adı
 */
export const addFriendToFirestore = async (
  friendId: string,
  friendEmail: string,
  friendName: string
): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("❌ Kullanıcı oturumu yok.");
      return;
    }

    const userId = user.uid;

    console.log("Arkadaş ekleniyor:", { userId, friendId, friendEmail, friendName });

    const friendRef = doc(collection(db, 'users', userId, 'friends'), friendId);
    await setDoc(friendRef, {
      name: friendName,
      email: friendEmail.trim().toLowerCase(),
      addedAt: new Date(),
    });

    console.log("✅ Arkadaş başarıyla eklendi:", friendEmail);
  } catch (error) {
    console.error("❌ Arkadaş eklerken hata oluştu:", error);
  }
};
