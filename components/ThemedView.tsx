import React from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  darkBackground?: boolean
};

export function ThemedView({ style, lightColor, darkColor, darkBackground, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, darkBackground ? 'darkBackground' : 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
