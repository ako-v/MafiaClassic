export default function getRoleArray(roles, party) {
  return roles
    ? Object.values(roles).filter(role => role.alignment === party)
    : [];
}
