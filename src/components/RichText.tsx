import React, { Children, type ReactNode } from 'react';
import Markdown from 'react-markdown';
import { safeEditorLink } from '../lib/editorTools';
import { MixedColorText } from './MixedColorText';
export function RichText({ text = '', className = '', highlight = false, isDarkBg = false }: { text?: string; className?: string; highlight?: boolean; isDarkBg?: boolean }) {
  const decorate = (children: ReactNode) => highlight ? Children.map(children, (child, index) => typeof child === 'string' ? <MixedColorText key={index} text={child} isDarkBg={isDarkBg} /> : child) : children;
  return <div className={`pid-rich-text ${className}`}><Markdown skipHtml allowedElements={['p', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br', 'blockquote', 'h2', 'h3']} unwrapDisallowed urlTransform={safeEditorLink} components={{
    p: ({ children }) => <p>{decorate(children)}</p>,
    li: ({ children }) => <li>{decorate(children)}</li>,
    strong: ({ children }) => <strong>{decorate(children)}</strong>,
    em: ({ children }) => <em>{decorate(children)}</em>,
    a: ({ href, children }) => href ? <a href={href} target={href.startsWith('https://') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a> : <span>{children}</span>,
  }}>{text}</Markdown></div>;
}
