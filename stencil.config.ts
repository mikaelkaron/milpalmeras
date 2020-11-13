import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
  taskQueue: 'async',
  namespace: 'v4f',
  devServer: {
    openBrowser: false,
  },
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
    },
    {
      type: 'docs-readme',
    },
  ],
};
