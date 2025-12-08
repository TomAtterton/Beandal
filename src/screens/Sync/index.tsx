import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { MenuItem } from '@/components/MenuItem';
import { ToggleItem } from '@/components/ToggleItem';
import { theme } from '@theme';

const SyncScreen = () => {
  const [isIcloudEnabled, setIsIcloudEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ToggleItem
          translation="settings.icloudSync"
          descriptionTranslation="settings.icloudDescription"
          value={isIcloudEnabled}
          onValueChange={setIsIcloudEnabled}
        />

        <MenuItem
          translation="settings.manageConnections"
          descriptionTranslation="settings.manageConnectionsDescription"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SyncScreen;

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
});
