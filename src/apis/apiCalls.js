import api from "./api";

const user = localStorage.getItem("expense-user");

const token = JSON.parse(user)?.idToken;
console.log('in the api calls token',token);

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
export const getProfile = async () => {
  try {
    const resposne = await api.post(":lookup", {
      idToken: token,
    });
    return resposne.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const verifyEmail = async () => {

  try {
    const resposne = await api.post(":sendOobCode", {
      idToken: token,
      requestType:'VERIFY_EMAIL'
    });
    return resposne.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
