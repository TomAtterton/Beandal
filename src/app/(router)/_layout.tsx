import { Stack } from 'expo-router';
import { theme } from '@theme';

const routerLayout = () => (
  <Stack
    screenOptions={{
      contentStyle: { backgroundColor: theme.colors.background },
    }}
  >
    <Stack.Screen name="home" options={{ headerShown: false }} />
    <Stack.Screen
      name="add-bean-recipe"
      options={{
        contentStyle: {
          backgroundColor: theme.colors.background,
        },

        title: 'Add Bean',
        fullScreenGestureEnabled: true,
        headerBackButtonDisplayMode: 'minimal',
        headerBackButtonMenuEnabled: true,
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    />
  </Stack>
);

export default routerLayout;
