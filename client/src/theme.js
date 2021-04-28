const colors = {
  primary: '#7546c9',
  secondary: '#ecbdff',
  light: '#9a9bcc',
  accent: '#efe9ff',
  gradient: `-webkit-gradient(linear, left bottom, left top,
    color-stop(0.44, rgb(152, 164, 210)),
    color-stop(0.72, rgb(154, 155, 204)),
    color-stop(0.86, rgb(112, 121, 179)))`,
};

const shadows = {
  xsmall: `0px 5px 10px rgba(117, 70, 201, 0.05)`,
  small: `0 5px 10px  rgba(127, 99, 211, 0.1)`,
  medium: `0px 10px 10px  rgba(117, 70, 201, 0.2)`,
  large: `0 24px 24px -18px rgb(80, 69, 129, 0.33), 0 9px 45px 0 rgb(94, 69, 129, 0.15)`,
};

const theme = {
  colors,
  shadows,
};

module.exports = theme;
