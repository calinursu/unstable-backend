type Data = {
  isDown: boolean;
  errorProductCodes: string[];
};

export default async function regenerate() {
  const response = await fetch(
    "https://calinursu.github.io/data/feature-toggles.json"
  );
  const data: Data = await response.json();

  const timeString = new Date().toLocaleString("da-DK", {
    timeZone: "CET",
  });

  return { data, lastRegenerationTime: timeString.split(" ")[1] };
}
