import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
  faCat, faCoffee,
  faFutbol, faHistory, faMusic, faSearch, faTimes, faExpand, faCompress, faVolumeUp,
  faCircleChevronLeft, faTrophy,
  faVolumeLow, faVolumeXmark, faArrowRightLong, faArrowLeftLong, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBuilding, faFlag, faFrown, faLightbulb, faSmile,
} from '@fortawesome/free-regular-svg-icons';
// <i class="fas fa-volume-up"></i>

library.add(
  faVolumeUp,
  faBuilding,
  faCompress,
  faExpand,
  faCat,
  faCoffee,
  faFlag,
  faFrown,
  faFutbol,
  faHistory,
  faLightbulb,
  faMusic,
  faSearch,
  faSmile,
  faTimes,
  faCircleChevronLeft,
  faTrophy,
  faVolumeLow,
  faVolumeXmark,
  faArrowRightLong,
  faArrowLeftLong,
  faCheck,
);

export const volume = icon({ prefix: 'fas', iconName: 'volume-up' }).html;
export const compress = icon({ prefix: 'fas', iconName: 'compress' }).html;
export const expand = icon({ prefix: 'fas', iconName: 'expand' }).html;
export const building = icon({ prefix: 'far', iconName: 'building' }).html;
export const cat = icon({ prefix: 'fas', iconName: 'cat' }).html;
export const coffee = icon({ prefix: 'fas', iconName: 'coffee' }).html;
export const flag = icon({ prefix: 'far', iconName: 'flag' }).html;
export const futbol = icon({ prefix: 'fas', iconName: 'futbol' }).html;
export const frown = icon({ prefix: 'far', iconName: 'frown' }).html;
export const history = icon({ prefix: 'fas', iconName: 'history' }).html;
export const lightbulb = icon({ prefix: 'far', iconName: 'lightbulb' }).html;
export const music = icon({ prefix: 'fas', iconName: 'music' }).html;
export const search = icon({ prefix: 'fas', iconName: 'search' }).html;
export const smile = icon({ prefix: 'far', iconName: 'smile' }).html;
export const times = icon({ prefix: 'fas', iconName: 'times' }).html;
export const circleLeft = icon({ prefix: 'fas', iconName: 'circle-chevron-left' }).html;
export const trophy = icon({ prefix: 'fas', iconName: 'trophy' }).html;
export const volumeOn = icon({ prefix: 'fas', iconName: 'volume-low' }).html;
export const volumeOff = icon({ prefix: 'fas', iconName: 'volume-xmark' }).html;
export const arrowLeft = icon({ prefix: 'fas', iconName: 'arrow-left-long' }).html;
export const arrowRight = icon({ prefix: 'fas', iconName: 'arrow-right-long' }).html;
export const check = icon({ prefix: 'fas', iconName: 'check' }).html;
