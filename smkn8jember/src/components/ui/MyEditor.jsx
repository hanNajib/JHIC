import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


function MyEditor({ onEditorChange, initialValue, value, init }) {
  const editorRef = useRef(null);

  const defaultInit = {
    license_key: 'gpl',
    height: 300,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount' 
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | code',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  };

  return (
    <Editor
      tinymceScriptSrc={"/tinymce/tinymce.min.js"}
      value={value || initialValue || ''}
      onInit={(evt, editor) => editorRef.current = editor}
      init={{ ...defaultInit, ...init }}
      onEditorChange={onEditorChange}
    />
  );
}

export default MyEditor;