# GraphQL
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
import asyncio

# Pandas
import pandas as pd


# # Plotly
# from plotly.offline import iplot, init_notebook_mode
# import plotly.express as px
# import plotly.io as pio
# init_notebook_mode(connected=True)

# Stdlib
from pathlib import Path
import string
import json

# # Plotly config
# pio.templates.default = "ggplot2"
# PX_DEFAULT_HEIGHT = 800

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="https://fanworks.wanderinginn.com/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)


def save_data_to_json(path: Path, filename: str, data: dict):
    Path.mkdir(path, exist_ok=True)
    with open(Path(path, filename), "w", encoding="utf-8") as f:
        f.write(json.dumps(data))


async def get_all_tag_data():
    first_chars = string.ascii_lowercase + string.digits
    tag_data = []
    for c in first_chars:
        tag_query = gql(
            """
            query GetArtistTags {
            """
            + """
                tags(limit: 10000, search: "{c}")
            """.format(
                c=c
            )
            + """{
                  tag,
                  uses
                }
            }
            """
        )
        print(f'Fetching tag data for tags starting with "{c}"...')
        c_tags = await client.execute_async(tag_query)
        c_tag_data = c_tags["tags"]
        tag_data += c_tag_data

    return tag_data


def get_posts_data():
    posts_query = gql(
        """
        query GetPosts {
            posts(limit: 10000, offset: 0) {
              post_id,
              posted,
              image_link,
              mime,
              ext,
              info,
              locked,
              height,
              width,
              filesize,
              source,
              tags,
            }
        }
        """
    )
    print("Fetching posts data...")

    return client.execute_async(posts_query)


if __name__ == "__main__":
    data_path = Path("stats/data")

    # Posts
    posts = asyncio.run(get_posts_data())
    save_data_to_json(data_path, "posts.json", posts)
    print(f"> Posts data saved to {data_path}")

    # Tags
    tags = pd.DataFrame(asyncio.run(get_all_tag_data()))

    # Artist tags
    artist_tags = tags.query("tag.str.startswith('artist:') & uses > 10")
    artist_tags.to_json(Path(data_path, "artist_tags.json"))
    print(f"> Artist tag data saved to {data_path}")

    # Character tags
    character_tags = tags.query("tag.str.startswith('character:') & uses > 10")
    character_tags.to_json(Path(data_path, "character_tags.json"))
    print(f"> Character tag data saved to {data_path}")

    # Book tags
    book_tags = tags.query("tag.str.startswith('spoiler:book')")
    book_tags.to_json(Path(data_path, "book_tags.json"))
    print(f"> Book tag data saved to {data_path}")

    # Volume tags
    volume_tags = tags.query(
        "tag.str.startswith('spoiler:volum') or tag == 'spoiler:book1' or tag == 'spoiler:book2'"
    )
    volume_tags.to_json(Path(data_path, "volume_tags.json"))
    print(f"> Volume tag data saved to {data_path}")
