import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './MyEditor.css';

const MyEditor = ({ setText, initialValue }) => {
  return (
    <div class="editor-wrapper">
      <CKEditor
        editor={Editor}
        data={initialValue}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(data);
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
};

export default MyEditor;
