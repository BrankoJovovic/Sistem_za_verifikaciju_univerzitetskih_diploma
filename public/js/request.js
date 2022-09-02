verifyRequest();
loadDiplomes();
document.querySelector("#sendRequestButton").addEventListener("click", sendRequest);
document.querySelector("#sendVerifyButton").addEventListener("click", sendVerify);
function sendRequest() {
  let userId = window.localStorage.getItem("id");
  let data = {
    userId: userId,
  };
  fetch("/createDiplomaRequest", {
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
          text: "Vaš zahtjev za kreiranje digitalne diplome je poslat.",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
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

function verifyRequest() {
  let userId = window.localStorage.getItem("id");
  let data = {
    userId: userId,
  };
  fetch("/verifyRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.length > 0) {
        document.querySelector("#sendRequestNotification").style.display = "block";
        document.querySelector("#sendRequestButton").style.display = "none";
      } else {
        document.querySelector("#sendRequestNotification").style.display = "none";
        document.querySelector("#sendRequestButton").style.display = "block";
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

function loadDiplomes() {
  let selectDiplomes = document.querySelector("#selectDiplomes");
  selectDiplomes.innerHTML = "";
  let userId = window.localStorage.getItem("id");
  let data = {
    userId: userId,
  };
  fetch("/retrieveAllDiplomes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      json.forEach(function (diplome) {
        let option = document.createElement("option");
        option.value = diplome.id;
        option.text = diplome.file_name;
        selectDiplomes.appendChild(option);
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    });
}

function sendVerify() {
  let diplome = document.querySelector("#selectDiplomes").value;
  let data = {
    diplome: diplome,
  };
  fetch("/createVerification", {
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
          title: "Obavještenje",
          text: "Poslali ste zahtjev za verifikaciju diplome.",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
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
