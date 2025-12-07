import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';

import { theme } from '@theme';

export default function RootLayout() {
  return (
    <>
      <ThemeProvider value={theme.navigation}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </ThemeProvider>
      <StatusBar style="light" />
    </>
  );
}
