// imagePickerUtil.ts
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import i18n from '@i18n';

type PickImageOptions = {
  /** Override default picker options if needed */
  pickerOptions?: ImagePicker.ImagePickerOptions;
  /** Custom permission denied message */
  permissionTitle?: string;
  permissionMessage?: string;
  /** Custom generic error message */
  errorTitle?: string;
  errorMessage?: string;
};

export const pickSingleImageFromLibrary = async (
  options: PickImageOptions = {},
): Promise<ImagePicker.ImagePickerAsset | null> => {
  const {
    pickerOptions,
    permissionTitle = i18n.t('form.imagePickerPermissionTitle'),
    permissionMessage = i18n.t('form.imagePickerPermissionMessage'),
    errorTitle = i18n.t('form.imagePickerErrorTitle'),
    errorMessage = i18n.t('form.imagePickerErrorMessage'),
  } = options;

  try {
    // Request media library permission (robust even though images usually work without)
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    const granted =
      permission.granted ||
      // treat iOS "limited" access as acceptable
      (permission as any)?.accessPrivileges === 'limited';

    if (!granted) {
      Alert.alert(permissionTitle, permissionMessage);
      return null;
    }

    // (Optional) recover pending result on Android if activity was killed
    if (Platform.OS === 'android') {
      const pending = await ImagePicker.getPendingResultAsync();
      if (pending && 'canceled' in pending && !pending.canceled && pending.assets?.length) {
        return pending.assets[0];
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      ...pickerOptions,
    });

    if (result.canceled || !result.assets?.length) {
      return null;
    }

    return result.assets[0];
  } catch (error) {
    console.error('[pickSingleImageFromLibrary]', error);
    Alert.alert(errorTitle, errorMessage);
    return null;
  }
};
