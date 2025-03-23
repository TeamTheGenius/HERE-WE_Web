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
      if (!document.getElementById('modal')) {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        document.body.appendChild(modalRoot);
      }
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
