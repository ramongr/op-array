#!/usr/bin/env node
// Syncs source-of-truth markdown from the repo root into the Starlight
// content collection. Source files in docs/ and CHANGELOG.md remain the
// authoritative versions; copies under site/src/content/docs/ are generated
// at build time and should not be edited by hand.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, '..');
const repoRoot = resolve(siteRoot, '..');
const contentRoot = resolve(siteRoot, 'src/content/docs');

const editBase = 'https://github.com/ramongr/op-array/edit/main';

/** @type {Array<{ src: string, dest: string, title: string, description: string }>} */
const pages = [
  {
    src: 'docs/collections.md',
    dest: 'collections.md',
    title: 'Collections',
    description: 'Lookup, grouping, and projection helpers for collections.',
  },
  {
    src: 'docs/logical.md',
    dest: 'logical.md',
    title: 'Logical',
    description: 'Existence and membership predicates.',
  },
  {
    src: 'docs/numerical.md',
    dest: 'numerical.md',
    title: 'Numerical',
    description: 'Aggregations and statistics over numeric arrays.',
  },
  {
    src: 'docs/positional.md',
    dest: 'positional.md',
    title: 'Positional',
    description: 'Index- and position-based selection helpers.',
  },
  {
    src: 'docs/transformations.md',
    dest: 'transformations.md',
    title: 'Transformations',
    description: 'Pure transformations: shape changes, copies, and folds.',
  },
  {
    src: 'docs/release.md',
    dest: 'contributing/release.md',
    title: 'Release process',
    description: 'How op-array versions get cut, tagged, and published.',
  },
  {
    src: 'CHANGELOG.md',
    dest: 'changelog.md',
    title: 'Changelog',
    description: 'Release notes for op-array.',
  },
];

/**
 * @param {string} title
 * @param {string} description
 * @param {string} editUrl
 */
function frontmatter(title, description, editUrl) {
  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `editUrl: ${JSON.stringify(editUrl)}`,
    '---',
    '',
    '',
  ].join('\n');
}

/**
 * Strip a leading H1 from the body to avoid duplicating Starlight's page
 * title heading. Only removes the first heading if it's the very first
 * non-blank line.
 *
 * @param {string} body
 */
function stripLeadingH1(body) {
  const lines = body.split('\n');
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  if (i < lines.length && /^#\s+/.test(lines[i])) {
    lines.splice(i, 1);
    while (i < lines.length && lines[i].trim() === '') {
      lines.splice(i, 1);
    }
  }
  return lines.join('\n');
}

/**
 * @param {(typeof pages)[number]} page
 */
async function syncOne(page) {
  const srcPath = resolve(repoRoot, page.src);
  const destPath = resolve(contentRoot, page.dest);
  const raw = await readFile(srcPath, 'utf8');
  const body = stripLeadingH1(raw);
  const editUrl = `${editBase}/${page.src}`;
  const out = frontmatter(page.title, page.description, editUrl) + body;
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, out, 'utf8');
}

async function main() {
  // Wipe synced files (preserve hand-authored index.mdx and any future
  // site-only pages).
  for (const page of pages) {
    const destPath = resolve(contentRoot, page.dest);
    await rm(destPath, { force: true });
  }

  await Promise.all(pages.map(syncOne));
  console.log(`synced ${pages.length} pages into ${contentRoot}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
