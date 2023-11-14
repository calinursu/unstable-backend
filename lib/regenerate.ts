type Data = {
  isDown: boolean;
  errorProductCodes: string[];
};

export default async function regenerate() {
  const timeString = new Date().toLocaleString("da-DK", {
    timeZone: "CET",
  });

  const response = await fetch(
    "https://calinursu.github.io/data/feature-toggles.json"
  );
  const data: Data = await response.json();

  return { data, lastRegenerationTime: timeString.split(" ")[1] };
}
