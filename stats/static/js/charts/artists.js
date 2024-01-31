import * as Config from "../default_config.js"
import { fetch_json_data } from "../utils.js"
let artist_tags = await fetch_json_data("/data/artist_tags.json");

let data = {
  y: Object.values(artist_tags["tag"]).slice(0, 25).reverse(),
  x: Object.values(artist_tags["uses"]).slice(0, 25).reverse(),
  marker: {
    color: Config.default_bar_colors,
  },
  type: "bar",
  orientation: "h",
}
data = [data];

let layout = Config.default_layout;
layout["title"]["text"] = "Artist Tags"

Plotly.newPlot("chart", data, layout, {
  displaylogo: false,
  displayModeBar: true,
  responsive: true,
});
