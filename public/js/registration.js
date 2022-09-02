document.querySelector("#submitRegistration").addEventListener("click", registration);
function registration() {
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let email = document.querySelector("#email").value;
  let jmbg = document.querySelector("#jmbg").value;
  let city = document.querySelector("#city").value;
  let password = document.querySelector("#password").value;
  let role = document.querySelector("#role").value;

  let data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    jmbg: jmbg,
    city: city,
    password: password,
    role: role,
  };
  fetch("/registrationData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        Swal.fire({
          icon: "success",
          title: "Uspjeh",
          text: "Registracija uspješna.",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(location.origin, "_self");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: JSON.stringify(json),
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
