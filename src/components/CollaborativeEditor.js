import { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './CollaborativeEditor.css';

function CollaborativeEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <div className="collaborative-editor">
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default CollaborativeEditor;
