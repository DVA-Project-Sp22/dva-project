import json
import awswrangler as wr
import numpy as np


def lambda_handler(event, context):
    # TODO implement

    def song_recommender(user_input, rec_count=10):
        t = tuple(user_input)
        query = f"select distinct cluster_id from clusteredsongs where track_id IN {t}"

        user_input_idx = wr.athena.read_sql_query(
            sql=query, database="millionsongdataset"
        ).values.tolist()

        dist_matrix = wr.athena.read_sql_query(
            sql="select * from distances", database="millionsongdataset"
        ).to_numpy()

        user_songs = []

        for j in user_input_idx:
            user_song_dist = dist_matrix[j].flatten(order="C")
            user_songs.append(user_song_dist)

        user_songs_mean = np.mean(np.array(user_songs), axis=0)

        ind = np.argpartition(user_songs_mean, -10)[-10:]

        cluster_density = wr.athena.read_sql_query(
            sql="select cluster_id, count(*) as count from clusteredsongs group by cluster_id",
            database="millionsongdataset",
        )

        vals = 1
        for i in ind:
            if int(cluster_density[cluster_density["cluster_id"] == i]["count"]) < 10:
                vals += 1
            else:
                break

        selected_clusters = list(ind[0:vals])

        tsc = tuple(selected_clusters)

        if len(tsc) == 1:
            result_query = f"""
                            SELECT track_id
                                    ,   song_title
                                    ,   artist_name
                                    ,   spotify_id
                                    ,   0 as duration
                                    ,   loudness
                                    ,   tempo
                                    ,   artist_familiarity
                                    ,   0 as artist_hotness
                                FROM clusteredsongs
                            WHERE cluster_id = {tsc[0]}
                            """
        else:
            result_query = f"""
                        SELECT track_id
                                    ,   song_title
                                    ,   artist_name
                                    ,   spotify_id
                                    ,   0 as duration
                                    ,   loudness
                                    ,   tempo
                                    ,   artist_familiarity
                                    ,   0 as artist_hotness
                                FROM clusteredsongs
                            WHERE cluster_id in {tsc}
                            """

        result = wr.athena.read_sql_query(
            sql=result_query, database="millionsongdataset"
        ).head(10)

        return result.to_json(orient="records")

    dl = json.loads(event["body"])["dislikedSongs"]

    # dl = ["TRSVZFO128F4294EAA","TRSVZGB128EF34463A","TRSVZGB128EF34463A"]

    parsed = json.loads(song_recommender(dl))
    x = {"request": event, "songs": parsed, "disliked": dl}
    return {
        "statusCode": 200,
        "body": json.dumps(x),
    }

