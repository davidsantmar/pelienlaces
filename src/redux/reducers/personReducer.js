import personActionTypes from "../actions/personActionTypes";

function personReducer(person = {}, action) {
  switch (action.type) {
    case personActionTypes.LOAD_PERSON:
      return action.person;
    default:
      return person;
  }
}

export default personReducer;
