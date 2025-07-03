# College Noticeboard

A simple college noticeboard application where students and clubs can post and view events happening on campus.

## Live Demo

[https://technicalcounciltask.onrender.com/](https://technicalcounciltask.onrender.com/)


## What it does

This application acts as a centralized digital bulletin board for the entire college community. It enables students and clubs to easily share and discover information about campus events, workshops, sports meets, cultural festivals, and important announcements. By providing a single platform for posting and viewing notices, it ensures that crucial updates and opportunities don’t get lost in scattered WhatsApp groups or fleeting social media stories. Each event post includes all the essential details—such as the event’s purpose, date, time, location, category, and contact information—making it simple for everyone to stay informed and engaged with campus life

## Tech Stack

-frontend-react
-backend-node(express)
-database-mongodb

## API Overview

- `POST /users/signup` — Register a new user
- `POST /users/signin` — Login and receive a JWT token
- `GET /events` — List all events
- `POST /events` — Create a new event (auth required)

## What More Could Be Done
- integration with auths like Dauth.
- admin routes can be added to check and push the events.
- Allow users register for events directly from here.
- Let users manage their own profiles and see their posted events and also update them.
- sync with calendar so that events would automatically disappear after the given time
- better ui-ux half of frontend is made by me half is just snippets from internet and AI💀💀.

## Running with Docker

To run the app using Docker and Docker Compose:

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd technicalcouncil
   ```
2. **Build and start the containers:**
   ```sh
   docker-compose up --build
   ```
3. **Access the app:**
   - Open [http://localhost:5000](http://localhost:5000) in your browser.

This will start both the backend (which serves the frontend) and a local MongoDB instance. The backend will be available at port 5000, and all data will be stored in a Docker volume for persistence.


