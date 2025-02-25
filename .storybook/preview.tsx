import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/shared/styles/index.scss';
import { ThemeProvider } from '../src/app/providers/ThemeProvider';
import GlobalSvgSprite from '../src/shared/ui/GlobalSvgSprite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <GlobalSvgSprite />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
