import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RichText } from '../src/components/RichText';
import { detailedChanges, emptyEditHistory, formatSelection, recordEdit, safeEditorLink, stepHistory, wordCount } from '../src/lib/editorTools';
import { EDITOR_FIELDS } from '../src/config/editorFields';
import { DEFAULT_CONTENT } from '../src/config/defaultContent';

test('formatted text renders semantic paragraphs, emphasis, lists and links', () => {
  const html = renderToStaticMarkup(<RichText text={'**Together** with *PID*.\n\n- Education\n- Sport\n\n[Contact us](https://www.piduganda.org/#contact)'} />);
  assert.match(html, /<strong>Together<\/strong>/);
  assert.match(html, /<em>PID<\/em>/);
  assert.match(html, /<ul>/);
  assert.match(html, /<li>Education<\/li>/);
  assert.match(html, /href="https:\/\/www.piduganda.org\/#contact" target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(html, /\*\*Together\*\*/);
});
test('rich text cannot introduce executable HTML, images or unsafe links', () => {
  const html = renderToStaticMarkup(<RichText text={'<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[Bad](javascript:alert%281%29)\n\n[File](data:text/html,bad)\n\n![Image](https://example.org/a.png)'} />);
  assert.doesNotMatch(html, /<script|<img|onerror|href="javascript|href="data:/i);
  assert.match(html, /Bad/);
});
test('the editor accepts useful link types and rejects protocol tricks', () => {
  for (const value of ['https://example.org/path', '#contact', '/about', 'mailto:info@piduganda.org', 'tel:+256 123456789']) assert.ok(safeEditorLink(value));
  for (const value of ['javascript:alert(1)', 'data:text/html,x', '//evil.org', '/\\evil.org', 'https://name:secret@example.org', 'https://example.org\nfoo', 'file:///tmp/a']) assert.equal(safeEditorLink(value), '');
});
test('formatting applies to selected text and can be toggled off', () => {
  const bold = formatSelection('Hello world', 6, 11, 'bold');
  assert.equal(bold.text, 'Hello **world**');
  const plain = formatSelection(bold.text, bold.start, bold.end, 'bold');
  assert.equal(plain.text, 'Hello world');
  assert.equal(formatSelection('Alpha\nBeta', 0, 10, 'bullets').text, '- Alpha\n- Beta');
  assert.equal(formatSelection('Alpha\nBeta', 0, 10, 'numbered').text, '1. Alpha\n2. Beta');
  const link = formatSelection('Contact PID', 0, 7, 'link', '#contact');
  assert.equal(link.text, '[Contact](#contact) PID');
  assert.throws(() => formatSelection('Link', 0, 4, 'link', 'javascript:alert(1)'));
});
test('undo groups typing, supports redo, and drops the abandoned branch', () => {
  let state = recordEdit(emptyEditHistory<string>(), 'original', 'body', 1000);
  state = recordEdit(state, 'first keystroke', 'body', 1200);
  assert.deepEqual(state.past, ['original']);
  state = recordEdit(state, 'edited body', 'title', 1300);
  let result = stepHistory(state, 'edited title', 'undo');
  assert.equal(result.value, 'edited body');
  result = stepHistory(result.state, result.value, 'undo');
  assert.equal(result.value, 'original');
  result = stepHistory(result.state, result.value, 'redo');
  assert.equal(result.value, 'edited body');
  state = recordEdit(result.state, result.value, 'new branch', 2000);
  assert.equal(state.future.length, 0);
  for (let i = 0; i < 60; i++) state = recordEdit(state, String(i), '', 3000 + i);
  assert.equal(state.past.length, 25);
});
test('change review includes exact nested values, additions and deletions', () => {
  const changes = detailedChanges({ heroTitle1: 'Before', partners: [{ name: 'One' }, { name: 'Two' }] }, { heroTitle1: '**After**', partners: [{ name: 'Changed' }] });
  assert.deepEqual(changes.map(change => change.path), ['heroTitle1', 'partners.0.name', 'partners.1']);
  assert.equal(changes[0].before, 'Before'); assert.equal(changes[0].after, '**After**');
  assert.equal(changes[1].label, 'Partners › Item 1 › Name');
  assert.equal(changes[2].after, '(not set)');
  assert.deepEqual(detailedChanges(DEFAULT_CONTENT, DEFAULT_CONTENT), []);
});
test('every page editor field exists and existing brand highlights still render', () => {
  for (const field of EDITOR_FIELDS) assert.ok(field.key in DEFAULT_CONTENT || ['aboutMissionDesc', 'aboutVisionDesc'].includes(field.key), field.key);
  const html = renderToStaticMarkup(<RichText text="For {our children} and communities." highlight />);
  assert.match(html, /our children/); assert.match(html, /bg-clip-text/); assert.doesNotMatch(html, /\{our children\}/);
  assert.equal(wordCount('**Community** and [sport](https://example.org).'), 3);
});
