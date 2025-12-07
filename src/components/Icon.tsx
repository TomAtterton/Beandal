import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '@theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type IconProps = {
  name: IoniconName;
  size?: number;
  color?: string;
};

export const Icon = ({
  name,
  size = theme.metrics.iconSize.md,
  color = theme.colors.textPrimary,
}: IconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};
