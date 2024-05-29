

export const CardTopicEdit = ({ content, setEditing }) => {
  console.log(content)

  return (
    <button className="btn btn-outline-primary"
      onClick={() => { setEditing(false) }}
    >Dejar de editar
    </button>
  )
}
