import { Helmet } from 'react-helmet-async';
import { CLIENT_URL } from 'utils';
import PropTypes from 'prop-types';
import mainBanner from 'assets/main_banner.png';

const SEO = ({ title, slug, isShare }) => {
  title = 'Shareby | ' + title;
  const url = slug ? CLIENT_URL + '/' + slug : CLIENT_URL;
  const image = CLIENT_URL + mainBanner;
  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      <meta name="url" content={url} />
      <meta name="image" content={image} />
      <link rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isShare ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
export default SEO;

SEO.defaultProps = {
  title: 'Shareby',
  isShare: false,
};

SEO.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  isShare: PropTypes.bool,
};
