# Ocarina Hub

This is a POC with four (planned) major features geared towards ocarinists: recommendations; LMS; music repo; pseudo social medial.

## Why?

There are very little resouces avaliable for the ocarina community. This app is a proof of concept to see how a recommendations system, LMS, music repo, and pseudo social media can logically connect together if at all.

### Recommendations

This is designed to allow new players to see what ocarinas are recommended for beginners and to help experienced players pick their next ocarina. Its intent is to act as a community sourced buying guide.

### LMS

There are few places to get information on how to play the ocarina and how to connect it to written music. The LMS section's goal is to provide resources to people can learn how to play (and potentially make) the ocarina

### Music Repo

Finding ocarina music, espeically for ensembles (2+ people), and ocarina tabs is not an easy feat. Often, people use flute, recorder, violin, or vocal music but this is often solo music. A music repo has two goals: providing ocarina music so people don't have to pull from other instruments and providing ocarina ensemble music so people can play with their friends.

### Pseudo Social Media

This section will take aspects of social media. As Ocarina Hub is not a social media platform, there will be few social media features. The epic will be fleshed out as hwe get to the is section.

## Technology 

- Docker
- SQLite
- FastAPI 0.104.1
- Preact ^10.19.1
- Node v20.10.0
- Python 3.12.0

## Running the application

- Clone the application
- cd into the directory of the project
- Run `docker compose up --build` (there will be no data in the database but all of the tables in the db will be ready to go)

## API Features

[x] User registration

[x] User login

[x] Checking current user

[x] Ocarina CRUDL

[x] Personal Collection CRUDL

[x] Reviews CRUDL

[x] Getting Recommendations 

[ ] General music lessions (LMS)

[ ] Ocarina Lessons (LMS)

[ ] Recommendation Caching

## Frontend Features


[ ] User registration

[ ] User login

[ ] Checking current user

[ ] Ocarina CRUDL

[ ] Personal Collection CRUDL

[ ] Reviews CRUDL

[ ] Getting Recommendations 

[ ] General music lessions (LMS)

[ ] Ocarina Lessons (LMS)
