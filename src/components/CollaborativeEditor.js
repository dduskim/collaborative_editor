import { useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { db } from '../firebase';
import 'draft-js/dist/Draft.css';
import './CollaborativeEditor.css';

const { hasCommandModifier } = KeyBindingUtil;

function CollaborativeEditor() {
  useEffect(() => {
    db.collection('document')
      .doc('eS0A651oZCTx0GrNv12c')
      .get()
      .then(snapshot => {
        console.log(snapshot.data());
        setEditorState(EditorState.createWithContent(convertFromRaw(snapshot.data())));
      });
  }, []);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onChange = editorState => {
    setEditorState(editorState);
  };

  const keyBindingFn = e => {
    if (!hasCommandModifier(e) && e.shiftKey && e.key === 'H') {
      return 'highlight';
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState) => {
    if (command === 'highlight') {
      onChange(RichUtils.toggleInlineStyle(editorState, command));
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onClick = () => {
    const content = editorState.getCurrentContent();
    db.collection('document')
      .doc('eS0A651oZCTx0GrNv12c')
      .set(convertToRaw(content))
      .then(() => {
        console.log('saved');
      })
      .catch(() => {
        console.log('save fail');
      });
  };

  return (
    <div className="collaborative-editor">
      <Editor
        customStyleMap={{ highlight: { backgroundColor: '#aaa' } }}
        editorState={editorState}
        onChange={onChange}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
      />
      <button onClick={onClick}>Save</button>
    </div>
  );
}

export default CollaborativeEditor;
