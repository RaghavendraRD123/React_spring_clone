import logo from './logo.svg';
import './App.css';
import { BottomSheet } from './components/BottomSheet/BottomSheet';
import { Hello } from './components/Hello';

function App() {
  return (
    <div className="App">
      <BottomSheet >
        <Hello />
      </BottomSheet>
    </div>
  );
}

export default App;
