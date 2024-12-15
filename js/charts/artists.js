import * as Config from "../default_config.js"

fetch("../../js/data/artist_tags.json")
.then(res => res.json())
.then(artist_tags => {
  let data = {
    y: Object.keys(artist_tags["uses"]).slice(0, 25).reverse(),
    x: Object.values(artist_tags["uses"]).slice(0, 25).reverse(),
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
  layout["title"]["text"] = "Artist Tags"

  Plotly.newPlot("chart", data, layout, {
    displaylogo: false,
    displayModeBar: true,
    responsive: true,
  });
});
