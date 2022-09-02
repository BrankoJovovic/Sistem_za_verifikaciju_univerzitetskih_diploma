let globalStudentId = "0";
document.querySelector("#saveDiplomaButton").addEventListener("click", saveDiploma);
loadAllRequests();
function loadAllRequests() {
  let list = document.querySelector("#requestBody");
  list.innerHTML = "";
  fetch("/selectAllRequests", {
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
              ')" data-bs-toggle="modal" data-bs-target="#standard-modal"><i class="mdi mdi-share-variant me-2 text-muted vertical-middle"></i>Izdavanje diplome</button>\n' +
              '                                      <a class="dropdown-item" href="#"><i class="mdi mdi-delete me-2 text-muted vertical-middle"></i>Odbijanje zahtjeva</a>\n' +
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

function setupStudent(id) {
  globalStudentId = id;
}

function saveDiploma() {
  let myDropzone = Dropzone.forElement("#my-awesome-dropzone");
  let file = null;
  let files = myDropzone.files;
  files.forEach(function (response) {
    file = response;
  });
  let reader = new FileReader();
  let fileByteArray = [];
  reader.readAsArrayBuffer(file);
  reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
      var arrayBuffer = evt.target.result,
        array = new Uint8Array(arrayBuffer);
      for (var i = 0; i < array.length; i++) {
        fileByteArray.push(array[i]);
      }
      let data = {
        id: globalStudentId,
        file: fileByteArray,
        file_name: file.name,
      };
      fetch("/saveStudentDiploma", {
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
  };
}

// downloadPdf();
function downloadPdf() {
  let data = {
    id: 4,
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
        let string = "[" + json + "]";
        let jsonParse = JSON.parse(string);
        var arrNew = new Uint8Array(jsonParse);
        let blob = new Blob([arrNew], { type: "application/pdf" });
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "tst2.pdf";
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
