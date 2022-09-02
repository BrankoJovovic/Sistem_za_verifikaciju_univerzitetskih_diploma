let globalDiplomaVerifier = "0";
document.querySelector("#saveDiplomaButton").addEventListener("click", sendToBlock);
document.querySelector("#saveHash").addEventListener("click", finalSaveHash);
loadAllRequests();
function loadAllRequests() {
  let list = document.querySelector("#requestBody");
  list.innerHTML = "";
  fetch("/selectAllVerificationRequests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        json.forEach(function (user) {
          list.insertAdjacentHTML(
            "beforeend",
            "  <tr>\n" +
              "                                <td>" +
              user.firstname +
              " " +
              user.lastname +
              "</td>\n" +
              "                                <td>" +
              user.jmbg +
              "</td>\n" +
              "                                <td>" +
              user.city +
              "</td>\n" +
              "                                <td>" +
              user.email +
              "</td>\n" +
              "                                <td>\n" +
              '                                  <div class="btn-group dropdown">\n' +
              "                                    <a\n" +
              '                                      href="javascript: void(0);"\n' +
              '                                      class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-xs"\n' +
              '                                      data-bs-toggle="dropdown"\n' +
              '                                      aria-expanded="false"\n' +
              '                                      ><i class="mdi mdi-dots-horizontal"></i\n' +
              "                                    ></a>\n" +
              '                                    <div class="dropdown-menu dropdown-menu-end">\n' +
              '                                      <button class="dropdown-item" onclick="setupStudent(' +
              user.diploma_id +
              ')"><i class="mdi mdi-cloud-download me-2 text-muted vertical-middle"></i>Pregled diplome</button>\n' +
              '                                      <button class="dropdown-item" onclick="setupClient(' +
              user.id +
              ",'" +
              user.firstname +
              " " +
              user.lastname +
              "','" +
              user.jmbg +
              "','" +
              user.city +
              "'" +
              ')" data-bs-toggle="modal" data-bs-target="#standard-modal" href="#"><i class="fas fa-check-circle me-2 text-muted vertical-middle"></i>Verifikacija zahtjeva</button>\n' +
              "                                    </div>\n" +
              "                                  </div>\n" +
              "                                </td>\n" +
              "                              </tr>"
          );
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Greska!",
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

function setupClient(id, name, jmbg, city) {
  globalDiplomaVerifier = id;
  document.querySelector("#name").value = name;
  document.querySelector("#jmbg").value = jmbg;
  document.querySelector("#city").value = city;
}

function sendToBlock() {
  let name = document.querySelector("#name").value;
  let jmbg = document.querySelector("#jmbg").value;
  let city = document.querySelector("#city").value;
  let data = {
    name: name,
    jmbg: jmbg,
    city: city,
  };
  fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        document.querySelector("#hashButton").click();
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

function finalSaveHash() {
  let hash = document.querySelector("#hashValue").value;
  let data = {
    hash: hash,
    id: globalDiplomaVerifier,
  };
  fetch("/createVerificationHash", {
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
          text: "Uspješno ste izdali digitalnu diplomu.",
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
