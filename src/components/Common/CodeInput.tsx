import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { Button, Form } from 'antd';
import { javascript } from '@codemirror/lang-javascript';


const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: '#4D4D4C',
    caret: '#AEAFAD',
    selection: '#D6D6D6',
    gutterBackground: '#FFFFFF',
    gutterForeground: '#4D4D4C',
    lineHighlight: '#EFEFEF',
  },
  styles: [
    { tag: t.comment, color: '#787b80' },
    { tag: t.definition(t.typeName), color: '#194a7b' },
    { tag: t.typeName, color: '#194a7b' },
    { tag: t.tagName, color: '#008a02' },
    { tag: t.variableName, color: '#1a00db' },
  ],
});

const CodeInput: React.FC<{ onSave: (code: string) => void }> = ({ onSave }) => {
  const [code, setCode] = React.useState(""); 
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleSave = () => {
    onSave(code);
    setCode("");
    setIsExpanded(false);
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #e8e8e8', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <Form.Item label="Adicionar Código (opcional)">
        <Button onClick={() => setIsExpanded(!isExpanded)} style={{ marginBottom: '10px' }}>
          {isExpanded ? 'Ocultar Código' : 'Adicionar Código'}
        </Button>
        {isExpanded && (
          <>
            <CodeMirror
              value={code}
              height="300px"
              theme={myTheme}
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => {
                setCode(value);
              }}
            />
            <Button onClick={handleSave} style={{ marginTop: '10px' }}>
              Salvar
            </Button>
          </>
        )}
      </Form.Item>
    </div>
  );
};

export default CodeInput;
