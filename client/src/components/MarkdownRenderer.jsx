import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MDWrapper = styled.div`
  padding: 10px 20px;
  height: 100%;
`;

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    console.log(children, inline);
    if (inline) {
      return (
        <SyntaxHighlighter
          style={theme}
          useInlineStyles={false}
          codeTagProps={{
            style: {
              backgroundColor: '#f6f8fa',
              padding: '3px 5px',
              borderRadius: '3px',
              color: '#484e5d',
            },
          }}
          PreTag="span"
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      );
    }
    return match ? (
      <SyntaxHighlighter
        style={theme}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

const MarkdownRenderer = ({ children, ...props }) => (
  <MDWrapper>
    <ReactMarkdown
      className="markdown-preview"
      children={children}
      components={components}
      {...props}
    />
  </MDWrapper>
);
export default MarkdownRenderer;
