import { useGet } from '@common/hooks'
import { NotMatch } from '@common/pages'
import userIcon from '@common/assets/user.png'
import { Link } from 'react-router-dom'


export const Profile = () => {
  const header_token = { Authorization: `Bearer ${localStorage.getItem('token')}` }
  const id = location.pathname.split('/').pop()
  const [data, error] = useGet(
    `http://localhost:8080/api/users/${id}`,
    header_token
  )

  const { name,
    lastname,
    secondname,
    username,
    mail,
    profile,
    registered_at,
    topics,
    saved,
    interested } = !!data && data

  return error ? (
    <NotMatch />
  ) : (!!data &&
    <div className='container'>
      <h2 className='h2 text-center mt-5 mb-4 fw-bold'
				>Informacion del Usuario</h2>

      <section className='card text-bg-secondary mb-5'>
        <div className='card-body'>
          <div className='d-flex justify-content-sm-evenly mb-3 mt-3'>
            <div className='d-flex justify-content-center align-items-center'>
              <img
                src={!!profile ? profile : userIcon}
                alt={`profile ${name} ${lastname}`}
                style={{
                  borderRadius: '1rem',
                  maxWidth: '10rem',
                  minHeight: '12rem',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
            </div>

            <div className='d-flex flex-column gap-1 fs-5 text-center'>
              <p className='card-text'>
                <span className='fw-bold'>Nombre:</span> {name} {lastname} {secondname}
              </p>
              <p className='card-text'>
                <span className='fw-bold'>Usuario:</span> {username}
              </p>
              <p className='card-text'>
                <span className='fw-bold'>Correo:</span> {mail}
              </p>
              <p className='card-text'>
                <span className='fw-bold'>Se unio el:</span> {registered_at}
              </p>
              <p className='card-text'>
                <span className='fw-bold'>Publico:</span> {topics.length} temas
              </p>
            </div>
          </div>
        </div>
      </section>

			{!!topics && topics.length === 0 ? (
				<h3 className='h3 text-center mt-5 mb-4 fw-bold'
					>No tiene temas publicados</h3>
			) : (
			<>
				<h3 className='h3 text-center mt-5 mb-4 fw-bold'
					>Temas publicados</h3>

				<section className='card text-bg-secondary mb-5 pt-3 pb-3'>
					<div id='carouselExampleAutoplaying'
						className='carousel slide'
						data-bs-ride='carousel'
						>
						<div className='carousel-inner'>
							{topics.map(({ id, active, title, created_at }, idx) => {
								return (
									<div key={`${id}-${created_at}`}
										className={`card-body carousel-item
											text-center${idx===1 ? ' active' : ''}`}>
										<Link to={`/tema/${id}`}
											className='h2 text-bold fs-3'
											>{title}</Link>
										<span className='d-block mt-4 fs-3'>{created_at}</span>
									</div>
								)
							})}
						</div>

						<button type='button'
							className='carousel-control-prev'
							data-bs-target='#carouselExampleAutoplaying'
							data-bs-slide='prev'>
							<span className='carousel-control-prev-icon' aria-hidden='true'></span>
							<span className='visually-hidden'>Previous</span>
						</button>
						<button type='button'
							className='carousel-control-next'
							data-bs-target='#carouselExampleAutoplaying'
							data-bs-slide='next'>
							<span className='carousel-control-next-icon' aria-hidden='true'></span>
							<span className='visually-hidden'>Next</span>
						</button>
					</div>
				</section>
			</>
			)}

			<div className='d-flex justify-content-evenly mt-5 mb-4'>
				{!!saved && saved.length !== 0 && (
					<div>
						<h3 className='h3 text-center fw-bold'
							>Guardados</h3>

						<ul className='list-group'>
							{saved.map((id, idx) => (
								<li key={`${id}-${idx}`} className='list-group-item'>
									{id}
								</li>
							))}
						</ul>
					</div>
				)}

				{!!interested && interested.length !== 0 && (
					<div>
						<h3 className='h3 text-center fw-bold'
							>Intereses</h3>

						<ul className='list-group'>
							{interested.map((id, idx) => (
								<li key={`${id}-${idx}`} className='list-group-item'>
									{id}
								</li>
							))}
					</ul>
					</div>
				)}
			</div>
    </div>
  )
}
