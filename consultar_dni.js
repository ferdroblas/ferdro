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
    const today = new Date(); // Obtener la fecha actual
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1E_g45qALP3E3jKkJ-myXezksGBoHUflveY51LA0YibE',
        range: 'Turnos!A:F', // Rango a consultar  
    }).then(function(response) {
      const data = response.result.values;
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
  
      if (!data || data.length === 0) {
        resultsDiv.innerHTML = 'No se encontraron resultados.';
        return;
      }
  
      // Filtrar datos por correo electrónico
      const filteredData = data.filter(row => {
        const emailColumn = row[5]; // Suponiendo que row[5] es la columna del correo electrónico
        const fechaTurno = new Date(row[3]); // Suponiendo que row[3] es la columna de la fecha del turno
        return emailColumn === email && fechaTurno >= today;
      });
  
      if (filteredData.length === 0) {
        resultsDiv.innerHTML = 'No se encontraron resultados para este correo electrónico.';
      } else { 
        filteredData.forEach(row => {
          const resultDiv = document.createElement('div');
          resultDiv.innerHTML = `<p><strong>Paciente:</strong> ${row[2]}</p>
                                 <p><strong>Correo Electrónico:</strong> ${row[5]}</p>
                                 <p><strong>Fecha:</strong> ${row[3]}</p>
                                 <p><strong>Hora:</strong> ${row[4]}</p>`;
          resultsDiv.appendChild(resultDiv);
        });
      }
    }, function(error) {
      console.error('Error al buscar por correo electrónico:', error);
    });
  }
  // Función para buscar eventos por DNI
 
