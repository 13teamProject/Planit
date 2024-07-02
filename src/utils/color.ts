/* eslint-disable no-bitwise */

function stringToColor(str: string, predefinedColors: string[]) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  hash = (hash * 0x45d9f3b) ^ (hash >> 16);

  const index = Math.abs(hash % predefinedColors.length);
  return predefinedColors[index];
}

const TAG_COLORS = [
  'bg-zinc-900 text-gray-50',
  'bg-gray-200 text-zinc-900',
  'bg-pink-light-chip text-pink-chip',
  'bg-red-light-chip text-red-chip',
  'bg-orange-light-chip text-orange-chip',
  'bg-yellow-300 text-yellow-600',
  'bg-green-light-chip text-green-chip',
  'bg-emerald-300 text-emerald-600',
  'bg-teal-300 text-teal-600',
  'bg-cyan-300 text-cyan-600',
  'bg-toss-blue-light text-toss-blue',
  'bg-blue-light-chip text-blue-chip',
  'bg-indigo-300 text-indigo-600',
  'bg-purple-light-chip text-purple-chip',
  'bg-violet-300 text-violet-600',
];

export function getTagColor(str: string) {
  return stringToColor(str, TAG_COLORS);
}
