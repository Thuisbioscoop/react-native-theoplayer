import React, { useEffect, useRef } from 'react';
import type { THEOplayerViewProps } from 'react-native-theoplayer';
import * as THEOplayer from 'theoplayer';
import { THEOplayerWebAdapter } from './adapter/THEOplayerWebAdapter';

export function THEOplayerView(props: React.PropsWithChildren<THEOplayerViewProps>) {
  const { config, children } = props;
  const player = useRef<THEOplayer.ChromelessPlayer | null>(null);
  const adapter = useRef<THEOplayerWebAdapter | null>(null);
  const container = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Create player inside container.
    if (container.current) {
      const chromeless = config?.chromeless === true || config?.chromeless === undefined;
      const updatedConfig = { ...config, allowNativeFullscreen: true };
      if (chromeless) {
        player.current = new THEOplayer.ChromelessPlayer(container.current, updatedConfig);
      } else {
        player.current = new THEOplayer.Player(container.current, {
          ...updatedConfig,
          ui: {
            fluid: true,
          },
        } as THEOplayer.PlayerConfiguration);
      }

      // Adapt native player to react-native player.
      adapter.current = new THEOplayerWebAdapter(player.current, config);

      // Expose players for easy access
      // @ts-ignore
      window.player = adapter.current;

      // @ts-ignore
      window.nativePlayer = player;

      // Notify the player is ready
      props.onPlayerReady?.(adapter.current);
    }

    // Clean-up
    return () => {
      // Notify the player will be destroyed.
      const { onPlayerDestroy } = props;
      if (adapter?.current && onPlayerDestroy) {
        onPlayerDestroy(adapter?.current);
      }
      adapter?.current?.destroy();
    };
  }, [container]);

  const chromeless = config?.chromeless === undefined || config?.chromeless === true;
  return (
    <>
      <div
        ref={container}
        style={styles.container}
        className={chromeless ? 'theoplayer-container' : 'theoplayer-container video-js theoplayer-skin'}
      />
      {children}
    </>
  );
}

const styles = {
  // by default stretch the video to cover the container.
  // Override using the 'theoplayer-container' class.
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    maxWidth: '100vw',
    aspectRatio: '16 / 9',
  } as React.CSSProperties,
};
