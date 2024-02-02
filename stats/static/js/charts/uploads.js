import * as Config from "../default_config.js"
import posts_by_day from "../data/posts_per_day.json" assert {type: "json"};
import posts_by_day_cumulative from "../data/posts_per_day_cumulative.json" assert {type: "json"};
let base_counts = {
  x: Object.keys(posts_by_day).slice(1),
  y: Object.values(posts_by_day).slice(1),
  marker: {
    color: "#56D481",
  },
  hovertemplate: "Date: %{x}<br>" +
                 "Uploads: %{y}",
  name: "Upload count",
  type: "scatter",
}

let cumulative_counts = {
  x: Object.keys(posts_by_day_cumulative),
  y: Object.values(posts_by_day_cumulative),
  marker: {
    color: "#4C7EE1",
  },
  hovertemplate: "Date: %{x}<br>" +
                 "Total Uploads: %{y}",
  fill: "tozeroy",
  name: "Total upload count",
  type: "scatter",
  showlegend: true,
}

let data = [base_counts, cumulative_counts];

let layout = Config.default_layout;
layout["showlegend"] = true;

Plotly.newPlot("chart", data, layout, {
  displaylogo: false,
  responsive: true,
});

