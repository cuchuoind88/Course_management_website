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
        auth: {
          username: "",
          userId: "",
          userRole: "",
        },
        currentCourse: {},
        userDetails: {},
      };
    case "POPULATE_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
}
export default LXCReducer;
