const credentials = {
  username: "<<---YOUR USERNAME GOES HERE---->>",
  password: "<<---YOUR PASSWORD GOES HERE---->>",
};

const login = () => {
  username.value = credentials.username;
  password.value = credentials.password;

  loginbutton.click();
};

function saveAndRet(my_credentials) {
  chrome.storage.sync.set(my_credentials, function () {
    console.log("Data saved in content.js:", my_credentials);
  });

  chrome.storage.sync.get(["my_username", "my_password"], function (result) {
    console.log("Data retrieved in content.js:", result);
  });
}
login();
