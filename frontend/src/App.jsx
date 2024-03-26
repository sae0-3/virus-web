import { Header } from './components/Header'
import { Forum } from './pages/Forum'
import { ForumNewTopic } from './pages/ForumNewTopic'
import { ForumTopic } from './pages/ForumTopic'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'


export const App = () => {
  return (
    <>
      <Header />
      {/* <ForumTopic /> */}
      {/* <Forum /> */}
      <ForumNewTopic />
    </>
  )
}
