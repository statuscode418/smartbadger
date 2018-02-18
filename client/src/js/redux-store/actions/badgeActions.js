import actionTypes from './types'

export function updateBadge(badge) {
  return {
    type: actionTypes.UPDATE_BADGE,
    badge
  }
}