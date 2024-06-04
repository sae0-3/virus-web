import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '@auth/components'
import { Login, Register } from '@auth/pages'
import { UserProvider } from '@auth/providers'
import { Chat, ViewChats } from '@chat/pages'
import { Header } from '@common/components'
import { NotMatch } from '@common/pages'
import { ForumList, ForumPost, ForumThread } from '@forum/pages'
import { Notice } from '@notice/pages'
import { Profile } from '@profile/pages'

import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'


export const App = () => {
  return (
    <UserProvider>
      <Header />

      <Routes>
        <Route element={ <ProtectedRoute /> }>
          <Route index element={<ForumList />} />
          <Route path='temas' element={<ForumList />} />
          <Route path='tema/:id' element={<ForumThread />} />
          <Route path='nuevo-tema' element={<ForumPost />} />

          <Route path='usuario/:id' element={<Profile />} />

          <Route path='anuncios' element={<Notice />} />

          <Route path='chat' element={<ViewChats />} />
          <Route path='chat/:id' element={<Chat />} />

          <Route path='*' element={<NotMatch />} />
        </Route>

        <Route path='iniciar-sesion' element={<Login />} />
        <Route path='registrarse' element={<Register />} />
      </Routes>
    </UserProvider>
  )
}
