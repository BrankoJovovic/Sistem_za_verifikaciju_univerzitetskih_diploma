document.querySelector("#btnInsert").addEventListener("click", checkInsert);
function checkInsert() {
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let street = document.querySelector("#street").value;
  let city = document.querySelector("#city").value;
  if (firstName.length > 0 && lastName.length > 0 && street.length > 0 && city.length > 0) {
    let url = "http://localhost:3000/writeFile?firstName=" + firstName + "&lastName=" + lastName + "&street=" + street + "&city=" + city;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          location.reload();
        }
      });
  } else {
    alert("Fill all data");
  }
}

readTextFile("http://localhost:3000/readFile", function (text) {
  let stateElements = document.querySelector("#stateElements");
  stateElements.innerHTML = "";
  let data = JSON.parse(text);
  if (data.length > 0) {
    data.forEach((element) => {
      stateElements.insertAdjacentHTML(
        "beforeend",
        ' <div class="row bg-white"><div class="col"> ' +
          '<p class="form-control border-none">' +
          element.firstName +
          "</p>  </div>" +
          '<div class="col">  <p class="form-control border-none">' +
          element.lastName +
          "</p></div>" +
          '<div class="col">  <p class="form-control extraWidth border-none">' +
          element.street +
          "</p></div>" +
          '<div class="col"> <p class="form-control extraWidth border-none">' +
          element.city +
          "</p></div>" +
          '<div class="col"> <button type="button" onclick="deleteRecord(' +
          element.id +
          ')" class="btn btn-primary pr">Remove</button></div> </div>'
      );
    });
  }
});

function readTextFile(path, callback) {
  let params = new FormData();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.send(params);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonResponse = xhr.responseText;
      callback(jsonResponse);
    }
  };
}

function deleteRecord(id) {
  let path = "http://localhost:3000/deleteRecord?id=" + id;
  let params = new FormData();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.send(params);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonResponse = xhr.responseText;
      if (jsonResponse) {
        location.reload();
      }
    }
  };
}