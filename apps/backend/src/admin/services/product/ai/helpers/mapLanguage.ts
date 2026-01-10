export type LanguageCode = 'uk' | 'en';

export const LANGUAGE_MAP: Record<
  LanguageCode,
  {
    name: string;
    forbiddenRegex: RegExp;
  }
> = {
  uk: {
    name: 'Ukrainian',
    forbiddenRegex: /[a-zA-Z]{3,}/,
  },
  en: {
    name: 'English',
    forbiddenRegex: /[а-яА-ЯіїєґІЇЄҐ]{3,}/,
  },
};

export const buildSystemLanguageMessage = (language: LanguageCode): string => {
  const config = LANGUAGE_MAP[language];

  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  return `
You MUST write the response strictly in ${config.name}.
Do NOT mix languages.
If input data is in another language, translate internally but OUTPUT ONLY ${config.name}.
If you cannot comply, return an empty response.
`.trim();
};
