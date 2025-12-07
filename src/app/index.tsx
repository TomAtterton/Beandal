import React, { useEffect, useCallback, useState } from 'react';
import { Redirect } from 'expo-router';
import * as ExpoSplashscreen from 'expo-splash-screen';
import Splashscreen from '@/screens/Splashscreen';
import useHydration from '@/hooks/useHydration';

const AppIndex = () => {
  const hasHydrated = useHydration();
  const [isReady, setIsReady] = useState(false);

  const hideSplash = useCallback(async () => {
    await ExpoSplashscreen.hideAsync();
  }, []);

  useEffect(() => {
    const onSetup = async () => {
      if (hasHydrated) {
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
  }, [hideSplash, hasHydrated]);

  // Show splash screen while hydrating or setting up
  if (!hasHydrated || !isReady) {
    return <Splashscreen disableNavigation />;
  }

  // If user is authenticated and has onboarded, redirect to main tabs
  return <Redirect href={'/home'} />;
};

export default AppIndex;
