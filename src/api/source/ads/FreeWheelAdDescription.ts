import type { AdDescription } from "./Ads";

/**
 * The possible ad unit types, represented by a value from the following list:
 * <br/> - `'preroll'`: The linear ad will play before the content started.
 * <br/> - `'midroll'`: The linear ad will play at a time offset during the content.
 * <br/> - `'postroll'`: The linear ad will play after the content ended.
 * <br/> - `'overlay'`: The non-linear ad.
 *
 * @public
 */
export type FreeWheelAdUnitType = 'preroll' | 'midroll' | 'postroll' | 'overlay';

/**
 * Represents a FreeWheel cue.
 *
 * @public
 */
export interface FreeWheelCue {
  /**
   * The ad unit type.
   */
  adUnit: FreeWheelAdUnitType;

  /**
   * Offset after which the ad break will start, in seconds.
   */
  timeOffset: number;
}

/**
 * Describes a FreeWheel ad break request.
 *
 * @remarks
 * <br/> - Available since v2.42.0.
 *
 * @public
 */
export interface FreeWheelAdDescription extends AdDescription {
  /**
   * The integration of this ad break.
   */
  integration: 'freewheel';

  /**
   * The FreeWheel ad server URL.
   */
  adServerUrl: string;

  /**
   * The duration of the asset, in seconds.
   *
   * @remarks
   * <br/> - Optional for live assets.
   */
  assetDuration?: number;

  /**
   * The identifier of the asset.
   *
   * @remarks
   * <br/> - Generated by FreeWheel CMS when an asset is uploaded.
   */
  assetId?: string;

  /**
   * The network identifier which is associated with a FreeWheel customer.
   */
  networkId: number;

  /**
   * The server side configuration profile.
   *
   * @remarks
   * <br/> - Used to indicate desired player capabilities.
   */
  profile: string;

  /**
   * The identifier of the video player's location.
   */
  siteSectionId?: string;

  /**
   * List of cue points.
   *
   * @remarks
   * <br/> - Not available in all FreeWheel modes.
   */
  cuePoints?: FreeWheelCue[];

  /**
   * A record of query string parameters added to the FreeWheel ad break request.
   * Each entry contains the parameter name with associated value.
   */
  customData?: Record<string, string>;
}