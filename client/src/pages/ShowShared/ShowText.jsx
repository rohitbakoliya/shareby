import { useState } from 'react';
import EditorLayout from 'layouts/Editor';
import RichTextEditor from 'components/RichTextEditor';
import RichTextSharedOptions from 'components/SharedOptions/TextShared';
import { BGWrapper } from 'pages/RichEditor/index.style';
import SEO from 'components/SEO';

const ShowText = ({ data }) => {
  const [blocks, setBlocks] = useState(JSON.parse(data.body));
  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };
  return (
    <BGWrapper>
      <SEO title={data.title} slug={data.url} isShare={true} />
      <EditorLayout
        left={<RichTextEditor readOnly blocks={blocks} addBlocks={addBlocks} />}
        right={<RichTextSharedOptions data={data} />}
      />
    </BGWrapper>
  );
};

export default ShowText;
