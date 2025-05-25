const signos = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
const intentos = [];
console.log(intentos)
function jugar() {
  const numeroInput = document.getElementById("numeroInput");
  const signoInput = document.getElementById("signoInput");
  let numero = parseInt(numeroInput.value);
  const signoJugador = signoInput.value;

  if (isNaN(numero) || numero < 0 || numero > 9999) {
    document.getElementById("resultado").innerHTML = "⚠️ Ingresa un número válido entre 0000 y 9999.";
    return;
  }

  const tuNumero = numero.toString().padStart(4, '0');
  const numeroGanador = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const signoGanador = signos[Math.floor(Math.random() * signos.length)];

  const aciertoNumero = tuNumero === numeroGanador;
  const aciertoSigno = signoJugador === signoGanador;

  const mensaje = `
    Tu número: <strong>${tuNumero}</strong><br>
    Tu signo: <strong>${signoJugador}</strong><br>
    Número ganador: <strong>${numeroGanador}</strong><br>
    Signo ganador: <strong>${signoGanador}</strong><br>
    ${aciertoNumero && aciertoSigno
      ? "🎉 <b>¡Acierto total!</b>"
      : aciertoNumero
      ? "✅ Acierto de número"
      : aciertoSigno
      ? "♈ Acierto de signo"
      : "❌ No acertaste"}
  `;

  intentos.push({
    jugador: tuNumero,
    signoJugador,
    ganador: numeroGanador,
    signoGanador,
    aciertoNumero,
    aciertoSigno,
  });

  document.getElementById("resultado").innerHTML = mensaje;
  document.getElementById("historial").innerHTML = "";
}

function mostrarHistorial() {
  const historial = document.getElementById("historial");
  historial.innerHTML = "";

  if (intentos.length === 0) {
    historial.innerHTML = "<li>No hay intentos aún.</li>";
    return;
  }

  intentos.forEach((intento, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      #${index + 1} — 
      Jugaste: <strong>${intento.jugador}</strong> (${intento.signoJugador}), 
      Ganador: <strong>${intento.ganador}</strong> (${intento.signoGanador}) — 
      ${
        intento.aciertoNumero && intento.aciertoSigno
          ? "🎯 Acierto total"
          : intento.aciertoNumero
          ? "✅ Acierto de número"
          : intento.aciertoSigno
          ? "♈ Acierto de signo"
          : "❌ Fallaste"
      }
    `;
    historial.appendChild(li);
  });
}

function exportarExcel() {
    const datosParaExcel = intentos.map((intento, index) => ({
      Nro: index + 1,
      Jugador: intento.jugador,
      Signo_Jugador: intento.signoJugador,
      Ganador: intento.ganador,
      Signo: intento.signoGanador,
      Resultado: intento.acierto ? "Acertaste" : "Fallaste",
    }));
  
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosParaExcel);
  
    XLSX.utils.book_append_sheet(wb, ws, "Historial");
  
    XLSX.writeFile(wb, "historial_astro.xlsx");
  }
  