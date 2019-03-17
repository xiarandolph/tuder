# Tuder
HackRPI 2019 Project

## Dependencies
mongodb  
vue-cli  
node.js  
## Client Setup
cd client  
npm install --save  
npm run serve  
## Server Setup
cd server  
npm install --save  
nodemon server.js  

## Inspiration
 * "My roommate (Ryann) was offered a tutoring job a check for $3000. It was a crazy amount of money for just four weeks of work. He was suspicious of the check and to prevent situations like this from happening again, we have created Tuder." - Ben Kosten

 * "I didn't like Kumon enough" - Hyunwoo Do

## What it does
 * Tuder matches students with tutors based on preferred courses, subjects, availability, and expertise
 * Provides a messaging platform for tutors to communicate effectively to students

## How we built it
 * Used vue-cli to initialize a blank project and installed Vuetify for its material design components. 
 * The server and database service were made in nodejs with mongoose driver.

## Challenges we ran into
 * HTML is hard. 
 * mongodb would only work half the time. 
 * git checkout deleted all of the client source files. (at approx 5am)

## Accomplishments that we're proud of
 * sick domain http://tuder.me
 * Whipped up a backend, front-end and database REAL QUICK!

## What we learned
 * Some learned html
 * Some learned the powers of caffeine
 * Everyone took away a new skill, for some html for others it was how to restore cached sublime files...

## What's next for Tuder
 * Location support for other universities.
 * Messaging service.
 * Matching algorithm based on weight summation.
