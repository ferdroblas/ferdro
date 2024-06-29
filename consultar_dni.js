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
    const today = new Date(); // Fecha actual
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1E_g45qALP3E3jKkJ-myXezksGBoHUflveY51LA0YibE',
      range: 'Turnos!A:E', // Rango a consultar
      
    }).then(function(response) {
        const data = response.result.values;
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
    
        if (!data || data.length === 0) {
          resultsDiv.innerHTML = 'No se encontraron resultados.';
          return;
        }
    
        // Filtrar datos por DNI y fecha futura
        const filteredData = data.filter(row => {
          const fechaTurno = new Date(row[3]); // Suponiendo que row[3] es la columna de la fecha
          return row[0] === dni && fechaTurno > today;
        });
    
        if (filteredData.length === 0) {
          resultsDiv.innerHTML = 'No se encontraron resultados para este DNI en fechas futuras.';
        } else {
          // Mostrar todos los resultados encontrados
          filteredData.forEach(row => {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `<p><strong>Paciente:</strong> ${row[2]}</p>
                                   <p><strong>DNI:</strong> ${row[0]}</p>
                                   <p><strong>Fecha:</strong> ${row[3]}</p>
                                   <p><strong>Hora:</strong> ${row[4]}</p>`;
            resultsDiv.appendChild(resultDiv);
          });
        }
      }, function(error) {
        console.error('Error al buscar por DNI y fecha:', error);
      });
    }