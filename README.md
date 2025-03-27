# Project Design Document

## Ben Gannon - CSTP 2110


### Section 1 - Project Description

*1.1 Project*

Anglophoria

<br>

*1.2 Description*

Anglophoria is a website where users can play various fun games to test/improve their English. The content aims to be entertaining and educational. The UI aims to give the user a fully-customizable learning experience, where they can choose which games to play at which proficiency level.  

<br>

*1.3 Revision History*

No revisions yet.

<br>

### Section 2 - Overview

*2.1 Purpose*

The intended audience is kids (below 12). The purpose of the app is to give them excercies that they can use to practice/improve their English at multiple levels (up to B1), in a way that appeals to their age group (lots of visuals, including animated animal gifs, as well as funny/light content). 

<br>

*2.2 Scope*

Games will be very simple multiple choice quizes. Each game (quiz) will be three questions long. I will implement at least 5 games, which will all be playable at three proficiency levels (A1, A2, B1). 

<br>

*2.3 Requirements*

Users should be able to seamlessly sign up, log in, choose games, choose proficiency levels, play games, and receive (correct) points based on their answers. 

<br>

*2.3.1 Functional Requirements*

•	(R1): Secure user signup/login/logout

•	(R2): Scoreboard (showing total points achieved)

•	(R3): Game arcade (a grid of clickable games tiles) 

•	(R4): Game description / level selection page

•	(R5): Gameplay page (the user plays a "game," really an MCQ with 3 questions) 

•	(R6): Post-gameplay page: after the game is over, the user is presented with feedback, including score/points, wrong answers, and the option to play again. 

<br>

*2.3.2 Non-Functional Requirements*

•	Performance: system should handle 1000+ concurrent users without performance degradation

•	Reliability: system should have 99.9% uptime

<br>

*2.3.3 Technical Requirements*

•	Hardware: As a web app, there are not any hardware requirements for the user. It should not cause any spikes or significant elevation in memory.

•	Software: The web app will be developed using Javascript in the React + Vite framework. 

<br>

*2.3.4 Security Requirements*

•	Authentication: the system will use AWS Cognito for authenticating users. It will store user log in data inside a secure user pool. 

•	Data Encryption: the data within the website is generally safe, read-only data, that does not require encryption. 

<br>

*2.3.5 Estimates*

| # | Description | Hrs. Est  |
|----------|-----|------------|
| 1 | Sign in page  | 3 |
| 2 | Games page | 5 |
| 3 | Scoreboard  | 2 |
| 4 | Gameplays  | 10 |
| 5 | Post-gameplay page | 3 |
|  | TOTAL: | 25 |

<br>

*2.3.6 Tracability Matrix*

Not implemented yet.

<br>

### Section 3 - System Architecture

*3.1 Overview*

The main components within the app are UserInfo, Game, and Gameplay (as well as Users within the AWS User pool).

When a new user signs up, their info is stored within the default User table inside a user pool. When they first log in, a UserInfo object is created to store that user's total points (it is initialized at 0). Games in the games arcade (on the main page) are populated from the Games entity. After clicking on a game, the user is taken to the focus page for that game, where they see more details (still from the Games entity). Once they select their desired proficiency level and click play, the Gameplay entity (for that game + level) is fetched to display the game content. Maps are used for each MCQ option, to store info for both the answer as well as the points that answer will earn the player. 

<br>

*3.2 Architectural Diagram*

![Anglophoria drawio](https://github.com/user-attachments/assets/bf166033-b206-48cf-b416-d67da60813bc)

<br> 

### Section 4 - Data Dictionary

User entity (fully-handled by AWS Cognito - stored in User pool)

| Field | Notes | Type  |
|----------|-----|------------|
| id | Unique identifier assigned by AWS | String |
| email | User's provided email | String |
| password | Hashed password | String |

<br>

UserInfo entity

| Field | Notes | Type  |
|----------|-----|------------|
| email | Primary key links this entity to a unique user in the user pool | String |
| totalPoints | Stores this user's total earned points | Int |

<br>

Game entity

| Field | Notes | Type  |
|----------|-----|------------|
| id | Typed by the programmer directly into DynamoDB | String |
| name | The name of the game | String |
| description | The description of the game | String |
| image | The file name of the image (stored in the s3 bucket) | String |
| levels | An array of all the playable proficiency levels for this game | [String] |

<br>

Gameplay entity

| Field | Notes | Type  |
|----------|-----|------------|
| id | Typed by the programmer directly into DynamoDB | String |
| gameid | Foreign key #1 to link the gameplay to the right game | String |
| proficiency | Foreign key #2 to link the gameplay to the user's selected proficiency level | String |
| q1 | The first question | String |
| q1 | Media (e.g. a gif) for the first question | String |
| a1 | All the different answer options for this question - points are given when clicked on | [AnswerPair] |
| q2 | The first question | String |
| q2 | Media (e.g. a gif) for the second question | String |
| a2 | All the different answer options for this question - points are given when clicked on | [AnswerPair] |
| q3 | The first question | String |
| q3 | Media (e.g. a gif) for the third question | String |
| a3 | All the different answer options for this question - points are given when clicked on | [AnswerPair] |
