# CSE 6242 Group Project - DiVA

This repository will contain the group work for our Georgia Tech CSE 6242 (Data Visualization and Analytics) Final course project.

## DESCRIPTION

We're calling our project DiVA an app and visualization that helps you find songs that are the opposite of songs you don't like. This site is designed to help people who are less concerned with finding songs they love and instead want to find songs that don't offend people. Examples of groups this would appeal to are coffee shops, public areas and places that care about having background music but not great music.

## INSTALLATION

Here are directions for recreating this project broken up by the various sections of the project starting with ETL and ending with the actual website.

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

Once we got the data into this Intermediate format we started doing EDA and playing around with the data. You may notice some of the files referencing the Intermediate bucket. However to then move the data into the final format we used Python and a Jupyter Notebook with PyAthena to do the ETL. You can run the FinalDataProcessing.ipynb notebook to do the ETL and finally condense all the data into once CSV of a little less than 500K records.

### EDA

In our EDA folder we have 5 different Jupyter Notebooks where three members of our teams worked on exploring the data and trying to find the best way to model it. Ultimately they decided on K-means.

Three of the EDA notebooks go together and are different iterations of exploration:

- skeleton-notebook-run.ipynb: Runs K-means clustering with different combinations of features, which leads to different posssible models. We found the model with the highest Silhouette Score and Calinski-Harabasz Index.
- skeleton_notebook-run1.ipynb: Runs K-means clustering with only five features and computes the silhouette score and Calinski-Harabasz score
- Skeleton_notebook-run2.ipynb: Runs K-means clustering with only three features, and computes the silhouette score and Calinski-Harabasz score

### Model Building

We ran K-means clustering with different combinations of features, which led to different posssible models. We found the model with the highest Silhouette Score and Calinski-Harabasz Index. We then determined least-disliked songs by using distance between clusters to find the farthest cluster from a given disliked song, then picking the song in that cluster that was farthest from the disliked song.

To generate our model go to the Model section and run the RunSagemakerMode.ipynb notebook this will create a Sagemaker Processing job that will run. This job will take over 5 hours to run. Once the job is completed it will output two files, one with the Songdata now having a ClusterID added and the other will be a file with the Centroids for the Clusters.

We need to convert the Cluster Centroids to a Distance Matrix. To do this you can run the CalculateDistance.ipynb notebook. This will give you the final output of the model which can be consumed by our API.

### API

The back-end of our site is two API endpoints managed by an API Gateway in AWS. The first API endpoint is a Lambda function that will pick 10 songs for users to look at and decide which they like or don't like.

The second API endpoint is a Lambda function that takes in a list of Track IDs that the user doesn't like and then determines the songs that are least similar to those songs. This is calculated by finding the Cluster with the farthest Euclidean distance from the average of the user's disliked songs.

You can access our API endpoints by using the API credentials included in this Zip file. Please look at credentials.json for more information.

### Running the website locally

There are a few prerequisites to getting the frontend running locally. You must have Node version >= `16.13.0` installed (or at least an LTS version). You will also need to create a `.env` file in the `/site` folder - this file houses all Spotify and AWS API Gateway credentials. If you decide to use a custom API backend, then ignore any references to `DVA_API_ENDPOINT` and `DVA_API_KEY` as those are specific to this project instance.

### EXECUTION

Once you have the code running on your local computer, you can run a demo:

- You will be first presented with a list of 10 randomly generated songs.
- Click on “Dislike” buttons to choose songs that you don’t want.
- Click on “Generate Playlist”. The application will then generate a list of 10 songs based on our algorithm.
- You can explore the recommendations using the dropdown. This allows you to browse each recommended song and see how its attributes compare to the whole playlist’s as well as the disliked songs’.

## Additional site notes

- This site is best experienced on desktop viewports.
- A good blog post to generate the Spotify environment variables is [this one](https://leerob.io/blog/spotify-api-nextjs).
