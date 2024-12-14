'use client'
import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState, SerializedEditorState } from 'lexical';
import { ImageNode } from './plugins/nodes/ImageNode';
interface ContentReadProps {
  editorStateJson: string; // Estado del editor en formato JSON (string)
}

// Configuración inicial del editor
const editorConfig = {
  namespace: 'ContentRead',
  theme: {}, // Opcional: define un tema si es necesario
  onError: (error: Error) => {
    console.error('Lexical Error:', error);
  },
  nodes: [ImageNode]
};

// Componente para cargar el estado inicial y configurar el editor en solo lectura
const ReadOnlyStateLoader: React.FC<ContentReadProps> = ({ editorStateJson }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (editorStateJson) {
      editor.update(() => {
        // Convertir el JSON serializado al estado de Lexical
        const parsedEditorState: EditorState = editor.parseEditorState(
          JSON.parse(editorStateJson) as SerializedEditorState
        );
        editor.setEditorState(parsedEditorState);
      });

      // Configurar el editor como solo lectura
      editor.setEditable(false);
    }
  }, [editorStateJson, editor]);

  return null;
};

// Componente principal del editor de solo lectura
const ContentRead: React.FC<ContentReadProps> = ({ editorStateJson }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      {/* Cargar el estado inicial y configurar el modo de solo lectura */}
      <ReadOnlyStateLoader editorStateJson={editorStateJson} />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>No hay contenido</div>}
        ErrorBoundary={(error) => <ErrorBoundaryComponent error={error.children} />}
      />
    </LexicalComposer>
  );
};

const ErrorBoundaryComponent: React.FC<{ error: Error }> = ({ error }) => {
    return <div>Error: {error.message}</div>;
  };

export default ContentRead;
