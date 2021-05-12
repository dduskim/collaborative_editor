import CollaborativeEditor from './components/CollaborativeEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="EditorContainer">
        {/* {[...Array(1).keys()].map(index => {
          return <CollaborativeEditor key={index} />;
        })} */}
        <CollaborativeEditor />
      </div>
      <div className="buttons"></div>
    </div>
  );
}

export default App;
