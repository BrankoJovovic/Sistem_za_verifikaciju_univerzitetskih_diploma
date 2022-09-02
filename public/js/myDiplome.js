loadAllRequests();
function loadAllRequests() {
  let list = document.querySelector("#requestBody");
  list.innerHTML = "";
  let userId = window.localStorage.getItem("id");
  let data = {
    userId: userId,
  };
  fetch("/selectUserRequest", {
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
              "<td> " +
              user.diploma_id +
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
              '                                      <button class="dropdown-item" onclick="downloadDiploma(' +
              user.diploma_id +
              ')"><i class="mdi mdi-cloud-download me-2 text-muted vertical-middle"></i>Preuzmi diplomu</button>\n' +
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
