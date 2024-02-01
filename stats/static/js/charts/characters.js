import * as Config from "../default_config.js"
import character_tags from "../data/character_tags.json" assert {type: "json"};

let data = {
  x: Object.values(character_tags["uses"]).slice(0, 30).reverse(),
  y: Object.keys(character_tags["uses"]).slice(0, 30).reverse(),
  marker: {
    color: Config.default_bar_colors,
  },
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


