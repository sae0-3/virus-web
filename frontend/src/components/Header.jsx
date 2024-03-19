import '../styles/Header.css'


export const Header = () => {
  return (
    <header className='cabecera'>
      <nav className='cabecera-nav container'>
        <div className='cabecera-nav_logo'>
          <a href="#">
            <h2>Sansi Web</h2>
          </a>
        </div>

        <div className='cabecera-nav_items'>
          <button className='searchBtn'>
            <i className="bi bi-search"></i>
          </button>
          <button className='menuBtn'>
            <i className="bi bi-list"></i>
          </button>
        </div>
      </nav>
    </header>
  )
}
