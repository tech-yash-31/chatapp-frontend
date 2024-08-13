export const setGroups = (groups) => ({
  type: "SET_GROUPS",
  payload: groups,
});

export const joinGroup = (groupName) => ({
  type: "JOIN_GROUP",
  payload: groupName,
});

export const setJoinedGroups = (groups) => ({
  type: "SET_JOINED_GROUPS",
  payload: groups,
});

export const setFilteredGroups = (groups) => ({
  type: "SET_FILTERED_GROUPS",
  payload: groups,
});
