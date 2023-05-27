import initialState from "./initialState";
function LXCReducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        auth: {
          username: action.payload.userName,
          userId: action.payload.userID,
          userRole: action.payload.userRole,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        auth: {
          username: "",
          userId: "",
          userRole: "",
        },
        currentLesson: {},
        userDetails: {},
      };
    case "POPULATE_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    case "SAVE_LESSON":
      return {
        ...state,
        currentLesson: action.payload,
      };
    case "SAVE_NEXT_LESSON":
      return {
        ...state,
        nextLesson: action.payload,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}
export default LXCReducer;
