# Project Design Document

## Ben Gannon - CSTP 2110


### Section 1 - Project Description

*1.1 Project*

Anglophoria

<br>

*1.2 Description*

The app is based on the same concept I used in my final project for CSTP 1303 (Intro to Client-Server) – however, the app I created then was extremely basic: first of all, it was vanilla JavaScript (all hard-coded data, no React); had monolithic architecture (separate folders for backend and frontend); and used MongoDB atlas as a cloud database (to store only user information). This term, I would like to re-create the app using all the new things I’ve learned since then. I’ll code from scratch using React, create a better variety of playable games / quizzes, create a better UI, and of course use exclusively AWS to handle the data. 
The main goal of the project is to create a website where users can play various fun games to test/improve their English. 
The problem my website attempts to solve is that many language-learning sites are boring, and don’t allow the user to easily pick and choose what type of learning they want to focus on. For example, Duolingo just presents all users with the same generic fill-in-the-blank slides that they need to click through endlessly. A site where users can choose what type of challenge / what topic they want to focus on gives them greater flexibility and encourages them to keep practicing English (and to hone in on their weak spots). 

*1.3 Revision History*

No revisions yet.

### Section 2 - Overview

*2.1 Purpose*

The intended audience is for kids. The purpose of the app is to give them excercies that they can use to practice/improve their English at multiple levels (up to B1). 

*2.2 Scope*

Games will very very simple multiple choice games (basically, fun quizzes with animated gifs). Each game (quiz) will be three questions long. I will implement at least 5 games, which will all be playable at three proficiency levels (A1, A2, B1). 

*2.3 Requirements*

Users should be able to seamlessly sign up, log in, choose games, choose proficiency levels, play games, and receive (correct) points based on their answers. 


*2.3.1 Functional Requirements*


•	Secure user signup/login/logout: a user can successfully create an account, sign in, and log out. Their password should be hashed, and the original plaintext should not be stored anywhere in the database. Two users should not be able to create accounts using the same email. The log in page should give relevant feedback to the user (e.g. “wrong password,” “that account does not exist”) based on their input. 

•	User scoreboard: at the top of the homepage, there should be a simple scoreboard displaying the number of “stars” a user has. This number of stars is dependent on the user’s game history: for example, a perfect game at A1-proficiency gains the user 2 stars, whereas for B2-proficiency it gains 6 stars; likewise, getting a score of 0 on those games results in -2 and -6 stars respectively. (Alternatively, I might separate each score to its own proficiency level – i.e. the user would have separate scores for A1, A2, B1…)

•	Game console: a grid of clickable games tiles 

•	Scoreboard: a banner at the top that shows the user's current points 

•	Game info pop-up menu: after clicking a game tile, the game info menu pops up on the right side of the screen, displaying info about the game like name, description, and playable proficiency levels. It should also have a “Proceed” button.

•	Pre-game screen: after clicking “Proceed” in the game info menu, the user is taken to the pre-game screen, which shows them the instructions, and allows them to start the game. 

•	Game page: the user plays an English-language learning game. All games should be timed, but they will have very different formats. Some formats might be “choose the best response,” “unscramble the word,” or the classic “fill in the blanks.” 

•	Post-game page: after the timer runs out, the user is presented with feedback, including score/points, wrong answers, and the option to play again. Ideally, this page would identify the user’s English weak spots (e.g. specific words, grammar patterns), and give them the option to add those weak spots to a “notes” page. However, in the scope of this project, I will probably not implement this feature. 


*2.3.2 Non-Functional Requirements*

•	High performance/reliability throughout (no long loading components, no redundant fetching)


*2.3.3 Technical Requirements*

HARDWARE: As a web app, there are not any hardware requirements for the user. It should not cause any spikes or significant elevation in memory.

SOFTWARE: The web app will be developed using Javascript in the React + Vite framework. 


*2.3.4 Security Requirements*

•	Authentication: the system will use AWS Cognito for authenticating users. It will store user log in data inside a secure user pool. 

•	Data Encryption: the data within the website is generally safe, read-only data, that does not require encryption. The only sensitive data is the user's login info, which is handled by AWS Cognito. 


*2.3.5 Estimates*

TOTAL: 50 hours


*2.3.6 Tracability Matrix*

Not implemented yet.


### Section 3 - System Architecture




