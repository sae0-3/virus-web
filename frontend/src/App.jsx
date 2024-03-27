import { Chat } from './pages/Chat'
import { Forum } from './pages/Forum'
import { ForumNewTopic } from './pages/ForumNewTopic'
import { ForumTopic } from './pages/ForumTopic'
import { Header } from './components/Header'
import { Notice } from './pages/Notice'
import { NotMatch } from './pages/NotMatch'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Forum />} />
        <Route path='tema/:id' element={<ForumTopic />} />
        <Route path='nuevo-tema' element={<ForumNewTopic />} />

        <Route path='anuncios' element={<Notice />} />
        <Route path='chat' element={<Chat />} />

        <Route path='*' element={<NotMatch />} />
      </Routes>
    </>
  )
}
