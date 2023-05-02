export default function (user, groups, userAdminGroup) {
  return {
    userUuid: user.username,
    userEmail: user.attributes.email,
    userName: user.attributes.name,
    userAdmin: userAdminGroup,
    userGroups: groups,
    isAuthenticated: true,
    isLoaded: true,
    attributes: user.attributes
  };
}
