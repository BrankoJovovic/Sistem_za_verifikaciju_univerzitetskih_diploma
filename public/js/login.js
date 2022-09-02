document.querySelector("#loginButton").addEventListener("click", loginMethod);

function loginMethod() {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  if (email.length === 0 || password.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Morate popuniti obavezna polja!",
    });
    return false;
  }
  let data = {
    email: email,
    password: password,
  };
  fetch("/loginMethod", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.length > 0) {
        window.localStorage.setItem("email", json[0].email);
        window.localStorage.setItem("firstName", json[0].firstname);
        window.localStorage.setItem("id", json[0].id);
        if (json[0].role_id === 1) {
          window.open("/home", "_self");
        } else if (json[0].role_id === 2) {
          window.open("/admin", "_self");
        } else {
          window.open("/verifier", "_self");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Nije validan korisnik!",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    });
}
