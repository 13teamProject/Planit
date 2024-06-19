import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      black_000000: '#000000',
      black_171717: '#171717',
      black_333236: '#333236',
      black_4B4B4B: '#4B4B4B',
      gray_787486: '#787486',
      gray_9FA6B2: '#9FA6B2',
      gray_D9D9D9: '#D9D9D9',
      gray_EEEEEE: '#EEEEEE',
      gray_FAFAFA: '#FAFAFA',
      white_FFFFFF: '#FFFFFF',
      toss_blue: '#0064FF',
      toss_blue_8: '#DAE9FE',
      toss_gray: '#202632',
      violet_5534DA: '#5534DA',
      violet_8: '#F1EFFD',
      red_D6173A: '#D6173A',
      green_7AC555: '#7AC555',
      purple_760DDE: '#7AC555',
      orange_FFA500: '#FFA500',
      blue_76A5EA: '#76A5EA',
      pink_E876EA: '#E876EA',
      chip_green: '#86D549',
      chip_green_bg: '#E7F7DB',
      chip_orange: '#D58D49',
      chip_orange_bg: '#F9EEE3',
      chip_pink: '#D549B6',
      chip_pink_bg: '#F7DBF0',
      chip_blue: '#4981D5',
      chip_blue_bg: '#DBE6F7',
      chip_red: '#D04D65',
      chip_red_bg: '#FBDAE0',
      chip_purple: '#994EE5',
      chip_purple_bg: '#F0E2FF',
    },
  },
  plugins: [],
};
export default config;
