import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const getGoogleContacts = async (): Promise<any[]> => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();

    if (!currentUser) {
      console.log("Giriş yapılmamış");
      return [];
    }

    const tokens = await GoogleSignin.getTokens();

    const response = await fetch(
      'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data.connections || [];
  } catch (error) {
    console.error('Google People API Error:', error);
    return [];
  }
};
