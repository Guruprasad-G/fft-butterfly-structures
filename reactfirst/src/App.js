import './App.css';
import NavBar from '../src/components/NavBar/NavBar'
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar></NavBar>
        <MainPage></MainPage>
      </header>
    </div>
  );
}

export default App;
