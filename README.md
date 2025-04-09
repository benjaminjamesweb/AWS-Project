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

| Date | Comment | Author  |
|----------|-----|------------|
| 3/21 | Added base functional code and design document  | Ben |
| 1/1 | Improved app logic (separate slides for each game question) | Ben |
| 1/9 | Finalized app, deployed with Amplify  | Ben |

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

| SRS Requirement | SDD Module |
|----------|-----|
| R1 | Implemented  |
| R2 | Implemented  |
| R3 | Implemented  |
| R4 | Implemented  |
| R5 | Implemented  |
| R6 | Implemented  |

<br>

### Section 3 - System Architecture

*3.1 Overview*

The main components within the app are UserInfo, Game, and Gameplay (as well as Users within the AWS User pool).

When a new user signs up, their info is stored within the default User table inside a user pool. When they first log in, a UserInfo object is created to store that user's total points (it is initialized at 0). Games in the games arcade (on the main page) are populated from the Games entity. After clicking on a game, the user is taken to the focus page for that game, where they see more details (still from the Games entity). Once they select their desired proficiency level and click play, the Gameplay entity (for that game + level) is fetched to display the game content. Maps are used for each MCQ option, to store info for both the answer as well as the points that answer will earn the player. 

<br>

*3.2 Architectural Diagram*

Class Diagram

![Anglophoria drawio](https://github.com/user-attachments/assets/bf166033-b206-48cf-b416-d67da60813bc)

<br>

AWS High Level Diagram

![doc2](https://github.com/user-attachments/assets/86bc53d5-b0b1-45de-918b-a0b0ba13d00a)


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
| a1 | {Text, Points} map to store the different answers for this question - points are given when text is clicked on | [AnswerPair] |
| q2 | The first question | String |
| q2 | Media (e.g. a gif) for the second question | String |
| a2 | {Text, Points} map to store the different answers for this question - points are given when text is clicked on | [AnswerPair] |
| q3 | The first question | String |
| q3 | Media (e.g. a gif) for the third question | String |
| a3 | {Text, Points} map to store the different answers for this question - points are given when text is clicked on | [AnswerPair] |

<br>

### Section 5 - Data Design

*5.1 Persistent/Static Data*

Every User (in the Cognito User pool) has a corresponding UserInfo table in DynamoDB (which is how we give/fetch a user's earned points). 

(Note: the UserInfo table is only created when a user logs in for the first time). 

Every Game (in DynamoDB) has a corresponding Gamgeplay object for *every proficiency option described in the levels field*. 

E.g.: if a Game has ["A1", "A2", "B1"] in the *levels* field, then there will be three Gameplay objects for that game. 

The *gameid* field in Gameplay links it to the correct game. The *proficiency* links it to the user's selected proficiency level (which they select from a drop-down menu displaying all the options inside Game.levels). 

<br>

*5.1.1 Dataset*

a) User (in Cognito User Pool)
- Attributes: id (PK), email, password
- Relationships: One-to-One with UserInfo

b) UserInfo (in DynamoDB)
- Attributes: email (PK), totalPoints
- Relationships: One-to-One with User

c) Game (in DynamoDB)
- Attributes: id (PK), name, description, image, levels
- Relationships: One-to-Many with Gameplay

d) Gameplay (in DynamoDB)
- Attributes: id (PK), gameid, proficiency, q1, q1media, a1, q2, q2media, a2, q3, q3media, a3
- Relationships: One-to-One with Game

<br>

### Section 6 - User Interface Design

*6.1 User Interface Design Overview*

Here is the current state of my UI. Clearly, it needs a lot of cleaning up - however, the basic flow / elements are shown. 

Homepage UI

![homepage](https://github.com/user-attachments/assets/046174ee-90af-461d-8492-c61424085ce4)

<br>

Game page (before level selection + play)
![gamefocus](https://github.com/user-attachments/assets/4c99562e-bfcd-4213-b4d0-b42d92a75ca6)

<br>

Game page (after level selection + play)
![gameplay](https://github.com/user-attachments/assets/d8752d57-3d6f-4223-b0e0-0abd814327bf)

<br>

Signup / Login page
![auth](https://github.com/user-attachments/assets/a70318f8-5ba6-4583-9b27-5085fbd3a8a7)

<br>

### Section 7 - Testing

Testing has not been implemented yet. 

<br>

### Section 8 - Monitoring

Monitoring has not been implemented yet.

<br>

### Section 9 - Other Interfaces

Not implemented yet.

<br>

### Section 10 - Extra Design Features / Outstanding Issues

One idea I have, to improve the logic for the Gameplay class, is to create a struct for Question, which will contain the question name, media, and array of AnswerPairs. This would allow the programmer to easily add any number of questions to the gameplay object (instead of just 3). 

<br>

### Section 11 - References

None yet.

<br>

### Section 12 - Glossary

None yet.

<br>

