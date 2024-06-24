import * as Config from "../default_config.js"

let volume_tags = await fetch("/js/data/volume_tags.json").then(res => res.json());

let data = {
  y: Object.keys(volume_tags["uses"]).reverse(),
  x: Object.values(volume_tags["uses"]).reverse(),
  marker: {
    color: Config.default_bar_colors_short,
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
layout["title"]["text"] = "Volume Tags<br><sub>Note that the first two volumes correspond to their book tags</sub>"

Plotly.newPlot("chart", data, layout, {
  displaylogo: false,
  displayModeBar: true,
  responsive: true,
});
