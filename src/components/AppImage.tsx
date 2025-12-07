import React from 'react';
import { Image, ImageProps } from 'expo-image';

type Props = ImageProps;

export const AppImage = (props: Props) => {
  return <Image contentFit="contain" transition={150} {...props} />;
};
