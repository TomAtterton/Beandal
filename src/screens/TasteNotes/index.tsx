import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { TranslatedText } from '@/components/TranslatedText';
import { BaseButton } from '@/components/buttons/BaseButton';
import { TasteNoteListItem } from '@/screens/TasteNotes/components/TasteNoteListItem';
import { useAppStore } from '@/store/appStore';
import { theme } from '@theme';

const TasteNotesScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tasteNoteTags = useAppStore((state) => state.tasteNoteTags);
  const addTasteNoteTag = useAppStore((state) => state.addTasteNoteTag);
  const updateTasteNoteTag = useAppStore((state) => state.updateTasteNoteTag);
  const removeTasteNoteTag = useAppStore((state) => state.removeTasteNoteTag);
  const estimatedItemHeight = 68;

  const [input, setInput] = useState('');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const sortedTags = useMemo(
    () => [...tasteNoteTags].sort((a, b) => a.localeCompare(b)),
    [tasteNoteTags],
  );

  const handleAdd = () => {
    const next = input.trim();
    if (!next) return;
    addTasteNoteTag(next);
    setInput('');
  };

  const startEdit = (tag: string) => {
    setEditingTag(tag);
    setEditingValue(tag);
  };

  const saveEdit = () => {
    if (!editingTag) return;
    const next = editingValue.trim();
    if (!next) {
      setEditingTag(null);
      setEditingValue('');
      return;
    }
    updateTasteNoteTag(editingTag, next);
    setEditingTag(null);
    setEditingValue('');
  };

  const confirmDelete = (tag: string) => {
    Alert.alert(t('settings.deleteTasteNoteTitle'), t('settings.deleteTasteNoteMessage', { tag }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('settings.deleteTasteNote'),
        style: 'destructive',
        onPress: () => removeTasteNoteTag(tag),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TranslatedText translation="settings.tasteNotesSubtitle" style={styles.subtitle} />

        <View style={styles.addRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleAdd}
            placeholder={t('settings.addTasteNotePlaceholder')}
            placeholderTextColor={theme.colors.textMuted}
            selectionColor={theme.colors.accent}
            style={styles.input}
            autoCapitalize="none"
            returnKeyType="done"
            blurOnSubmit={false}
          />
          <BaseButton style={styles.addButton} onPress={handleAdd} accessibilityRole="button">
            <TranslatedText translation="settings.addTasteNote" style={styles.addLabel} />
          </BaseButton>
        </View>

        <FlashList
          data={sortedTags}
          renderItem={({ item: tag }) => (
            <TasteNoteListItem
              tag={tag}
              isEditing={editingTag === tag}
              editingValue={editingValue}
              onChangeValue={setEditingValue}
              onStartEdit={() => startEdit(tag)}
              onSaveEdit={saveEdit}
              onDelete={() => confirmDelete(tag)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: theme.metrics.spacing.sm }} />}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: theme.metrics.spacing.xl * 2 + insets.bottom },
          ]}
          overrideItemLayout={(layout) => {
            (layout as { size?: number }).size = estimatedItemHeight;
          }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
          contentInsetAdjustmentBehavior="automatic"
        />
      </View>
    </SafeAreaView>
  );
};

export default TasteNotesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.metrics.spacing.xl,
    paddingVertical: theme.metrics.spacing.lg,
    gap: theme.metrics.spacing.md,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.md,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.metrics.radius.md,
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.md,
  },
  addButton: {
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.sm,
    borderRadius: theme.metrics.radius.md,
    backgroundColor: theme.colors.accent,
  },
  addLabel: {
    color: theme.colors.accentOn,
    fontSize: theme.typography.size.sm,
  },
  list: {
    marginTop: theme.metrics.spacing.md,
    paddingBottom: theme.metrics.spacing.xl,
  },
});
