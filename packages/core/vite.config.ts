import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AgentArtsEditor',
      fileName: (format) => `editor.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        '@codemirror/state',
        '@codemirror/view',
        '@codemirror/commands',
        '@codemirror/lang-markdown',
        '@codemirror/language-data',
      ],
      output: {
        globals: {
          '@codemirror/state': 'CMState',
          '@codemirror/view': 'CMView',
          '@codemirror/commands': 'CMCommands',
          '@codemirror/lang-markdown': 'CMLangMarkdown',
          '@codemirror/language-data': 'CMLangData',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      include: ['src/**/*.ts'],
    }),
  ],
});
