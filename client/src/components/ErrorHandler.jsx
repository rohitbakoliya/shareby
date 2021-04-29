import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ErrorHandler = ({ status, statusText, data }) => {
  const errorMsg = `Oops! Something went wrong, please check your internet connection`;
  const hisory = useHistory();
  const goBack = () => {
    hisory.replace('/');
  };
  const HomeBtn = (
    <Button type="primary" className="home__btn" onClick={goBack} key="home">
      Return Home
    </Button>
  );
  return (
    <Result
      status={status}
      title={statusText || status}
      subTitle={data.error || errorMsg}
      extra={
        data.issueLink
          ? [
              HomeBtn,
              <Button type="primary" target="__blank" href={data.issueLink} key="issue">
                Raise an Issue
              </Button>,
            ]
          : HomeBtn
      }
    />
  );
};
ErrorHandler.defaultProps = {
  status: 'error',
  statusText: 'INTERNAL SERVER ERROR',
  data: `Oops! Something went wrong, please check your internet connection`,
};
ErrorHandler.propTypes = {
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  statusText: PropTypes.string,
  data: PropTypes.any.isRequired,
};

export default ErrorHandler;
