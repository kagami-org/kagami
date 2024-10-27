import { TodoBlock } from './blocks/todo.block'
import 'semantic-ui-css/semantic.min.css'

export const App = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 150}}>
      <TodoBlock />
    </div>
  )
}

export default App
