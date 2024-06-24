import * as Config from "../default_config.js"

fetch("/js/data/post_filetypes.json")
.then(res => res.json())
.then(post_filetypes => {
  let data = {
    x: Object.values(post_filetypes),
    y: Object.keys(post_filetypes),
    marker: {
      color: Config.default_bar_colors_short,
    },
    text: Object.values(post_filetypes),
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
  layout["title"]["text"] = "Post Filetypes"

  Plotly.newPlot("chart", data, layout, {
    displaylogo: false,
    displayModeBar: true,
    responsive: true,
  });
});
