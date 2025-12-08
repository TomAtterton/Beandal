import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { BaseButton } from '@/components/buttons/BaseButton';
import { Icon } from '@/components/Icon';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

const normalize = (tag: string) => tag.trim();
const normalizeKey = (tag: string) => normalize(tag).toLowerCase();

type Props = {
  labelTranslation: React.ComponentProps<typeof TranslatedText>['translation'];
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  onRemoveOption?: (tag: string) => void;
  hideLabel?: boolean;
};

export const TagMultiSelect = ({
  labelTranslation,
  options,
  value,
  onChange,
  placeholder,
  onRemoveOption,
  hideLabel = false,
}: Props) => {
  const [input, setInput] = useState('');

  const selectedKeys = useMemo(() => new Set(value.map((tag) => normalizeKey(tag))), [value]);

  const selectable = useMemo(() => {
    const candidateInput = normalize(input);
    const base = options
      .map((opt) => normalize(opt))
      .filter((opt) => opt.length > 0)
      .filter(
        (opt, index, arr) => arr.findIndex((o) => normalizeKey(o) === normalizeKey(opt)) === index,
      );

    if (
      candidateInput.length > 0 &&
      !base.some((opt) => normalizeKey(opt) === normalizeKey(candidateInput))
    ) {
      base.push(candidateInput);
    }

    return base.filter((opt) => !selectedKeys.has(normalizeKey(opt)));
  }, [input, options, selectedKeys]);

  const toggle = (tag: string) => {
    const normalizedTag = normalize(tag);
    if (!normalizedTag) return;
    const exists = value.some((t) => normalizeKey(t) === normalizeKey(normalizedTag));
    const next = exists
      ? value.filter((t) => normalizeKey(t) !== normalizeKey(normalizedTag))
      : [...value, normalizedTag];
    onChange(next);
  };

  const handleRemoveOption = (tag: string) => {
    if (!onRemoveOption) return;
    onRemoveOption(tag);
    if (value.some((t) => normalizeKey(t) === normalizeKey(tag))) {
      onChange(value.filter((t) => normalizeKey(t) !== normalizeKey(tag)));
    }
    if (normalizeKey(input) === normalizeKey(tag)) {
      setInput('');
    }
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    toggle(trimmed);
    setInput('');
  };

  return (
    <View style={styles.container}>
      {!hideLabel ? (
        <TranslatedText translation={labelTranslation} variant="h4" style={styles.label} />
      ) : null}
      {value.length > 0 ? (
        <View style={styles.tags}>
          {value.map((tag) => (
            <BaseButton
              key={tag}
              onPress={() => toggle(tag)}
              style={[styles.tag, styles.selectedTag]}
              accessibilityRole="button"
            >
              <TranslatedText style={[styles.tagLabel, styles.selectedLabel]}>{tag}</TranslatedText>
              <Icon name="close" size={14} color={theme.colors.accentOn} />
            </BaseButton>
          ))}
        </View>
      ) : null}

      {selectable.length > 0 ? (
        <View style={styles.tags}>
          {selectable.map((tag) => (
            <View key={tag} style={styles.optionRow}>
              <BaseButton onPress={() => toggle(tag)} style={styles.tag} accessibilityRole="button">
                <TranslatedText style={styles.tagLabel}>{tag}</TranslatedText>
              </BaseButton>
              {onRemoveOption ? (
                <BaseButton
                  accessibilityLabel={`Remove ${tag}`}
                  onPress={() => handleRemoveOption(tag)}
                  style={styles.removeButton}
                >
                  <Icon name="trash-outline" size={14} color={theme.colors.danger} />
                </BaseButton>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          selectionColor={theme.colors.accent}
          style={styles.input}
          autoCapitalize="none"
        />
        <BaseButton style={styles.addButton} onPress={handleSubmit} accessibilityRole="button">
          <TranslatedText translation="form.addTasteNote" style={styles.addLabel} />
        </BaseButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.metrics.spacing.sm,
  },
  label: {
    marginBottom: theme.metrics.spacing.sm,
    fontStyle: 'italic',
  },
  helper: {
    color: theme.colors.textSecondary,
  },
  selectedRow: {
    gap: theme.metrics.spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.metrics.spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.xs,
  },
  tag: {
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.sm,
    borderRadius: theme.metrics.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.xs,
  },
  selectedTag: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  tagLabel: {
    fontSize: theme.typography.size.sm,
  },
  selectedLabel: {
    color: theme.colors.accentOn,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.md,
    marginTop: theme.metrics.spacing.xs,
  },
  input: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: theme.metrics.radius.md,
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.md,
    lineHeight: theme.typography.lineHeight.md,
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
  removeButton: {
    paddingHorizontal: theme.metrics.spacing.sm,
    paddingVertical: theme.metrics.spacing.xs,
    borderRadius: theme.metrics.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    backgroundColor: theme.colors.surface,
  },
});
