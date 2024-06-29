//const config = require('./config'); // Ruta al archivo config.js

// Ahora puedes acceder a tu apiKey usando config.apiKey
//const apiKey = config.apiKey;



function initClient() {
  gapi.client.init({
    // API Key para acceso público
    apiKey: 'AIzaSyA687BWj2bD3dk2DnqpCAjPMcB9jeDTKP8',
    clientId: '521200181277-ggt79gnbpmco2qfl320pab9emrulr70m.apps.googleusercontent.com',
    // Descubrimiento de la API de Sheets
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest'],
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  }).then(function() {
    console.log('Cliente de Google API inicializado correctamente.');
  }, function(error) {
    console.error('Error al inicializar el cliente de Google API:', error);
  });
  gapi.load('client:auth2', initClient);
}

function searchByEmail() {
  const email = document.getElementById('email').value.trim();
  // const today = new Date(); // Obtener la fecha actual
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1E_g45qALP3E3jKkJ-myXezksGBoHUflveY51LA0YibE',
    range: 'Turnos!A:E', // Rango a consultar
  }).then(function(response) {
    const data = response.result.values;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!data || data.length === 0) {
      resultsDiv.innerHTML = 'No se encontraron resultados.';
      return;  // **Cambiar '};' a 'return;'**
    }

    // Filtrar datos por correo electrónico
    const filteredData = data.filter(row => {
      const emailColumn = row[4]; // Suponiendo que row[4] es la columna del correo electrónico
      const personaColumn = row[1]; // Suponiendo que row[1] es la columna del estado

      // Verificar si el estado no comienza con "Cancelado"
      if (!personaColumn.trim().startsWith("Cancel")) {
        return emailColumn === email;
      }
      return false; // No incluir filas con estado "Cancelado"
    });

    if (filteredData.length === 0) {
      resultsDiv.innerHTML = 'No se encontraron resultados para este correo electrónico.';
    } else {
      const table = document.createElement('table');
      table.classList.add('results-table');

      // Crear fila de títulos
      const headerRow = document.createElement('tr');
      const headers = ['Fecha', 'Hora', 'Paciente'];

      headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
      });

      table.appendChild(headerRow);

      // Iterar sobre los datos filtrados y agregar filas a la tabla
      filteredData.forEach(row => {
        const rowElement = document.createElement('tr');
        const fechaCell = document.createElement('td');
        const horaCell = document.createElement('td');
        const pacienteCell = document.createElement('td');
       // const emailCell = document.createElement('td');

        fechaCell.textContent = row[2]; // Suponiendo que row[2] es la columna de la fecha
        horaCell.textContent = row[3]; // Suponiendo que row[3] es la columna de la hora
        pacienteCell.textContent = row[1]; // Suponiendo que row[1] es la columna del paciente
        //emailCell.textContent = row[4]; // Suponiendo que row[4] es la columna del correo electrónico

        rowElement.appendChild(fechaCell);
        rowElement.appendChild(horaCell);
        rowElement.appendChild(pacienteCell);
       // rowElement.appendChild(emailCell);

        table.appendChild(rowElement);
      });

      // Mostrar la tabla en resultsDiv
      resultsDiv.innerHTML = ''; // Limpiar contenido previo
      resultsDiv.appendChild(table);

      // Mostrar información adicional sobre el paciente
      const infoDiv = document.createElement('div');
      infoDiv.innerHTML = `<h3>${filteredData[0][1]}</h3>
                           <h2>Turnos agendados</h2>`
                            ;}
      resultsDiv.insertBefore(infoDiv, table);
    }, function(error) {
    console.error('Error al buscar por correo electrónico:', error);
  });
}
