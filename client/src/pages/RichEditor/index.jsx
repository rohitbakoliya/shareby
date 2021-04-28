import Layout from 'layout/Root';
import { BGWrapper } from './index.style';
import RichTextSharingOptions from 'components/SharingOptions/TextSharing';
import { useState } from 'react';
import { initialBlocks } from 'components/RichTextEditor/tools';
import RichTextEditor from 'components/RichTextEditor';
import { useLocation } from 'react-router-dom';
import { IndexWrapper, LeftContent, RightContent } from 'pages/IndexPage/index.style';

const RichEditor = () => {
  const { state: routerState } = useLocation();
  const [blocks, setBlocks] = useState(JSON.parse(routerState) || initialBlocks);

  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };

  return (
    <Layout>
      <BGWrapper>
        <IndexWrapper>
          <LeftContent>
            <RichTextEditor blocks={blocks} addBlocks={addBlocks} />
          </LeftContent>
          <RightContent>
            <RichTextSharingOptions blocks={blocks} />
          </RightContent>
        </IndexWrapper>
      </BGWrapper>
    </Layout>
  );
};
export default RichEditor;
