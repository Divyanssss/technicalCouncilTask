# College Noticeboard

A simple college noticeboard application where students and clubs can post and view events happening on campus.

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

