import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ErrorHandler = ({ status, statusText, error }) => {
  const hisory = useHistory();
  const goBack = () => {
    hisory.replace('/');
  };
  return (
    <Result
      status={status}
      title={statusText || status}
      subTitle={error}
      extra={
        <Button type="link" danger onClick={goBack}>
          Return Home
        </Button>
      }
    />
  );
};
ErrorHandler.defaultProps = {
  status: 500,
  statusText: 'INTERNAL SERVER ERROR',
  error: `Oops! Something went wrong`,
};
ErrorHandler.propTypes = {
  status: PropTypes.number.isRequired,
  statusText: PropTypes.string,
  error: PropTypes.string.isRequired,
};

export default ErrorHandler;
