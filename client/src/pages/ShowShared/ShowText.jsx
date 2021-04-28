import { useState } from 'react';
import EditorLayout from 'layouts/Editor';
import RichTextEditor from 'components/RichTextEditor';
import RichTextSharedOptions from 'components/SharedOptions/TextShared';
import { BGWrapper } from 'pages/RichEditor/index.style';

const ShowText = ({ data }) => {
  const [blocks, setBlocks] = useState(JSON.parse(data.body));
  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };
  return (
    <BGWrapper>
      <EditorLayout
        left={<RichTextEditor readOnly blocks={blocks} addBlocks={addBlocks} />}
        right={<RichTextSharedOptions data={data} />}
      />
    </BGWrapper>
  );
};

export default ShowText;
