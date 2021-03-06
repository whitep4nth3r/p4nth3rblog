export default class OpenGraph {
  static getRandomTheme() {
    const themes = ["light", "dark"];
    return themes[Math.floor(Math.random() * themes.length)];
  }

  static getRandomPanther() {
    const panthers = [
      "cool",
      "coffee",
      "dolla",
      "fire",
      "heart",
      "lol",
      "majick",
      "pewpew",
      "rap",
      "star",
      "tattoo",
    ];
    return panthers[Math.floor(Math.random() * panthers.length)];
  }

  static getBaseImageEncodedUri() {
    return encodeURIComponent(
      "https://p4nth3rlabs.netlify.app/assets/svgs/panthers/",
    );
  }

  static generateImageUrl(title) {
    return `https://p4nth3rblog-og-image.vercel.app/${encodeURI(
      title,
    )}.png?theme=${OpenGraph.getRandomTheme()}&md=0fontSize=80px&images=${OpenGraph.getBaseImageEncodedUri()}${OpenGraph.getRandomPanther()}.svg`;
  }
}
