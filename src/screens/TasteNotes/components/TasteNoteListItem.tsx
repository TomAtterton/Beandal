import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { TranslatedText } from '@/components/TranslatedText';
import { BaseButton } from '@/components/buttons/BaseButton';
import { theme } from '@theme';

type Props = {
  tag: string;
  isEditing: boolean;
  editingValue: string;
  onChangeValue: (value: string) => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onDelete: () => void;
};

export const TasteNoteListItem = ({
  tag,
  isEditing,
  editingValue,
  onChangeValue,
  onStartEdit,
  onSaveEdit,
  onDelete,
}: Props) => {
  return (
    <View style={styles.item}>
      {isEditing ? (
        <TextInput
          value={editingValue}
          onChangeText={onChangeValue}
          onSubmitEditing={onSaveEdit}
          autoFocus
          style={styles.editInput}
          selectionColor={theme.colors.accent}
        />
      ) : (
        <TranslatedText style={styles.tagLabel}>{tag}</TranslatedText>
      )}
      <View style={styles.itemActions}>
        {isEditing ? (
          <BaseButton onPress={onSaveEdit} style={styles.iconButton}>
            <Icon name="checkmark" size={18} color={theme.colors.accentOn} />
          </BaseButton>
        ) : (
          <BaseButton onPress={onStartEdit} style={styles.iconButton}>
            <Icon name="pencil" size={18} color={theme.colors.accentOn} />
          </BaseButton>
        )}
        <BaseButton onPress={onDelete} style={styles.deleteButton}>
          <Icon name="trash-outline" size={18} color={theme.colors.danger} />
        </BaseButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.metrics.spacing.md,
    borderRadius: theme.metrics.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    backgroundColor: theme.colors.surface,
    gap: theme.metrics.spacing.sm,
  },
  tagLabel: {
    ...theme.typography.variants.bodyStrong,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.xs,
  },
  iconButton: {
    padding: theme.metrics.spacing.xs,
    borderRadius: theme.metrics.radius.sm,
    backgroundColor: theme.colors.accent,
  },
  deleteButton: {
    padding: theme.metrics.spacing.xs,
    borderRadius: theme.metrics.radius.sm,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
  },
  editInput: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: theme.metrics.radius.md,
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.xs,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.md,
  },
});
