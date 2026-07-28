const credentials = {
  username: "079bct036",
  password: "2022-0453",
};

const setValue = (el, value) => {
  el.value = value;
  // Some captive-portal pages only enable login after these fire.
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
};

const login = async () => {
  const usernameEl =
    document.getElementById("username") ||
    document.querySelector('input[name="username"]');
  const passwordEl =
    document.getElementById("password") ||
    document.querySelector('input[type="password"], input[name="password"]');

  // Fill the visible fields so the user can see what's happening.
  if (usernameEl) setValue(usernameEl, credentials.username);
  if (passwordEl) setValue(passwordEl, credentials.password);

  // The portal's login button is a `javascript:` link, which the page's
  // Content Security Policy blocks when a content script triggers it.
  // Instead, send the login request directly — this is exactly what the
  // Cyberoam/Sophos portal's own script does under the hood.
  const params = new URLSearchParams({
    mode: "191", // 191 = login (194 = logout) on Cyberoam/Sophos portals
    username: credentials.username,
    password: credentials.password,
    a: String(Date.now()), // cache-buster the portal also sends
    producttype: "0",
  });

  try {
    const res = await fetch("/login.xml", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const text = await res.text();
    console.log("Wifi Login: portal response:", text);
    if (/LIVE|logged|success/i.test(text)) {
      console.log("Wifi Login: login successful. Redirecting...");
      window.location.href = "http://pcampus.edu.np/login-successful/";
    }
  } catch (err) {
    console.warn("Wifi Login: direct login request failed:", err);
  }
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
