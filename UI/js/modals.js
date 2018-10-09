const modalPanel = document.querySelector(".modal-panel");
const trigger = document.querySelector(".trigger");
const close = document.querySelector(".close");

const toggleModal = () => {
    modalPanel.classList.toggle("show-modal-panel");
}

const windowOnClick = event => {
    if (event.target === modalPanel) {
        toggleModal();
    }
}

window.addEventListener("click", windowOnClick);
