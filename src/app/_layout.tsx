import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';

import '@i18n';
import { theme } from '@theme';

export default function RootLayout() {
  return (
    <>
      <ThemeProvider value={theme.navigation}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
      <StatusBar style="light" />
    </>
  );
}
