import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'expo-router';

import { TranslatedText } from '@/components/TranslatedText';
import { MenuItem } from '@/components/MenuItem';
import { theme } from '@theme';

const SettingsScreen = () => {
  const appVersion = useMemo(
    () => Constants.nativeAppVersion ?? Constants.expoConfig?.version ?? 'dev',
    [],
  );

  const buildNumber = useMemo(
    () =>
      Constants.nativeBuildVersion ??
      Constants.expoConfig?.ios?.buildNumber ??
      (Constants.expoConfig?.android?.versionCode
        ? String(Constants.expoConfig?.android?.versionCode)
        : undefined) ??
      appVersion,
    [appVersion],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.menuList}>
          <Link href="/sync" asChild>
            <MenuItem translation="settings.sync" />
          </Link>
        </View>

        <View style={styles.footer}>
          <TranslatedText
            translation={{
              key: 'settings.versionBuild',
              values: { version: appVersion, build: buildNumber },
            }}
            style={styles.value}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.metrics.spacing.xl,
    paddingBottom: theme.metrics.spacing.lg,
    gap: theme.metrics.spacing.lg,
  },
  menuList: {
    gap: theme.metrics.spacing.sm,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: theme.metrics.spacing.lg,
  },
  value: {
    color: theme.colors.accent,
    ...theme.typography.variants.bodyStrong,
  },
});
