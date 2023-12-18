const credentials = {
  username: "<<---YOUR USERNAME GOES HERE---->>",
  password: "<<---YOUR PASSWORD GOES HERE---->>",
};
const login = () => {
  username.value = credentials.username;
  password.value = credentials.password;
  loginbutton.click();
};
login();
