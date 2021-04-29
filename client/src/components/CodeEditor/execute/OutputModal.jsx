import { Input, Modal, Typography } from 'antd';

const OutputModal = ({ isModalVisibleO, output, handleCancel, handleOk }) => {
  return (
    <>
      <Modal title="Output" visible={isModalVisibleO} onOk={handleOk} onCancel={handleCancel}>
        {output.compile_status === 'OK' ? (
          <>
            <Typography.Paragraph>Compiled and executed successfully</Typography.Paragraph>
            <Input.TextArea readOnly value={output.output} rows={4} />
          </>
        ) : (
          <>
            <Typography.Paragraph>Compilation Error</Typography.Paragraph>
            <Input.TextArea
              style={{ backgroundColor: '#FFDADA' }}
              readOnly
              value={output.compile_status}
              row={4}
            />
          </>
        )}
      </Modal>
    </>
  );
};
export default OutputModal;
