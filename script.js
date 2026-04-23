document.addEventListener("DOMContentLoaded", () => {
  let cantidadProyectos = 120;

  setInterval(() => {
    const contadorProyectos = document.getElementById("proyectos");
    cantidadProyectos++;
    contadorProyectos.textContent = "+" + cantidadProyectos;
  }, 4000);
});
