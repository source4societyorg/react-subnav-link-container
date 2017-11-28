import {
  TOGGLE_SUBNAV,
  CLOSE_SUBNAV,
} from './constants'

export function closeSubnav(event, subnavKey) {
  return {
    type: CLOSE_SUBNAV,
    event,
    subnavKey,
  }
}

export function toggleSubnav(visible, subnavKey) {
  return {
    type: TOGGLE_SUBNAV,
    visible,   
    subnavKey,
  } 
}
