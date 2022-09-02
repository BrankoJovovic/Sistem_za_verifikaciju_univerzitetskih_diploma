loadAllRequests();
function loadAllRequests() {
  let list = document.querySelector("#requestBody");
  list.innerHTML = "";
  let userId = window.localStorage.getItem("id");
  let data = {
    userId: userId,
  };
  fetch("/selectVerifiedDiplome", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        console.log(json);
        json.forEach(function (user) {
          list.insertAdjacentHTML(
            "beforeend",
            "  <tr>\n" +
              "<td style='color: var(--ct-menu-item-active)'> <i style='margin-right: 6px' class='fas fa-check-circle'></i> " +
              user.hash +
              "</td>\n" +
              "<td>" +
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

function downloadDiploma(id) {
  let data = {
    id: id,
  };
  fetch("/getDiploma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        let arrNew = new Uint8Array(json.content);
        let blob = new Blob([arrNew], { type: "application/pdf" });
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = json.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
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
