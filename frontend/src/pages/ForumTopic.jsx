import { CardTopic } from '../components/CardForum'
import '../styles/ForumTopic.css'


export const ForumTopic = () => {
  return (
    <div className='container'>
      <div className='cardTopicForum'>
        <h2 className='cardTopicForum-title'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dolores.</h2>
        <CardTopic />

        <div className='cardTopicForum-footer'>
          <span className='badge rounded-pill text-bg-success'>Activo</span>
          <div className='cardTopicForum-footer_data'>
            <p>1<span>Respuestas</span></p>
            <p>10<span>Vistas</span></p>
            <p>1<span>Usuarios</span></p>
          </div>
          <button
              className='btn btn-secondary'
              data-bs-target="#collapseTopicCategories"
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapseTopicCategories"
            >Categorias</button>
        </div>

        <div className="collapse" id="collapseTopicCategories">
          <div>
            <a href="#"><span className="badge text-bg-primary">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-secondary">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-success">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-danger">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-warning">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-info">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-light">Categoria_#</span></a>
            <a href="#"><span className="badge text-bg-dark">Categoria_#</span></a>
          </div>
        </div>
      </div>

      <hr />

      <CardTopic />
      <CardTopic />
    </div>
  )
}
