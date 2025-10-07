import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Add path aliases support
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }

    // Ensure proper CSS processing for TailwindCSS v4
    if (config.module && config.module.rules) {
      // Find existing CSS rule and modify it
      const cssRuleIndex = config.module.rules.findIndex((rule: any) => {
        return rule.test && rule.test.toString().includes('.css');
      });

      if (cssRuleIndex !== -1) {
        config.module.rules[cssRuleIndex] = {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, '../postcss.config.mjs'),
                },
              },
            },
          ],
        };
      } else {
        // Add CSS rule if it doesn't exist
        config.module.rules.push({
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, '../postcss.config.mjs'),
                },
              },
            },
          ],
        });
      }
    }

    return config;
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
export default config;
