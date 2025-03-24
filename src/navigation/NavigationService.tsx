import { createNavigationContainerRef } from '@react-navigation/native';
import { RootTabParamList, RootStackParamList } from '../types/navigation'

export const stackNavigationRef = createNavigationContainerRef<RootStackParamList>();
export const tabNavigationRef = createNavigationContainerRef<RootTabParamList>();

export function navigateStack<RouteName extends keyof RootStackParamList>(
  screen: RouteName,
  params: RootStackParamList[RouteName]
) {
  if (!stackNavigationRef.isReady()) return;

  stackNavigationRef.navigate({
    name: screen,
    params,
  });
}

export function navigateTab<RouteName extends keyof RootTabParamList>(
  ...args: undefined extends RootTabParamList[RouteName]
    ? [RouteName] | [RouteName, RootTabParamList[RouteName]]
    : [RouteName, RootTabParamList[RouteName]]
) {
  if (!tabNavigationRef.isReady()) return;
  // @ts-expect-error: overload problemi
  tabNavigationRef.navigate(...args);
}
