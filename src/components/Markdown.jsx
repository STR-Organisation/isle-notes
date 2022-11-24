import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import remarkGfm from 'remark-gfm';

const _mapProps = props => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin, remarkGfm],
});

const Markdown = props => <ReactMarkdown {..._mapProps(props)} />;

export default Markdown;
