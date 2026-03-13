/**
 * calculadora.js
 * Lógica de la calculadora de velocidad: v = v₀ + g·t
 */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnCalcular').addEventListener('click', calcular);
});

function calcular() {
  const errorDiv = document.getElementById('error');
  const resultadosSection = document.getElementById('resultados');
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
  resultadosSection.classList.add('hidden');

  const v0 = parseFloat(document.getElementById('v0').value);
  const g = parseFloat(document.getElementById('g').value);
  const t0 = parseFloat(document.getElementById('t0').value);
  const tf = parseFloat(document.getElementById('tf').value);
  const dt = parseFloat(document.getElementById('dt').value);

  // Validaciones
  if ([v0, g, t0, tf, dt].some(isNaN)) {
    mostrarError('Por favor, completa todos los campos con valores numéricos.');
    return;
  }
  if (dt <= 0) {
    mostrarError('El intervalo de tiempo (Δt) debe ser mayor que cero.');
    return;
  }
  if (tf <= t0) {
    mostrarError('El tiempo final (tf) debe ser mayor que el tiempo inicial (t₀).');
    return;
  }

  // Generar los pasos y la tabla
  const pasoContainer = document.getElementById('pasos');
  const tbody = document.querySelector('#tablaResultados tbody');
  pasoContainer.innerHTML = '';
  tbody.innerHTML = '';

  // Mostrar valores ingresados
  const resumen = document.createElement('div');
  resumen.className = 'paso';
  resumen.innerHTML = `
    <span class="etiqueta">Valores ingresados:</span><br>
    Velocidad inicial <span class="operacion">v₀ = ${v0} m/s</span><br>
    Aceleración de la gravedad <span class="operacion">g = ${g} m/s²</span><br>
    Tiempo inicial <span class="operacion">t₀ = ${t0} s</span><br>
    Tiempo final <span class="operacion">tf = ${tf} s</span><br>
    Intervalo de tiempo <span class="operacion">Δt = ${dt} s</span>
  `;
  pasoContainer.appendChild(resumen);

  // Nota de la fórmula
  const formulaPaso = document.createElement('div');
  formulaPaso.className = 'paso';
  formulaPaso.innerHTML = `<span class="etiqueta">Fórmula utilizada:</span><br>
    <span class="operacion">v = v₀ + g · t</span>`;
  pasoContainer.appendChild(formulaPaso);

  let iteracion = 1;
  // Evitar problemas de punto flotante: usar contador entero
  const totalPasos = Math.round((tf - t0) / dt);

  for (let i = 0; i <= totalPasos; i++) {
    const t = parseFloat((t0 + i * dt).toFixed(10));
    // Redondear para presentación
    const tDisplay = parseFloat(t.toFixed(4));
    const v = v0 + g * tDisplay;
    const vDisplay = parseFloat(v.toFixed(4));

    const gTimesT = parseFloat((g * tDisplay).toFixed(4));

    // Paso a paso
    const paso = document.createElement('div');
    paso.className = 'paso';
    paso.innerHTML = `
      <span class="etiqueta">Iteración ${iteracion} — t = ${tDisplay} s:</span><br>
      <span class="operacion">v = ${v0} + (${g}) · (${tDisplay})</span><br>
      <span class="operacion">v = ${v0} + ${gTimesT}</span><br>
      Resultado: <span class="resultado">v = ${vDisplay} m/s</span>
    `;
    pasoContainer.appendChild(paso);

    // Fila de la tabla
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${tDisplay}</td><td>${vDisplay}</td>`;
    tbody.appendChild(tr);

    iteracion++;
  }

  resultadosSection.classList.remove('hidden');
}

function mostrarError(msg) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = msg;
  errorDiv.classList.remove('hidden');
}
