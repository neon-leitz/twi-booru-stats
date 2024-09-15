import * as Config from "../default_config.js"

fetch("../../js/data/character_tags.json")
.then(res => res.json())
.then(character_tags => {
  let data = {
    x: Object.values(character_tags["uses"]).slice(0, 25).reverse(),
    y: Object.keys(character_tags["uses"]).slice(0, 25).reverse(),
    marker: {
      color: Config.default_bar_colors,
    },
    textfont: {
      family: "Courier New, monospace",
      size: 24,
    },
    texttemplate: " <b>%{value}</b> ",
    type: "bar",
    orientation: "h",
  }
  data = [data];

  let layout = Config.default_layout;
  layout["title"]["text"] = "Character Tags";

  Plotly.newPlot("chart", data, layout, {
    displaylogo: false,
    displayModeBar: true,
    responsive: true,
  });
});
