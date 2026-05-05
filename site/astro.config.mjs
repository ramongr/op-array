// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://ramongr.github.io',
  base: '/op-array',
  integrations: [
    starlight({
      title: 'op-array',
      description:
        'A small, tree-shakable functional utility library that fills the gaps in JavaScript\u2019s built-in Array API.',
      social: {
        github: 'https://github.com/ramongr/op-array',
      },
      sidebar: [
        {
          label: 'API',
          items: [
            { label: 'Collections', link: '/collections/' },
            { label: 'Logical', link: '/logical/' },
            { label: 'Numerical', link: '/numerical/' },
            { label: 'Positional', link: '/positional/' },
            { label: 'Transformations', link: '/transformations/' },
          ],
        },
        {
          label: 'Project',
          items: [
            { label: 'Changelog', link: '/changelog/' },
            { label: 'Release process', link: '/contributing/release/' },
          ],
        },
      ],
      lastUpdated: true,
    }),
  ],
});
