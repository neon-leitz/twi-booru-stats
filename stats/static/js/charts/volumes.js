import * as Config from "../default_config.js"
import { fetch_json_data } from "../utils.js"

let volume_tags = await fetch_json_data("/data/volume_tags.json");

let data = {
  y: Object.values(volume_tags["tag"]).slice(0, 25).reverse(),
  x: Object.values(volume_tags["uses"]).slice(0, 25).reverse(),
  marker: {
    color: Config.default_bar_colors_short,
  },
  type: "bar",
  orientation: "h",
}
data = [data];

let layout = Config.default_layout;
layout["title"]["text"] = "Volume Tags<br><sub>Note that the first two volumes correspond to their book tags</sub>"

Plotly.newPlot("chart", data, layout, {
  displaylogo: false,
  displayModeBar: true,
  responsive: true,
});
