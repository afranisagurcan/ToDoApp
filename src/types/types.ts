export type RootTabParamList = {
    Home: undefined;
    Calendar: undefined;
    Add: undefined;
    ContactsScreen: { currentUserId: string };
    Profile: { user: { displayName?: string; email?: string; photoURL?: string } };
  };
  