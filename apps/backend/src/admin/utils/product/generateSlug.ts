/**
 * Генерує SEO-дружній slug із будь-якого тексту.
 * Автоматично визначає, якщо є кирилиця → робить транслітерацію українською.
 *
 * @example
 * generateSlug("Чохол iPhone 12 Pro Max") // "chokhol-iphone-12-pro-max"
 * generateSlug("Case for iPhone 15 Pro")  // "case-for-iphone-15-pro"
 */
export const generateSlug = (name: string): string => {
  if (!name) return '';

  // 1️⃣ Нормалізуємо і зменшуємо регістр
  let text = name.toLowerCase().trim();

  // 2️⃣ Якщо містить кирилицю — робимо транслітерацію
  const hasCyrillic = /[а-яґєіїё]/i.test(text);

  if (hasCyrillic) {
    const map: Record<string, string> = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'h',
      ґ: 'g',
      д: 'd',
      е: 'e',
      є: 'ye',
      ж: 'zh',
      з: 'z',
      и: 'y',
      і: 'i',
      ї: 'yi',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'kh',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'shch',
      ь: '',
      ю: 'yu',
      я: 'ya',
      ё: 'yo',
    };

    text = text
      .split('')
      .map((ch) => map[ch] ?? ch)
      .join('');
  }

  // 3️⃣ Видаляємо все, що не букви/цифри/дефіси/пробіли
  return text
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
