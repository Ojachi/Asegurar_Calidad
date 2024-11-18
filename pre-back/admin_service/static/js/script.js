function showModal(message) {
  const modal = document.getElementById("responseModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "block";
}

// Cerrar el modal al hacer clic en la "X"
document.querySelector(".close").onclick = function() {
  document.getElementById("responseModal").style.display = "none";
};

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById("responseModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

