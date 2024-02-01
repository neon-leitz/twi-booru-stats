import * as Config from "../default_config.js"
import book_tags from "../data/book_tags.json" assert {type: "json"};

let data = {
  y: Object.keys(book_tags["uses"]).slice(0, 30).reverse(),
  x: Object.values(book_tags["uses"]).slice(0, 30).reverse(),
  marker: {
    color: Config.default_bar_colors_medium,
  },
  type: "bar",
  orientation: "h",
}
data = [data];

let layout = Config.default_layout;
layout["title"]["text"] = "(e)Book Tags";

Plotly.newPlot("chart", data, layout, {
  displaylogo: false,
  displayModeBar: true,
  responsive: true,
});
