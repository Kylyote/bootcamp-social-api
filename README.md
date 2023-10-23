# Social Network API

Simple backend server that uses a CLI to create user accounts, post messages, and delete them.

## Description

This is simple code that runs the backend of a potential social network site using MongoDB. It is tested using Insomnia and has 2 models and 3 schemas that can be called. The routes hold contoller code and methods that are written into both a separate controller file and custom mongoose methods in the Notion.js file. This was done to practice both writing a separate connection file whose methods are called into the routes and how custome methods are written and called using Mongoose.

Using these routes and methods, users can be seen, created, made friends with, and deleted. Their notions can also be created, have reactions made to them, edited, and deleted.

## User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Collaborators

- Chelsea Wagner: https://github.com/caf62219 - Began writing code, helped with controller-route split code, and helped debugging
- Donnie Rawlings: https://github.com/drawlin22 - Began writing code with and helped with debugging
- Nedda Elsayed: https://github.com/Lven-Nemsy - Began writing code with.
- Colton Firestone: https://github.com/ColtonMakesStuff - Had insight into how to properly use Mongoose methods. Worked together to shorten code in both the Models and routes.
- Phind and CoPilot as AI helpers that helped as much as they hindered. They are just happy to be here.

## Links

- Link to repo:  
  https://github.com/Kylyote/bootcamp-social-api
- Link to video:  
  https://drive.google.com/file/d/1yb_mGuqOjOhlE5dvVZj_mdgt-PyEUpAl/view
