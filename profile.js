//* In Profile

const deleteBtn = document.querySelector(".deleteBtn");
deleteBtn.addEventListener("click", deleteUser);

function deleteUser() {
  window.location.href = "./index.html";

  window.localStorage.clear();
}

const logoutBtn = document.querySelector(".logoutBtn");
logoutBtn.addEventListener("click", logOut);

function logOut() {
  window.location.href = "./index.html";
}
