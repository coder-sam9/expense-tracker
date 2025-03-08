import api from "./api";

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("expense-user"));
  return userInfo?.idToken ? userInfo.idToken : null;
};

export const updateProfile = async (name, imageUrl) => {
  try {
    const token = getToken(); // Fetch latest token dynamically
    const response = await api.post(":update", {
      displayName: name,
      photoUrl: imageUrl,
      idToken: token,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    console.log("In getProfile");
    
    const token = getToken(); // Fetch latest token dynamically
    const response = await api.post(":lookup", {
      idToken: token,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyEmail = async () => {
  try {
    const token = getToken(); // Fetch latest token dynamically
    const response = await api.post(":sendOobCode", {
      idToken: token,
      requestType: "VERIFY_EMAIL",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
