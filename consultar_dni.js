// Función para cargar la API de Google Client
function initClient() {
    gapi.client.init({
      // API Key para acceso público
      apiKey: 'AIzaSyAzd3hQ75-8MDEGqTa8t_V4Uk5W5Ea365Y',
      // Descubrimiento de la API de Sheets
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest'],
    }).then(function() {
      console.log('Cliente de Google API inicializado correctamente.');
    }, function(error) {
      console.error('Error al inicializar el cliente de Google API:', error);
    });
  }
  function searchByEmail() {
    const email = document.getElementById('email').value.trim();
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
        return emailColumn === email;
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
 
