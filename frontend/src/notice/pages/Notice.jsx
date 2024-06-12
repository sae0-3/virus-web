import React, { useState, useEffect } from 'react';
import './Notice.css';

export const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    // Aquí podrías hacer una llamada a una API para obtener las noticias
    const fetchNotices = async () => {
      // Simulación de datos
      const data = [
        { id: 1, title: 'Noticia 1', content: 'Contenido de la noticia 1' },
        { id: 2, title: 'Noticia 2', content: 'Contenido de la noticia 2' },
      ];
      setNotices(data);
      setFilteredNotices(data); // Inicialmente, las noticias filtradas son todas las noticias
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    // Cuando cambie el término de búsqueda, filtramos las noticias
    const filtered = notices.filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [searchTerm, notices]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='container'>
      <div className='search-container'>
        <input
          type="text"
          placeholder="Buscar noticias..."
          className='search-input'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className='notice-list'>
        {filteredNotices.map((notice) => (
          <li key={notice.id} className='notice-item'>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
