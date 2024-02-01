# GraphQL
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
import asyncio

# Pandas
import pandas as pd

# Stdlib
from pathlib import Path
import string
import json

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


def get_post_counts_per_day(posts_df: pd.DataFrame):
    day_grouper = pd.Grouper(key="posted", freq="D")
    return posts_df.groupby(day_grouper)["post_id"].count()


def get_post_counts_per_month(posts_df: pd.DataFrame):
    month_grouper = pd.Grouper(key="posted", freq="ME")
    return posts_df.groupby(month_grouper)["post_id"].count()


if __name__ == "__main__":
    data_path = Path("stats/static/js/data")

    # Posts
    posts = asyncio.run(get_posts_data())

    posts_df = pd.DataFrame(posts["posts"])
    posts_df["posted"] = pd.to_datetime(posts_df["posted"], format="mixed")

    # Posts per day
    posts_per_day = get_post_counts_per_day(posts_df)
    posts_per_day_cumulative = posts_per_day.cumsum()
    posts_per_day.to_json(
        Path(data_path, "posts_per_day.json"), date_format="iso", indent=2
    )
    posts_per_day_cumulative.to_json(
        Path(data_path, "posts_per_day_cumulative.json"), date_format="iso", indent=2
    )

    # Posts by month
    posts_per_month = get_post_counts_per_month(posts_df)
    posts_per_month_cumulative = posts_per_month.cumsum()
    posts_per_month.to_json(
        Path(data_path, "posts_per_month.json"), date_format="iso", indent=2
    )
    posts_per_month_cumulative.to_json(
        Path(data_path, "posts_per_month_cumulative.json"), date_format="iso", indent=2
    )

    print(f"> Post data saved to {data_path}")

    # Tags
    tags = pd.DataFrame(asyncio.run(get_all_tag_data()))

    # Artist tags
    artist_tags = tags.query("tag.str.startswith('artist:')")
    artist_tags.sort_values("uses", ascending=False).set_index("tag").to_json(
        Path(data_path, "artist_tags.json"), indent=2
    )
    print(f"> Artist tag data saved to {data_path}")

    # Character tags
    character_tags = tags.query("tag.str.startswith('character:')")
    character_tags.sort_values("uses", ascending=False).set_index("tag").to_json(
        Path(data_path, "character_tags.json"), indent=2
    )
    print(f"> Character tag data saved to {data_path}")

    # Book tags
    book_tags = tags.query("tag.str.startswith('spoiler:book')")
    book_tags.sort_values("uses", ascending=False).set_index("tag").to_json(
        Path(data_path, "book_tags.json"), indent=2
    )
    print(f"> Book tag data saved to {data_path}")

    # Volume tags
    volume_tags = tags.query(
        "tag.str.startswith('spoiler:volum') or tag == 'spoiler:book1' or tag == 'spoiler:book2'"
    )
    volume_tags.sort_values("uses", ascending=False).set_index("tag").to_json(
        Path(data_path, "volume_tags.json"), indent=2
    )
    print(f"> Volume tag data saved to {data_path}")
