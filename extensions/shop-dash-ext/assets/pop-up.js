// $(".open-modal-button").click(function () {
//   $(".modal-section").toggleClass("open");
// });

const openModalButtons = document.querySelectorAll(".open-modal-button");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalSection = document.querySelector(".modal-section");
    modalSection.classList.toggle("open");
  });
});