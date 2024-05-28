![logo VC](/img/logo.svg)

# Technical documentation
Veeton project - Technical test - 2024

## Information
| Project Name | Veeton's Chat |
| ---: | :--- |
| Document Type | Technical documentation |
| Date | 28/05/2024 |
| Version | 1.0 |
| Writer | Abdelouahab Yousef (abdelo_y) |

## Table of content
- [Technical documentation](#technical-documentation)
  - [Information](#information)
  - [Table of content](#table-of-content)
  - [What is Veeton's Chat](#summary-of-the-project)
  - [Start the project](#start-the-project)
  - [Global rchitecture](#global-architecture)
- [Database](#database)
  - [Tips](#ps)
  - [Database model](#database-model)
- [Back](#back-end)
  - [Install dependencies](#install-dependencies)
  - [Start the back](#start-the-back)
    - [Warning](#🔴-warning)
- [Front](#front-end)
  - [Install dependencies](#install-dependencies-1)
  - [Start the front](#start-the-front)
- [Socket Server](#socket-server)
  - [Install dependencies](#install-dependencies-2)
  - [Start the Socket server](#start-the-socket-server)
- [API](#api)

## Summary of the project
### Project description
`Veeton's Chat` is a real-time login free chat.<br>
The idea is to create a room and invite someone to join it by sending your room id, or to join someone's room by using their room id.

## Start the project
To start the project, you need to pull the repository, then do the following commands :<br>

To start the front :
- `cd front`
- `npm install`
- `npm start`<br>

To start the back :
- `cd back`
- `npm install`
- `npm start`<br>

To start the socket :
- `cd socket`
- `npm install`
- `npm start`

## Global Architecture
![Architecture](/img/architecture.png)

## Database
- Create a `MySQL` database named `veeton`
- Take care to have a user named `root` (see `back/src/db/data-source.ts` file)
    #### PS
    Generally a root user is automatically created by installing MySQL so you have nothing to do.
    #### Database model
    ![bdd](/img/BDD.png)


## Back-end
### Install dependencies
- Go to back folder : `cd back`
- Install all packages : `npm install`

### Start the back
- run `npm start`

    the command `npm start` will : 
    - Initialize and start the server
    - Link the database and create the entities named `Room`, `Message`
    #### 🔴 Warning
    Starting the back-end will search for the veeton database. Take care to create the named database ahead the launch

## Front-end
### Install dependencies
- Go to front folder : `cd front`
- Install all packages : `npm install`

### Start the front
- run `npm run start` to start 

## Socket Server
### Install dependencies
- Go to socket folder: `cd socket`
- Install all packages: `npm install`
### Start the Socket server
- run `npm start` to start

## API
| URL | Type | Body |
| :--- | :--- | :--- |
| /api/room/create | POST | {"name": "Veeton's Chat", "password: "Veeton"} 
| /api/room/join | POST | {"id": "7MRPC3", "password: "Veeton"} 
| /api/message/create | POST | {"user": "Flore", "content": "Youssef, bienvenue chez Veeton", "room": "7MRPC3"}
| /api/message/room/:id | GET |
| /api/message/:id  | DELETE | 
