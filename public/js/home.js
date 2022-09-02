$(document).ready(function () {
  $.noConflict(true);
  autoLoad();
});
document.querySelector("#logout").addEventListener("click", logoutMethod);
function autoLoad() {
  let profileSpan = document.querySelector("#profileSpan");
  profileSpan.innerHTML = "";
  let email = window.localStorage.getItem("email");
  let firstName = window.localStorage.getItem("firstName");

  profileSpan.insertAdjacentHTML("beforebegin", firstName + ' <i class="mdi mdi-chevron-down"></i>');
}

function logoutMethod() {
  window.open(location.origin, "_self");
}
