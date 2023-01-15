import './App.css';
import NavBar from '../src/components/NavBar/NavBar'
import MainPage from './components/MainPage/MainPage';
import { Container } from '@mui/system';

function App() {
  return (
    <>
      <Container>
        <Container>
          <NavBar></NavBar>
        </Container>
      <Container>
        <MainPage></MainPage>
      </Container>
      </Container>
    </>
  );
}

export default App;
