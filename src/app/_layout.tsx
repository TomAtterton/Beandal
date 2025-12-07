import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ThemeProvider } from '@react-navigation/native';

import '@i18n';
import { theme } from '@theme';

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardProvider>
        <ThemeProvider value={theme.navigation}>
          <Slot />
        </ThemeProvider>
        <StatusBar style="light" />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
