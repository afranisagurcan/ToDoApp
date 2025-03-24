export type RootTabParamList = {
    Home: undefined;
    Calendar: undefined;
    Add: undefined;
    ContactsScreen: { currentUserId: string };
    Profile: {
      user: {
        displayName?: string;
        email?: string;
        photoURL?: string;
      };
    };
  };
  
  export type RootStackParamList = {
    GoogleSignInScreen: undefined;
    BottomTabNavigator: undefined;
    AddTodo: undefined;
    AddEvent: undefined;
  };
  

export type NavigateTarget<K extends keyof RootTabParamList = keyof RootTabParamList> = {
    screen: K;
    params: RootTabParamList[K];
};
  