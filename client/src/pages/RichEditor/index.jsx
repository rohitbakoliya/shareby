import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BGWrapper } from './index.style';
import { initialBlocks } from 'config/richText.example';
import Layout from 'layouts/Root';
import EditorLayout from 'layouts/Editor';
import RichTextSharingOptions from 'components/SharingOptions/TextSharing';
import RichTextEditor from 'components/RichTextEditor';
import SEO from 'components/SEO';

const RichEditor = () => {
  const { state: routerState } = useLocation();
  const [blocks, setBlocks] = useState((routerState && JSON.parse(routerState)) || initialBlocks);

  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };
  return (
    <Layout>
      <SEO title="Rich Text Editor" />
      <BGWrapper>
        <EditorLayout
          left={<RichTextEditor blocks={blocks} addBlocks={addBlocks} />}
          right={<RichTextSharingOptions blocks={blocks} />}
        />
      </BGWrapper>
    </Layout>
  );
};
export default RichEditor;
