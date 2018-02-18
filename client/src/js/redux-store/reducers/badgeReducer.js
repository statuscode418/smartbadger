import initialState from '../initialState'
import actionTypes from '../actions/types'

export default function badgeReducer(state = initialState.badge, action) {
  let newState = { ...state }
  switch (action.type) {
    case actionTypes.UPDATE_BADGE:
    return { ...newState, badge: action.badge }
    
    default:
    return state
  }
}