import authActionTypes from "../actions/authActionTypes";
import messageActionTypes from "../actions/messageActionTypes";

function messagesReducer(messages = [], action) {
  switch (action.type) {
    case messageActionTypes.LOAD_MESSAGES:
      return [...action.messages];
    case authActionTypes.LOGOUT:
      return [];
    case messageActionTypes.ADD_MESSAGE:
      return [...messages, { description: action.message, id: Math.random() }];
    case messageActionTypes.DELETE_MESSAGE:
      return messages.filter((message) => message.id !== action.message.id);
    default:
      return messages;
  }
}

export default messagesReducer;
