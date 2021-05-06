import { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './CollaborativeEditor.css';

function CollaborativeEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onChange = editorState => {
    // const text = state.getCurrentContent().getPlainText();
    setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div className="collaborative-editor">
      <Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} />
    </div>
  );
}

export default CollaborativeEditor;
