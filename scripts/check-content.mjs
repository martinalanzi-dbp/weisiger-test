#!/usr/bin/env node
// Content gate for src/content/home.json. Runs before every build (npm run build).
// Checks: valid JSON, same structure as scripts/content-shape.json, no empty or
// HTML text, character limits, and safe links. Exits 1 and lists every problem.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const contentPath = fileURLToPath(new URL('src/content/home.json', root));
const shapePath = fileURLToPath(new URL('scripts/content-shape.json', root));

// Exact-path limits win over key-name limits. Paths use dots; list items use [n].
const PATH_LIMITS = {
  'meta.title': 60,
  'meta.description': 160,
  'hero.title': 70,
  'hero.titleHighlight': 40,
  'hero.body': 180,
  'companies.title': 20,
  'companies.titleHighlight': 20,
  'why.title': 20,
  'why.titleHighlight': 20,
  'careers.title': 60,
  'careers.body': 180,
  'news.title': 40,
};
const KEY_LIMITS = {
  title: 100, titleHighlight: 40, name: 40, body: 220, description: 180,
  label: 48, eyebrow: 60, badge: 30, tag: 20, note: 40, points: 60,
  yearCaption: 60, line1: 24, line2: 24, value: 30, text: 30, emphasis: 20,
  states: 2, state: 2, year: 4, locationsTotal: 4, offers: 24, services: 24,
  area: 40, tagline: 50, copyright: 60, readMore: 20, linkLabel: 20,
  imageLabel: 20, barsNote: 80, homeLabel: 40, logoAlt: 40,
  offerLabel: 30, panelLabel: 30, locationsLabel: 30, href: 300,
};
const DEFAULT_LIMIT = 60;
const LINK = /^(#|#[A-Za-z][\w-]*|\/[\w\-./#?=&%]*|https:\/\/[^\s"'<>]+|mailto:[^\s"'<>]+)$/;

const errors = [];
const fail = (path, msg) => errors.push(`${path || '(root)'}: ${msg}`);

let content, shape;
try {
  content = JSON.parse(readFileSync(contentPath, 'utf8'));
} catch (e) {
  console.error(`src/content/home.json is not valid JSON: ${e.message}`);
  process.exit(1);
}
shape = JSON.parse(readFileSync(shapePath, 'utf8'));

const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);

function check(value, expected, path, key) {
  const want = typeOf(expected) === 'string' ? expected : typeOf(expected);
  const got = typeOf(value);
  if (want !== got) return fail(path, `expected ${want}, found ${got}`);

  if (got === 'object') {
    for (const k of Object.keys(expected)) {
      if (!(k in value)) fail(path ? `${path}.${k}` : k, 'missing (required field)');
    }
    for (const k of Object.keys(value)) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in expected)) fail(p, 'unknown field; only existing fields can be edited');
      else check(value[k], expected[k], p, k);
    }
  } else if (got === 'array') {
    if (value.length === 0) fail(path, 'list is empty');
    value.forEach((item, i) => check(item, expected[0], `${path}[${i}]`, key));
  } else if (got === 'string') {
    checkText(value, path, key);
  } else if (got === 'number') {
    if (key === 'barPercent' && (value < 0 || value > 100)) fail(path, 'must be between 0 and 100');
  }
}

function checkText(text, path, key) {
  if (text.trim() === '') return fail(path, 'is empty');
  if (text !== text.trim()) fail(path, 'has leading or trailing spaces');
  if (/<[a-z!/]/i.test(text)) fail(path, 'contains HTML; use plain text only');
  if (key === 'href') {
    if (!LINK.test(text)) fail(path, `link "${text}" must be #, #section, /path, https://… or mailto:`);
    return;
  }
  const plainPath = path.replace(/\[\d+\]/g, '');
  const limit = PATH_LIMITS[plainPath] ?? KEY_LIMITS[key] ?? DEFAULT_LIMIT;
  const length = [...text].length;
  if (length > limit) fail(path, `${length} characters, limit is ${limit}`);
}

check(content, shape, '', '');

if (errors.length) {
  console.error(`Content check failed (${errors.length} problem${errors.length > 1 ? 's' : ''}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('Content check passed: src/content/home.json');
