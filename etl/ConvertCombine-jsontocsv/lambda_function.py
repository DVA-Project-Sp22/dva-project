import boto3
import json
import os
import pandas as pd


def message_processing(body):
    bucket = body["bucket"]
    files = body["files"]
    csv_name = body["fileName"]
    finalFileName = os.path.join("/tmp", csv_name)

    combined_df = pd.DataFrame(
        {"song_id": pd.Series(dtype="str"), "spotify_id": pd.Series(dtype="str")}
    )

    s3 = boto3.resource("s3")

    for file_name in files:
        content_object = s3.Object(bucket, file_name)
        file_content = content_object.get()["Body"].read().decode("utf-8")
        json_content = json.loads(file_content)
        spotify_id = None

        if len(json_content["response"]["songs"]) > 0:

            track_info = json_content["response"]["songs"][0]["tracks"]

            song_id = json_content["response"]["songs"][0]["id"]

            for track in track_info:
                if track["catalog"] == "spotify":
                    spotify_id = track["foreign_id"]
                    break
        else:
            song_id = file_name.split("/")[-1].split(".")[0]

        song_df = pd.DataFrame({"song_id": song_id,
                                "spotify_id": spotify_id}, index=[0])

        combined_df = pd.concat([combined_df, song_df], axis=0).reset_index(drop=True)

    combined_df.to_csv(finalFileName, index=False)

    s3Client = boto3.client("s3")

    s3Client.upload_file(
        finalFileName, "millionsongdataset-intermediate", "spotify/" + csv_name
    )

    os.remove(finalFileName)


def lambda_handler(event, context):

    for record in event["Records"]:

        body = json.loads(record["body"])

        message_processing(body)

    return {"statusCode": 200, "body": event}
