export async function fetch_json_data(url) {
  return await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status );
      }
      return response.json();
    })
}
