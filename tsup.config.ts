import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    collections: 'src/collections/index.ts',
    logical: 'src/logical/index.ts',
    numerical: 'src/numerical/index.ts',
    positional: 'src/positional/index.ts',
    transformations: 'src/transformations/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  target: 'es2022',
});
