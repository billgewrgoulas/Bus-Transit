# Go Bus

This is my diploma thesis - an application for the movement of passengers by city bus.

### Description

Nowadays the transit bus has become one of the most popular ways for people to travel around the cities. However, the rapid rise in popularity of this transportation method has come with a cost. Some of the main problems that the passengers face are the lack of information including static and realtime updates, the constant delays, the small frequency of the trips and the overloading of the vehicles. The proposed application aims to solve these issues by allowing the passengers to reserve a seat on the desired trip. This will allow the agency to save and monitor the flow of passengers and their preferences and make the necessery adjustments to the daily schedule such as adding extra vehicle and routes. The use cases of the app are the following:
  - Create a user account.
  - Easily find optimal bus routes and be able to reserve a seat. A QR code will be generated for each reservation which will assign priority.
  - Display and store information about stops and lines.
  - Display real-time information about bus arrivals, departures and bus locations.
  - Visualize information using map services.
  
 ### Open Trip Planner
 
In order to satisfy some advanced functionalities the application will utilize the open source software Open Trip Planner which is used to calculate optimal itineraries using data from a public transportation agency and data from Open Street Map. It exposes a rest API that we can use to make the relevant queries.

## Architecture

At a glance the application follows the 3-tier architecture. For the presentation tier we use Angular, for the logic tier we use Nest.js and for the data tier we use postreSQL. The architecture is shown below. OTP belongs to the logic tier.

<p align="center">
  <img width="430px" height="280px" src="https://github.com/billgewrgoulas/Bus-Transit/blob/master/pictures/architecture.png" />
</p>

## Database

<p align="center">
  <img width="600px" height="400px" src="https://github.com/billgewrgoulas/Bus-Transit/blob/master/pictures/Screenshot%20(61).png" />
</p>

## Logic tier









