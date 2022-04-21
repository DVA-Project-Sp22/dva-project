import json
import awswrangler as wr


def lambda_handler(event, context):
    # TODO implement
    df = wr.athena.read_sql_query(
        sql="""
                                SELECT track_id
                                    ,   song_title
                                    ,   artist_name
                                    ,   spotify_id
                                    ,   0 as duration
                                    ,   loudness
                                    ,   tempo
                                    ,   artist_familiarity
                                    ,   0 as artist_hotness
                                FROM songdata
                                LIMIT 10
                                """,
        database="millionsongdataset",
    )
    results = df.to_json(orient="records")
    parsed = json.loads(results)
    x = {"songs": parsed}
    return {"statusCode": 200, "body": json.dumps(x)}
