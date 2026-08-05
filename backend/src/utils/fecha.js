export const calcularFechaHoraFin = (fecha, hora, horas) => {

  const fechaHora = new Date(`${fecha}T${hora}:00`);

  fechaHora.setHours(
    fechaHora.getHours() + Number(horas)
  );

  const año = fechaHora.getFullYear();
  const mes = String(fechaHora.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaHora.getDate()).padStart(2, "0");

  const horasFin = String(fechaHora.getHours()).padStart(2, "0");
  const minutosFin = String(fechaHora.getMinutes()).padStart(2, "0");
  const segundosFin = String(fechaHora.getSeconds()).padStart(2, "0");

  return `${año}-${mes}-${dia} ${horasFin}:${minutosFin}:${segundosFin}`;

};