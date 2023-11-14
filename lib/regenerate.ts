export default async function regenerate() {
  const timeString = new Date().toLocaleString("da-DK", {
    timeZone: "CET",
  });

  const response = await fetch(
    "https://calinursu.github.io/data/feature-toggles.json"
  );
  const feature = await response.json();

  return { feature, lastRegenerationTime: timeString.split(" ")[1] };
}
