import { useState } from 'react'
import { ForumCard } from '../components/ForumCard'
import '../styles/Forum.css'
import userIcon from '../assets/user_.svg'


export const Forum = () => {
  const [orderComments, setOrderComments] = useState('down')
  const [orderViews, setOrderViews] = useState('down')
  const [orderModified, setOrderModified] = useState('down')

  const handleOrderComment = () => {
    const tmp = (orderComments === 'down') ? 'up' : 'down';
    setOrderComments(tmp)
  }

  const handleOrderViews = () => {
    const tmp = (orderViews === 'down') ? 'up' : 'down';
    setOrderViews(tmp)
  }
  const handleOrderModified = () => {
    const tmp = (orderModified === 'down') ? 'up' : 'down';
    setOrderModified(tmp)
  }

  return (
    <section style={{ width: '100%' }}>
      <div className='forum-container container'>
        <section className='forum-info'>
          <section className='forum-info_tema'>
            <h3>Tema</h3>
          </section>
          <section className='forum-info_space'></section>
          <section className='forum-info_data'>
            <h4 className='forum-info_data_1'>
              Respuestas 
              <i className={'bi bi-chevron-double-'+orderComments} onClick={ handleOrderComment }></i></h4>
            <h4 className='forum-info_data_2'>
              Vistas 
              <i className={'bi bi-chevron-double-'+orderViews} onClick={ handleOrderViews }></i></h4>
            <h4 className='forum-info_data_3'>
              Ultima Modificaión 
              <i className={'bi bi-chevron-double-'+orderModified} onClick={ handleOrderModified }></i></h4>
          </section>
        </section>

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
          active={false}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, obcaecati quibusdam! Unde, id!'}
          participants={[{ id: 1, name: 'userOne', profile: userIcon },
          { id: 2, name: 'userTwo', profile: userIcon },
          { id: 3, name: 'userTwo', profile: userIcon },
          { id: 4, name: 'userTwo', profile: userIcon },
          { id: 5, name: 'userTwo', profile: userIcon },
          { id: 6, name: 'userTwo', profile: userIcon },
          { id: 7, name: 'userTwo', profile: userIcon },
          { id: 8, name: 'userTwo', profile: userIcon },
          { id: 9, name: 'userTwo', profile: userIcon },
          { id: 10, name: 'userTwo', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, obcaecati quibusdam! Unde, id!'}
          participants={[{ id: 1, name: 'userOne', profile: userIcon },
          { id: 2, name: 'userTwo', profile: userIcon },
          { id: 3, name: 'userTwo', profile: userIcon },
          { id: 4, name: 'userTwo', profile: userIcon },
          { id: 5, name: 'userTwo', profile: userIcon },
          { id: 9, name: 'userTwo', profile: userIcon },
          { id: 10, name: 'userTwo', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
          active={false}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
          active={false}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, obcaecati quibusdam! Unde, id!'}
          participants={[{ id: 1, name: 'userOne', profile: userIcon },
          { id: 10, name: 'userTwo', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, obcaecati quibusdam! Unde, id!'}
          participants={[{ id: 1, name: 'userOne', profile: userIcon },
          { id: 2, name: 'userTwo', profile: userIcon },
          { id: 3, name: 'userTwo', profile: userIcon },
          { id: 10, name: 'userTwo', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
          active={false}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, obcaecati quibusdam! Unde, id!'}
          participants={[
          { id: 6, name: 'userTwo', profile: userIcon },
          { id: 9, name: 'userTwo', profile: userIcon },
          { id: 10, name: 'userTwo', profile: userIcon }]}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit, amet consectetur adipisicing.'}
          participants={[{ id: 3, name: 'userOne', profile: userIcon }]}
          active={false}
        />

        <ForumCard
          title={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, obcaecati quibusdam! Unde, id!'}
          participants={[{ id: 1, name: 'userOne', profile: userIcon },
          { id: 2, name: 'userTwo', profile: userIcon },
          { id: 3, name: 'userTwo', profile: userIcon },
          { id: 4, name: 'userTwo', profile: userIcon },
          { id: 10, name: 'userTwo', profile: userIcon }]}
        />

      </div>
    </section>
  )
}
