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

  



  const fetchJobList = () => {
    setLoading(true);
    fetch(finalUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.selection1);
        setLoading(false);
        setFetchTriggered(true);
        setUpdateMessage(`Lista actualizada: ${new Date().toLocaleDateString()}`);
      })
      .catch(error => {
        console.error('Hubo un error al recuperar los datos:', error);
        setLoading(false);
      });
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
      setUpdateMessage(`Lista actualizada: ${new Date().toLocaleDateString()}`);
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
              Usar API de localización
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
            const title = item.name.replace(/<[^>]*>/g, '').split('\n')[1];
            const published = item.name.match(/Published[^<]*/)[0];

            return (
              <div key={index} className="result-item">
                <p><strong>Nombre:</strong> {title}</p>
                <p><strong>Posición:</strong> {item.Posicion}</p>
                <p><strong>Lugar:</strong> {item.Lugar}</p>
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
