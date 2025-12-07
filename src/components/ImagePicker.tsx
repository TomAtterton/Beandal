import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/AppImage';
import { TranslatedText } from '@/components/TranslatedText';
import { LabelButton } from '@/components/buttons';
import { pickSingleImageFromLibrary } from '@/utils/imagePickerUtils';
import { theme } from '@theme';

type Props = {
  imageUri?: string;
  onChange: (uri?: string) => void;
  disabled?: boolean;
  placeholderTranslation?: React.ComponentProps<typeof TranslatedText>['translation'];
};

export const ImagePicker = ({
  imageUri,
  onChange,
  disabled = false,
  placeholderTranslation = 'form.beanImagePlaceholder',
}: Props) => {
  const handlePickImage = useCallback(async () => {
    const asset = await pickSingleImageFromLibrary();

    if (asset?.uri) {
      onChange(asset.uri);
    }
  }, [onChange]);

  const handleRemoveImage = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <View style={styles.container}>
      <View style={[styles.preview, !imageUri && styles.previewEmpty]}>
        {imageUri ? (
          <AppImage source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderContent}>
            <AppImage source={theme.images.emptyState} style={styles.placeholderImage} />
            <TranslatedText translation={placeholderTranslation} style={styles.placeholder} />
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <LabelButton
          translation={imageUri ? 'form.replaceImage' : 'form.addImage'}
          variant="secondary"
          onPress={handlePickImage}
          style={styles.actionButton}
          disabled={disabled}
        />

        {imageUri ? (
          <LabelButton
            translation="form.removeImage"
            variant="secondary"
            onPress={handleRemoveImage}
            style={styles.actionButton}
            disabled={disabled}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.metrics.spacing.lg,
  },
  preview: {
    height: 180,
    borderRadius: theme.metrics.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    backgroundColor: theme.colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewEmpty: {
    borderStyle: 'dashed',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContent: {
    alignItems: 'center',
    gap: theme.metrics.spacing.xs,
  },
  placeholderImage: {
    width: 96,
    height: 96,
    opacity: 0.5,
  },
  placeholder: {
    color: theme.colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.metrics.spacing.sm,
    marginTop: theme.metrics.spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: theme.metrics.spacing.sm,
  },
});
