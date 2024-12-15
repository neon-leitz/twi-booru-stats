import * as Config from "../default_config.js"

fetch("../../js/data/post_filesizes.json")
.then(res => res.json())
.then(filesizes => {
  let data = {
    x: filesizes,
    marker: {
      color: Config.default_bar_colors_long.reverse(),
    },
    hoverfont: {
      family: "Courier New, monospace",
      size: 24,
    },
    hovertemplate: "Filesize: <b>%{x}</b><br>Post count: <b>%{y}</b><extra></extra>",
    nbinsx: 100,
    type: "histogram",
  }
  data = [data];

  let layout = Config.default_layout;
  layout["title"]["text"] = "Post File Size"

  Plotly.newPlot("chart", data, layout, {
    displaylogo: false,
    displayModeBar: true,
    responsive: true,
  });
});
