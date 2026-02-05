function userEntity(item) {
  return {
    id: String(item._id),
    name: item.name,
    email: item.email,
    password: item.password,
  };
}

function usersEntity(items) {
  return items.map(userEntity);
}

module.exports = { userEntity, usersEntity };
