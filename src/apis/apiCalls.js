import api from "./api";

const user = localStorage.getItem("expense-user");
const token = JSON.parse(user).idToken;
export const updateProfile = async (name, imageUrl) => {
  try {
    const resposne = await api.post(":update", {
      displayName:name,
      photoUrl:imageUrl,
      idToken: token,
      returnSecureToken: true,
    });
    return resposne.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
