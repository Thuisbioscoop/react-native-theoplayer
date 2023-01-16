import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { PlayerStyleContext, VideoPlayerStyle } from '../style/VideoPlayerStyle';

export type SlotType = 'top' | 'bottom' | 'center';

interface ControlBarProps {
  style?: StyleProp<ViewStyle>;
  slot?: SlotType;
  left?: ReactNode;
  right?: ReactNode;
}

export const ControlBar = (props: React.PropsWithChildren<ControlBarProps>) => {
  const { style, children } = props;
  return (
    <PlayerStyleContext.Consumer>
      {(styleContext: VideoPlayerStyle) => <View style={[styleContext.controlBar.container, style]}>{children}</View>}
    </PlayerStyleContext.Consumer>
  );
};
