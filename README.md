[![Build Status](https://travis-ci.org/tundewritescode/inverted-index-api.svg?branch=master)](https://travis-ci.org/tundewritescode/inverted-index-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/89e8d65499114058a0f4aad4aaadb9df)](https://www.codacy.com/app/tundewritescode/inverted-index-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tundewritescode/inverted-index-api&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/tundewritescode/inverted-index-api/badge.svg?branch=routes)](https://coveralls.io/github/tundewritescode/inverted-index-api?branch=routes)
# Inverted Index Api
Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

For example, let’s say we have two documents, each with a content field containing the following:

The quick brown fox jumped over the lazy dog
Quick brown foxes leap over lazy dogs in summer
To create an inverted index, we first split the content field of each document into separate words (which we call terms, or tokens), create a sorted list of all the unique terms, and then list in which document each term appears.

## Endpoints
- ```/api/create``` - Use this to upload your JSON files and generate your or index or indices, if you upload multiple files.
- ```/api/search``` - Use this to search the created indices.

## Installation
- In your terminal, type ``` git clone https://github.com/tundewritescode/inverted-index-api```and press enter to clone this repo to your machine.
- To install all the dependencies, enter ```npm install``` in your terminal.

## How to run this API
- In your terminal, navigate to the cloned directory, and enter `npm start`.
- Launch Postman. Then create a `POST` request to the endpoints

## Note
This API doesn't persist data. Once you restart your server, every index create will disappear.