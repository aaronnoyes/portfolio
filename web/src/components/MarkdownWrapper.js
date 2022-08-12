import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Section from './Section.js'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark.js'


export default function MarkdownWrapper(props) {
    return(
        <Section >
          <ReactMarkdown
            children={props.children}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    codeTagProps={{"fontFamily": "inherit"}}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          />
        </Section>
    );
}