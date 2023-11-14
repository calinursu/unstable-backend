export type TranslationsType = {
  [key: string]: string;
};

export default async function translations<
  TranslationsType
>(): Promise<TranslationsType> {
  const response = await fetch(
    "https://calinursu.github.io/data/translations.json"
  );
  const data: TranslationsType = await response.json();

  return data;
}
