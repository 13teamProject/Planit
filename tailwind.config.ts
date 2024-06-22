import type { Config } from 'tailwindcss';

const createPxMap = (size: number): Record<string, string> => {
  return Array.from({ length: size + 1 }, (_, i) => `${i}px`).reduce(
    (acc, val, i) => {
      acc[i] = val;
      return acc;
    },
    {} as Record<string, string>,
  );
};

const PX_10 = createPxMap(10);
const PX_100 = createPxMap(100);
const PX_500 = createPxMap(500);
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: PX_10,
      borderRadius: PX_100,
      fontSize: PX_100,
      lineHeight: PX_100,
      minWidth: PX_500,
      minHeight: PX_500,
      spacing: PX_500,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black-900': '#171717',
        'black-800': '#333236',
        'black-700': '#4B4B4B',
        'gray-400': '#787486',
        'gray-300': '#9FA6B2',
        'gray-200': '#D9D9D9',
        'gray-100': '#EEEEEE',
        'gray-50': '#FAFAFA',
        'toss-blue': '#0064FF',
        'toss-blue-light': '#DAE9FE',
        'toss-gray': '#202632',
        'violet-dashboard': '#5534DA',
        'violet-light-dashboard': '#F1EFFD',
        'red-dashboard': '#D6173A',
        'green-dashboard': '#7AC555',
        'purple-dashboard': '#7AC555',
        'orange-dashboard': '#FFA500',
        'blue-dashboard': '#76A5EA',
        'pink-dashboard': '#E876EA',
        'green-chip': '#86D549',
        'green-light-chip': '#E7F7DB',
        'orange-chip': '#D58D49',
        'orange-light-chip': '#F9EEE3',
        'pink-chip': '#D549B6',
        'pink-light-chip': '#F7DBF0',
        'blue-chip': '#4981D5',
        'blue-light-chip': '#DBE6F7',
        'red-chip': '#D04D65',
        'red-light-chip': '#FBDAE0',
        'purple-chip': '#994EE5',
        'purple-light-chip': '#F0E2FF',
      },
    },
  },
  plugins: [],
};

export default config;
