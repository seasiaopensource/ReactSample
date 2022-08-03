import axios from "axios";

//login
const login = async (userData) => {
  console.log(userData, "userData");
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + "login",
    userData
  );
  console.log(response, "response");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
};
export default authService;
