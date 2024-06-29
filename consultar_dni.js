// Función para cargar la API de Google Client
gapi.load('client:auth2', initClient);


function initClient() {
    gapi.client.init({
      // API Key para acceso público
      apiKey: 'AIzaSyAzd3hQ75-8MDEGqTa8t_V4Uk5W5Ea365Y',
      clientId: '521200181277-ggt79gnbpmco2qfl320pab9emrulr70m.apps.googleusercontent.com',
      // Descubrimiento de la API de Sheets
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function() {
      console.log('Cliente de Google API inicializado correctamente.');
    }, function(error) {
      console.error('Error al inicializar el cliente de Google API:', error);
    });
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
        return};
      });
    };
  
      // Filtrar datos por correo electrónico
        const filteredData = data.filter(row => {
        const emailColumn = row[4]; // Suponiendo que row[5] es la columna del correo electrónico
        const personaColumn = row[1]; // Suponiendo que row[1] es la columna del estado

  // Verificar si el estado no comienza con "Cancelado"
        if (!personaColumnC.trim().startsWith("Cancel")) {
        return emailColumn === email;
        }
  
        return false; 
      });
  
    if (filteredData.length === 0) {
        resultsDiv.innerHTML = 'No se encontraron resultados para este correo electrónico.';
      } else { 

        const table = document.createElement('table');
        table.classList.add('results-table');

  // Crear fila de títulos
        const headerRow = document.createElement('tr');
        const headers = ['Fecha', 'Hora', 'Paciente', 'Correo Electrónico'];

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
    const emailCell = document.createElement('td');

    fechaCell.textContent = row[2]; // Suponiendo que row[2] es la columna de la fecha
    horaCell.textContent = row[3]; // Suponiendo que row[3] es la columna de la hora
    pacienteCell.textContent = row[1]; // Suponiendo que row[1] es la columna del paciente
    emailCell.textContent = row[4]; // Suponiendo que row[4] es la columna del correo electrónico

    rowElement.appendChild(fechaCell);
    rowElement.appendChild(horaCell);
    rowElement.appendChild(pacienteCell);
    rowElement.appendChild(emailCell);

    table.appendChild(rowElement);
  });

  // Mostrar la tabla en resultsDiv
  resultsDiv.innerHTML = ''; // Limpiar contenido previo
  resultsDiv.appendChild(table);

  // Mostrar información adicional sobre el paciente
  const infoDiv = document.createElement('div');
  infoDiv.innerHTML = `<h2>Paciente</h2>
                       <p>${filteredData[0][1]}</p>
                       <p>${filteredData[0][4]}</p>`;
  resultsDiv.insertBefore(infoDiv, table); 
}


        /* filteredData.forEach(row => {
          const resultDiv = document.createElement('div');
          resultDiv.innerHTML = `<p><strong>Paciente:</strong> ${row[1]}</p>
                                 <p><strong>Correo Electrónico:</strong> ${row[4]}</p>
                                 <p><strong>Fecha:</strong> ${row[2]}</p>
                                 <p><strong>Hora:</strong> ${row[3]}</p>`;
          resultsDiv.appendChild(resultDiv);
        });
      }
    }, function(error) {
      console.error('Error al buscar por correo electrónico:', error);
    });
  }
*/