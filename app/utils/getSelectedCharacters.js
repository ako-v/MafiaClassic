function getSelectedCharacters(roles) {
  const rolesArray = Object.values(roles);
  return rolesArray
    .filter(role => role.selected || role.quantity > 0)
    .map(role => {
      if (role.selected) return role;
      if (role.quantity > 0) return new Array(role.quantity).fill(role);
    })
    .flat();
}

export default getSelectedCharacters;
