import { useEffect } from 'react';
import { db } from './firebase';
import CollaborativeEditor from './components/CollaborativeEditor';
import './App.css';

function App() {
  useEffect(() => {
    // fetch test data
    db.collection('document')
      .doc('eS0A651oZCTx0GrNv12c')
      .collection('blocks')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, doc.data().text);
        });
      });
  }, []);

  return (
    <div className="App">
      <CollaborativeEditor />
    </div>
  );
}

export default App;
