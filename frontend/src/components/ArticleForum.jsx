import { Link } from 'react-router-dom'
import personIcon from '../../node_modules/bootstrap-icons/icons/person.svg'
import '../styles/ArticleForum.css'


export const ArticleForum = () => {
  return (
    <article className='card articleForum cardActive'>
      <div className='card-body'>
        <Link to='/tema/1'
          className='card-title h1'
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat libero magni officia voluptatibus!</Link>

        <section className='articleForum-participants'>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
          <a href='#'>
            <img src={personIcon} alt='participan profile' /></a>
        </section>

        <section className='articleForum-data'>
          <p>1<span>Respuestas</span></p>
          <p>10<span>Vistas</span></p>
          <p>25/03/2024<span>Actividad</span></p>
        </section>
      </div>
    </article>
  )
}
