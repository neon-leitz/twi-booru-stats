import * as Config from "../default_config.js"
import { fetch_json_data } from "../utils.js"
let posts_by_day = await fetch_json_data("../data/posts_per_day.json")
let posts_by_day_cumulative = await fetch_json_data("../data/posts_per_day_cumulative.json")
let base_counts = {
  x: Object.keys(posts_by_day).slice(1),
  y: Object.values(posts_by_day).slice(1),
  marker: {
    color: "#56D481",
  },
  name: "Upload count",
  type: "scatter",
}

let cumulative_counts = {
  x: Object.keys(posts_by_day_cumulative),
  y: Object.values(posts_by_day_cumulative),
  marker: {
    color: "#4C7EE1",
  },
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

