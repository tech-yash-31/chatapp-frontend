const initialState = {
  groups: [],
  joinedGroups: [],
  filteredGroups: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GROUPS":
      return {
        ...state,
        groups: action.payload,
      };
    case "JOIN_GROUP":
      return {
        ...state,
        joinedGroups: [...state.joinedGroups, action.payload],
      };
    case "SET_JOINED_GROUPS":
      return {
        ...state,
        joinedGroups: action.payload,
      };
    case "SET_FILTERED_GROUPS":
      return {
        ...state,
        filteredGroups: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
