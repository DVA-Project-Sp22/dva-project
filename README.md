# CS6242-Final_Project

This repository will contain the group work for our Georgia Tech CS6242(Data Visualization and Analytics) Final course project.

## Directions

### ETL

The million song dataset is available as a [Amazon Public Dataset Snapshot](https://aws.amazon.com/datasets/million-song-dataset/). The instructions for how to download the dataset are on the [Million Song Dataset website](http://millionsongdataset.com/pages/getting-dataset/).

Once you followed the instructions we can use the AWS CLI to copy the files into S3 using the following command:

```bash
aws s3 sync . s3://millionsongdataset-raw
```

However millionsongdataset-raw is a bucket we created and AWS requires s3 buckets to be unique so you will not be able to create the same bucket and you will not have access to copy to our bucket.

After having copied the dataset to S3. You can convert the data in that file by using the code in the ConvertCombine-h5tocsv folder. You can use the create a lambda function using the lambda-config.json file for configuration settings. You can also create a SQS Queue to receive the messages from the lambda function using the sqs-config.json file. The code for the lambda function is in the lambda_function.py file. Then to populate the SQS Queue you can follow the instructions in load-sqs.ipynb.

Then to convert the AdditionalFiles data you can use the code in the Convert-AdditionalFiles.ipynb file.

Lastly there is an associated dataset that includes links to Spotify and Facebook among other sites. You can download the files in Zip format [here](https://labs.acousticbrainz.org/million-song-dataset-echonest-archive/) and then unzip the files. Then copy them to S3 using the AWS CLI.

```bash
aws s3 sync . s3://echonest-intermediate-json/json
```

And then you can process the data into CSV format by using the code in the ConvertCombine-jsontocsv folder. You can create a Lambda function and a SQS queue by using the lambda-config.json and sqs-config.json files. The code for the lambda function is in the lambda_function.py file. Then to populate the SQS Queue you can follow the instructions in load-sqs.ipynb.

### EDA

We ran K-means clustering with different combinations of features, which led to different posssible models. We found the model with the highest Silhouette Score and Calinski-Harabasz Index.

### Model Building

We then determined least-disliked songs by using distance between clusters to find the farthest cluster from a given disliked song, then picking the song in that cluster that was farthest from the disliked song.

### Running the website locally

There are a few prerequisites to getting the frontend running locally. You must have Node version >= `16.13.0` installed (or at least an LTS version). You will also need to create a `.env` file in the `/site` folder - this file houses all Spotify and AWS API Gateway credentials. If you decide to use a custom API backend, then ignore any references to `DVA_API_ENDPOINT` and `DVA_API_KEY` as those are specific to this project instance.

## Additional site notes

- This site is best experienced on desktop viewports.
- A good blog post to generate the Spotify environment variables is [this one](https://leerob.io/blog/spotify-api-nextjs).
