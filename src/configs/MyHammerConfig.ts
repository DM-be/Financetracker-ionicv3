import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

// create a class that overrides hammer default config

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL } // override default settings
  }
}