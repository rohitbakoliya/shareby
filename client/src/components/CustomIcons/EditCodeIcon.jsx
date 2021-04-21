import Icon from '@ant-design/icons';

export const EditCodeIcon = props => (
  <Icon
    component={() => (
      <svg
        className="edit edit-code"
        viewBox="0 0 16 16"
        version="1.1"
        width="1em"
        height="1em"
        aria-hidden="true"
        fill="currentColor"
        focusable="false"
      >
        <path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path>
      </svg>
    )}
    {...props}
  />
);
