import { Stack } from 'expo-router';
import { theme } from '@theme';

const routerLayout = () => (
  <Stack
    screenOptions={{
      contentStyle: { backgroundColor: theme.colors.background },
      headerTitleStyle: {
        fontFamily: theme.typography.family.semibold,
      },
      headerBackTitleStyle: {
        fontFamily: theme.typography.family.medium,
      },
      headerTintColor: theme.colors.textPrimary,
    }}
  >
    <Stack.Screen name="home" options={{ headerShown: false }} />
    <Stack.Screen
      name="add-bean-recipe"
      options={{
        contentStyle: {
          backgroundColor: theme.colors.background,
        },

        title: 'Add Brew',
        fullScreenGestureEnabled: true,
        headerBackButtonDisplayMode: 'minimal',
        headerBackButtonMenuEnabled: true,
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="settings"
      options={{
        title: 'Settings',
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerTintColor: theme.colors.textPrimary,
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    />
    <Stack.Screen
      name="taste-notes"
      options={{
        title: 'Taste notes',
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerTintColor: theme.colors.textPrimary,
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    />
    <Stack.Screen
      name="sync"
      options={{
        title: 'Sync',
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerTintColor: theme.colors.textPrimary,
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    />
  </Stack>
);

export default routerLayout;
