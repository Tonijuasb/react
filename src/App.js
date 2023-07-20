import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Quienes from './components/quienes';
import Contacto from './components/contacto';
import Otros from './components/otros';




function App() {
  return (
    <div className="App">
      <h1>Bienvenidos</h1>
      <Home />
      <Quienes />
      <Contacto />
      <Otros />




    </div>

  );
}

export default App;
