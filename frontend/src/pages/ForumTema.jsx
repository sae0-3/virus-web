export const ForumTema = () => {
  return (
    <section>
      <div className="container">
        <h1>Te encuentras en el tema con id: {location.pathname.split('/')[2]}</h1>
      </div>
    </section>
  )
}
