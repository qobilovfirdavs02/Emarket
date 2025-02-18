export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user)); // Userni saqlash
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null; // Agar user bo'lsa, JSON holatiga qaytaramiz
};

export const removeUser = () => {
  localStorage.removeItem("user"); // Userni tizimdan chiqish paytida o‘chirish
};
