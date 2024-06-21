import React, { useEffect, useState } from 'react';
import './Notice.css';

export const Notice = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState(null);
  const [useLocation, setUseLocation] = useState(false);
  const [fetchTriggered, setFetchTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://localhost:8080/api/notice';
  // const finalUrl = proxyUrl + targetUrl;

  const geolocationApiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=95abb16c562f48228a6d1a54fcf8bb28`; //api temporal para probar el proyecto, es publica y no representa una brecha de seguridad o un peligro.

  useEffect(() => {
    fetch(geolocationApiUrl)
      .then(response => response.json())
      .then(locationData => {
        console.log(locationData);
        setLocation(locationData);
      })
      .catch(error => {
        console.error('Hubo un error al obtener la ubicación:', error);
      });
  }, [geolocationApiUrl]);

  const fetchJobList = () => {
    setLoading(true);
    setTimeout(() => {
      fetch(targetUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data.selection1);
          setLoading(false);
          setFetchTriggered(true);
          setUpdateMessage(`Lista actualizada ${new Date().toLocaleDateString()}`);
        })
        .catch(error => {
          console.error('Hubo un error al recuperar los datos:', error);
          setLoading(false);
        });
    }, 3000); // Agregamos un retraso de 3 segundos para que los datos se carguen correctamente
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    document.activeElement.blur();
  };

  const handleUseLocationChange = () => {
    setLoading(true);
    setUseLocation(!useLocation);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (fetchTriggered && !loading) {
      setUpdateMessage(`Lista actualizada ${new Date().toLocaleDateString()}`);
    }
  }, [fetchTriggered, loading]);

  const filteredData = data.filter(item => {
    const textContent = item.name.replace(/<[^>]*>/g, '').toLowerCase();
    return textContent.includes(searchTerm.toLowerCase());
  });

  const locationFilteredData = filteredData.filter(item => {
    if (useLocation && location) {
      return item.Lugar.toLowerCase().includes(location.country_name.toLowerCase());
    }
    return true;
  });

  return (
    <div className="Notice">
      <h1>Resultados de la API</h1>
      <button
        type="button"
        className="button-fetch"
        onClick={fetchJobList}
        disabled={loading}
      >
        RECUPERAR JOB LIST
      </button>
      {loading && <div className="loading">Cargando...</div>}
      {fetchTriggered && !loading && (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar en todos los campos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button
              type="button"
              className="button-search"
              onClick={handleSearchClick}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="location-switch">
            <label>
              <input
                type="checkbox"
                checked={useLocation}
                onChange={handleUseLocationChange}
                disabled={loading}
              />
              Usar API de Geolocalización:
              Detecta automaticamente tu ubicacion
              para mostrarte resultados relacionados.
            </label>
          </div>
          <div className="update-message">
            {updateMessage && (
              <>
                <strong>{updateMessage}</strong>
              </>
            )}
          </div>
        </>
      )}
      <div id="results">
        {locationFilteredData.length > 0 ? (
          locationFilteredData.map((item, index) => {
            // Eliminar etiquetas HTML si existen y dividir por saltos de línea
            const cleanName = item.name.replace(/<[^>]*>/g, '');
            const nameParts = cleanName.split('\n').map(part => part.trim()).filter(part => part);

            // Inicializar variables
            let title = '';
            let position = '';
            let location = '';
            let published = '';

            // Asignar valores basados en las partes disponibles
            if (nameParts.length > 0) {
              title = nameParts[0];
            }

            if (nameParts.length > 1) {
              position = nameParts[1];
            }

            if (nameParts.length > 2) {
              location = nameParts[2];
            }

            // Buscar la fecha de publicación
            const publishedMatch = cleanName.match(/Published\s*\d+\s*days\s*ago/);
            published = publishedMatch ? publishedMatch[0] : 'Fecha no disponible';

            return (
              <div key={index} className="result-item">
                <p><strong>Nombre:</strong> {title}</p>
                <p><strong>Posición:</strong> {position}</p>
                <p><strong>Lugar:</strong> {location}</p>
                <p><strong>Publicado:</strong> {published}</p>
                <p><strong>URL:</strong> <a href={item.url} target="_blank" rel="noopener noreferrer">Ver más</a></p>
              </div>
            );
          })
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

