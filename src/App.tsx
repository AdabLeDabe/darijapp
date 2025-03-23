import './App.css'
import HeaderComponent from './components/Header';
import QuestionComponent from './components/QuestionComponent';

function App() {
  return (
    <>
      <HeaderComponent />
      <div className='container'>
        <QuestionComponent />
      </div>
    </>
  )
}

export default App;
