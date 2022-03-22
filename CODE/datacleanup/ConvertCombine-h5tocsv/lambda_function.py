import boto3
import json
import os
import pandas as pd
import numpy as np
import h5py

def message_processing(body):
    file_name = body['fileName']
    files = body['files']
    bucket = body['bucket']
    finalFileName = os.path.join('/tmp', file_name)
    
    combined_df = pd.DataFrame(
    {
        "analysis_sample_rate": pd.Series(dtype="int"),
        "audio_md5": pd.Series(dtype="str"),
        "danceability": pd.Series(dtype="float"),
        "duration": pd.Series(dtype="float"),
        "end_of_fade_in": pd.Series(dtype="float"),
        "energy": pd.Series(dtype="float"),
        "idx_bars_confidence": pd.Series(dtype="int"),
        "idx_bars_start": pd.Series(dtype="int"),
        "idx_beats_confidence": pd.Series(dtype="int"),
        "idx_beats_start": pd.Series(dtype="int"),
        "idx_sections_confidence": pd.Series(dtype="int"),
        "idx_sections_start": pd.Series(dtype="int"),
        "idx_segments_confidence": pd.Series(dtype="int"),
        "idx_segments_loudness_max": pd.Series(dtype="int"),
        "idx_segments_loudness_max_time": pd.Series(dtype="int"),
        "idx_segments_loudness_start": pd.Series(dtype="int"),
        "idx_segments_pitches": pd.Series(dtype="int"),
        "idx_segments_start": pd.Series(dtype="int"),
        "idx_segments_timbre": pd.Series(dtype="int"),
        "idx_tatums_confidence": pd.Series(dtype="int"),
        "idx_tatums_start": pd.Series(dtype="int"),
        "key": pd.Series(dtype="int"),
        "key_confidence": pd.Series(dtype="float"),
        "loudness": pd.Series(dtype="float"),
        "mode": pd.Series(dtype="int"),
        "mode_confidence": pd.Series(dtype="float"),
        "start_of_fade_out": pd.Series(dtype="float"),
        "tempo": pd.Series(dtype="float"),
        "time_signature": pd.Series(dtype="int"),
        "time_signature_confidence": pd.Series(dtype="float"),
        "track_id": pd.Series(dtype="str"),
        "analyzer_version": pd.Series(dtype="str"),
        "artist_7digitalid": pd.Series(dtype="int"),
        "artist_familiarity": pd.Series(dtype="float"),
        "artist_hotttnesss": pd.Series(dtype="float"),
        "artist_id": pd.Series(dtype="str"),
        "artist_latitude": pd.Series(dtype="float"),
        "artist_location": pd.Series(dtype="str"),
        "artist_longitude": pd.Series(dtype="float"),
        "artist_mbid": pd.Series(dtype="str"),
        "artist_name": pd.Series(dtype="str"),
        "artist_playmeid": pd.Series(dtype="int"),
        "genre": pd.Series(dtype="str"),
        "idx_artist_terms": pd.Series(dtype="int"),
        "idx_similar_artists": pd.Series(dtype="int"),
        "release": pd.Series(dtype="str"),
        "release_7digitalid": pd.Series(dtype="int"),
        "song_hotttnesss": pd.Series(dtype="float"),
        "song_id": pd.Series(dtype="str"),
        "title": pd.Series(dtype="str"),
        "track_7digitalid": pd.Series(dtype="int"),
        "idx_artist_mbtags": pd.Series(dtype="int"),
        "year": pd.Series(dtype="int"),
        }
    )
    
    s3 = boto3.client('s3')
    
    for s3location in files:
        
        print(f"Processing: {s3location}")
        
        h5FileName = os.path.join('/tmp',s3location.split('/')[-1])
        
        s3.download_file(bucket, s3location, h5FileName)
        
        read_f = h5py.File(h5FileName, 'r')
        
        file_df = pd.concat([pd.DataFrame(np.array(read_f[data_group]['songs'])) for data_group in read_f.keys()], axis=1)
        
        read_f.close()
        
        os.remove(h5FileName)
        
        combined_df = pd.concat([combined_df, file_df], axis=0).reindex()
    
    combined_df.to_csv(finalFileName, index=False)
    
    s3.upload_file(finalFileName, 'millionsongdataset-intermediate', 'songdata/'+file_name)

def lambda_handler(event, context):
    
    for record in event['Records']:
        
        body = json.loads(record["body"])
        
        print(f"Processing Body: {body}")
        
        message_processing(body)
        
    return {
        'statusCode': 200,
        'body': event
    }