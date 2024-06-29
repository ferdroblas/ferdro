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
  
  // Función para buscar eventos por DNI
  function searchByDni() {
    const dni = document.getElementById('dni').value.trim();
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1E_g45qALP3E3jKkJ-myXezksGBoHUflveY51LA0YibE',
      range: 'Turnos!A:E', // Rango a consultar
    }).then(function(response) {
        console.log('Respuesta de la hoja de cálculo:', response.result)
      const data = response.result.values;
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
  
      if (!data || data.length === 0) {
        resultsDiv.innerHTML = 'No se encontraron resultados.';
        return;
      }
  
      // Filtrar datos por DNI
      const filteredData = data.filter(row => row[0] === dni);
  
      if (filteredData.length === 0) {
        resultsDiv.innerHTML = 'No se encontraron resultados para este DNI.';
      } else {
        filteredData.forEach(row => {
          const resultDiv = document.createElement('div');
          resultDiv.innerHTML = '<p><strong>Paciente:</strong> ${row[2]}</p> <p><strong>DNI:</strong> ${row[0]}</p><p><strong>Fecha:</strong> ${row[3]}</p><p><strong>Hora:</strong> ${row[4]}</p>';
          resultsDiv.appendChild(resultDiv);
        });
      }
    }, function(error) {
      console.error('Error al buscar por DNI:', error);
    });
  }
  
  // Cargar la API de Google Client y llamar a initClient
  gapi.load('client', initClient);