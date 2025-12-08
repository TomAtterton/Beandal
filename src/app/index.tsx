import React, { useEffect, useCallback, useState } from 'react';
import { Redirect } from 'expo-router';
import * as ExpoSplashscreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import Splashscreen from '@/screens/Splashscreen';
import useHydration from '@/hooks/useHydration';

void ExpoSplashscreen.preventAutoHideAsync();

const AppIndex = () => {
  const hasHydrated = useHydration();
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const hideSplash = useCallback(async () => {
    await ExpoSplashscreen.hideAsync();
  }, []);

  useEffect(() => {
    const onSetup = async () => {
      if (hasHydrated && (fontsLoaded || fontError)) {
        try {
          await hideSplash();
        } finally {
          setTimeout(() => {
            setIsReady(true);
          }, 500);
        }
      }
    };
    onSetup();
  }, [fontError, fontsLoaded, hasHydrated, hideSplash]);

  // Show splash screen while hydrating or setting up
  const fontsReady = fontsLoaded || fontError;

  if (!hasHydrated || !fontsReady || !isReady) {
    return <Splashscreen disableNavigation />;
  }

  // If user is authenticated and has onboarded, redirect to main tabs
  return <Redirect href={'/home'} />;
};

export default AppIndex;
