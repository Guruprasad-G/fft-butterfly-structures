import './App.css';
import NavBar from '../src/components/NavBar/NavBar'
import MainPage from './components/MainPage/MainPage';
import { Container } from '@mui/system';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <MainPage  style={{margintop:"500px"}}></MainPage>
    </>
  );
}

export default App;
