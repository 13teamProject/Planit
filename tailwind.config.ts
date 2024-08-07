import type { Config } from 'tailwindcss';

const createPxMap = (size: number): Record<string, string> =>
  Array.from({ length: size + 1 }, (_, i) => `${i}px`).reduce(
    (acc, val, i) => {
      acc[i] = val;
      return acc;
    },
    {} as Record<string, string>,
  );

const PX_10 = createPxMap(10);
const PX_100 = createPxMap(100);
const PX_2000 = createPxMap(2000);

const TAG_COLORS = [
  'bg-zinc-900',
  'text-gray-50',
  'bg-gray-200',
  'text-zinc-900',
  'bg-pink-light-chip',
  'text-pink-chip',
  'bg-red-light-chip',
  'text-red-chip',
  'bg-orange-light-chip',
  'text-orange-chip',
  'bg-yellow-300',
  'text-yellow-600',
  'bg-green-light-chip',
  'text-green-chip',
  'bg-emerald-300',
  'text-emerald-600',
  'bg-teal-300',
  'text-teal-600',
  'bg-cyan-300',
  'text-cyan-600',
  'bg-toss-blue-light',
  'text-toss-blue',
  'bg-blue-light-chip',
  'text-blue-chip',
  'bg-indigo-300',
  'text-indigo-600',
  'bg-purple-light-chip',
  'text-purple-chip',
  'bg-violet-300',
  'text-violet-600',
];

const PROFILE_COLORS = [
  'bg-[#ffc85a]',
  'bg-[#fdd446]',
  'bg-[#9dd7ed]',
  'bg-[#c4b1a2]',
  'bg-[#f4d7da]',
  'bg-[#a3c4a2]',
  'bg-teal-400',
  'bg-violet-400',
  'bg-blue-400',
  'bg-red-400',
];

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  safelist: [...TAG_COLORS, ...PROFILE_COLORS],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--nexonGothicFont)'],
        serif: ['var(--nexonGothicFont)'],
      },
      borderWidth: PX_10,
      borderRadius: PX_100,
      fontSize: PX_100,
      lineHeight: PX_100,
      minWidth: PX_2000,
      minHeight: PX_2000,
      spacing: PX_2000,
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
      screens: {
        sm: { min: '375px' },
        md: { min: '744px' },
        lg: { min: '1200px' },
        landing: { min: '1200px', max: '1670px' },
      },
      noScrollbar: {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      },
    },
  },
  plugins: [],
};

export default config;
