import messageActionTypes from "./messageActionTypes";

export function addMessage(message) {
  return {
    type: messageActionTypes.ADD_MESSAGE,
    message,
  };
}

export function deleteMessage(message) {
  return {
    type: messageActionTypes.DELETE_MESSAGE,
    message,
  };
}
