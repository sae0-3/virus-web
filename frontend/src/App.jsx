import { Route, Routes } from 'react-router-dom'

import { Login, Register } from '@auth/pages'
import { Chat } from '@chat/pages'
import { Header } from '@common/components'
import { NotMatch } from '@common/pages'
import { ForumList, ForumPost, ForumThread } from '@forum/pages'
import { Notice } from '@notice/pages'

import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'


export const App = () => {

  return (
    <>
      <Header />

      <Routes>
        <Route index element={<ForumList />} />
        <Route path='temas' element={<ForumList />} />
        <Route path='tema/:id' element={<ForumThread />} />
        <Route path='nuevo-tema' element={<ForumPost />} />

        <Route path='anuncios' element={<Notice />} />
        <Route path='chat' element={<Chat />} />

        <Route path='iniciar-sesion' element={<Login />} />
        <Route path='registrarse' element={<Register />} />

        <Route path='*' element={<NotMatch />} />
      </Routes>
    </>
  )
}
