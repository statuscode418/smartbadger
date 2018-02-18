/* reducers */
import { combineReducers } from 'redux';
import { formReducer } from 'bloom-forms';
import alertsReducer from './reducers/alertsReducer';
import modalReducer from './reducers/modalReducer';
import presentationReducer from './reducers/presentationReducer';
import badgeReducer from './reducers/badgeReducer';

export default combineReducers({
  alerts: alertsReducer,
  badge: badgeReducer,
  forms: formReducer,
  modal: modalReducer,
  presentation: presentationReducer
});
