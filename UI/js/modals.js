const modalPanel = document.querySelector(".modal-panel");
const cart = document.querySelector(".cart");
const trigger = document.querySelector(".trigger");
const close = document.querySelector(".close");
const modalPanelEdit = document.querySelector(".modal-panel-edit");
const triggerEdit = document.querySelector(".trigger-edit");


const toggleModal = () => {
    modalPanel.classList.toggle("show-modal-panel");
}
const addToCart= () => {
    cart.classList.toggle("show-modal-panel");
}
 
const toggleModalEdit = () => {
    modalPanelEdit.classList.toggle("show-modal-panel");
}

const windowOnClick = event => {
    if (event.target === modalPanel) {
        toggleModal();
    }
    if (event.target === modalPanelEdit) {
        toggleModalEdit();
    }
}

window.addEventListener("click", windowOnClick);
