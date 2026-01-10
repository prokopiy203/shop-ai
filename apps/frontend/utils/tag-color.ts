// utils/tag-colors.ts

export type TagColorVariant = {
  base: string;
  hover: string;
};

const TAG_COLOR_VARIANTS: readonly [...TagColorVariant[], TagColorVariant] = [
  {
    base: "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100",
    hover:
      "hover:bg-sky-200 dark:hover:bg-sky-800/60 hover:text-sky-950 dark:hover:text-sky-50",
  },
  {
    base: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
    hover:
      "hover:bg-emerald-200 dark:hover:bg-emerald-800/60 hover:text-emerald-950 dark:hover:text-emerald-50",
  },
  {
    base: "bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-100",
    hover:
      "hover:bg-violet-200 dark:hover:bg-violet-800/60 hover:text-violet-950 dark:hover:text-violet-50",
  },
  {
    base: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
    hover:
      "hover:bg-amber-200 dark:hover:bg-amber-800/60 hover:text-amber-950 dark:hover:text-amber-50",
  },
  {
    base: "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100",
    hover:
      "hover:bg-rose-200 dark:hover:bg-rose-800/60 hover:text-rose-950 dark:hover:text-rose-50",
  },
  {
    base: "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-100",
    hover:
      "hover:bg-indigo-200 dark:hover:bg-indigo-800/60 hover:text-indigo-950 dark:hover:text-indigo-50",
  },
  {
    base: "bg-teal-100 text-teal-900 dark:bg-teal-900/40 dark:text-teal-100",
    hover:
      "hover:bg-teal-200 dark:hover:bg-teal-800/60 hover:text-teal-950 dark:hover:text-teal-50",
  },
] as const;

const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

export const getTagClasses = (tag: string): string => {
  const index = hashString(tag) % TAG_COLOR_VARIANTS.length;
  const variant: TagColorVariant =
    TAG_COLOR_VARIANTS[index] ?? TAG_COLOR_VARIANTS[0];

  return [
    variant.base,
    variant.hover,
    "border border-black/5 dark:border-white/10",
    "transition-colors duration-150 ease-out",
    "select-none",
  ].join(" ");
};

export const getTagClassesMap = (
  tags: readonly string[]
): Record<string, string> => {
  return Object.fromEntries(tags.map((tag) => [tag, getTagClasses(tag)]));
};
