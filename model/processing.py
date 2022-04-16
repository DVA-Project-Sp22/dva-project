import pandas as pd
import os
from sklearn.cluster import KMeans


def add_cluster_id(df):

    max_cluster_size = 25
    k = int(len(df) / max_cluster_size)

    print("Processing Data")
    data = df[["loudness", "tempo", "artist_familiarity"]].to_numpy()

    print("Run KMeans")
    results = KMeans(n_clusters=k, random_state=42).fit(data)

    print("Combining Data")

    results_df = (
        df[
            [
                "track_id",
                "song_title",
                "artist_name",
                "spotify_id",
                "profanity_pct",
                "profanity_flag",
            ]
        ]
        .join(pd.DataFrame(data, columns=["loudness", "tempo", "artist_familiarity"]))
        .join(pd.DataFrame(results.labels_, columns=["cluster_id"]))
    )

    return results_df, results.cluster_centers_


print("Pulling CSV")

data_csv = os.path.join("opt", "ml", "processing", "input", "songdata.csv")

print("Creating Dataframe")

data = pd.read_csv(data_csv)

print(data.shape)

print("Running Kmeans")

clustered_df, centers = add_cluster_id(data)

centers_df = pd.DataFrame(centers, columns=["loudness", "tempo", "artist_familiarity"])

try:
    print("Creating Directory")
    os.makedirs("/opt/ml/processing/output")
    print("Successfully created directory")
except Exception as e:
    print(e)
    print("Could not make directory")
    pass

try:
    print("Saving Files")
    output_path = os.path.join("opt", "ml", "processing", "output", "songdata.csv")
    centers_path = os.path.join("opt", "ml", "processing", "output", "centers.csv")
    clustered_df.to_csv(output_path, index=False)
    centers_df.to_csv(centers_path, index=False)
    print("File Successfully Written")
except Exception as e:
    print("Could Not Write the File")
    print(e)
    pass

print("Finished running processing job")
