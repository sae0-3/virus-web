import { Routes, Route } from 'react-router-dom'
import { Forum } from './pages/Forum'
import { ForumTema } from './pages/ForumTema'
import { Header } from './components/Header'
import { NoMatch } from './pages/NoMatch'
import './styles/App.css'


export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Forum />} />

        <Route path='/tema/:id' element={<ForumTema />} />

        <Route path='*' element={<NoMatch /> } />
      </Routes>
    </>
  )
}
