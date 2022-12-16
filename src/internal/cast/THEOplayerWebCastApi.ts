import type { Airplay, CastAPI, Chromecast } from 'react-native-theoplayer';
import type * as THEOplayer from 'theoplayer';

export class THEOplayerWebCastAPI implements CastAPI {
  // @ts-ignore
  private readonly _player: THEOplayer.ChromelessPlayer;

  constructor(player: THEOplayer.ChromelessPlayer) {
    this._player = player;
  }

  casting(): Promise<boolean> {
    return Promise.resolve(false);
  }

  get chromecast(): Chromecast | undefined {
    // TODO
    return undefined;
  }

  get airplay(): Airplay | undefined {
    // TODO
    return undefined;
  }
}
