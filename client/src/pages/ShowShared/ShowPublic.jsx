import MonacoEditor from '@monaco-editor/react';
import { PropagateLoader as Loader } from 'react-spinners';

const ShowPublic = ({ data }) => {
  return (
    <>
      <MonacoEditor
        options={{ readOnly: true }}
        language={data.language}
        loading={<Loader color="lightblue" />}
        value={data.body}
      />
    </>
  );
};

export default ShowPublic;
