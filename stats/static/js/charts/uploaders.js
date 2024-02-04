import * as Config from "../default_config.js"
import uploader_counts from "../data/post_uploader_counts.json" assert {type: "json"};

let data = {
  y: Object.keys(uploader_counts).slice(0, 20).reverse(),
  x: Object.values(uploader_counts).slice(0, 20).reverse(),
  marker: {
    color: Config.default_bar_colors_medium,
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
layout["title"]["text"] = "Uploaders";
layout["xaxis"]["title"] = { text: "Upload counts" };
layout["yaxis"]["title"] = { text: "Uploader", standoff: 50 };
layout["yaxis"]["automargin"] = true;

Plotly.newPlot("chart", data, layout, {
  displaylogo: false,
  displayModeBar: true,
  responsive: true,
});
