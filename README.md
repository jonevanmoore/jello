<p align="center">
  <img src="https://user-images.githubusercontent.com/90283463/167225606-8d881f7c-071f-4029-b9d1-2e9492d11ee6.png" />
</p>

<p align="center">
   <a href="https://the-jello-app.herokuapp.com/home">Jello</a>, a clone of Trello, is a simple, easy-to-use collaboration tool that enables you to organize projects and everything related to them into boards!
</p>


## Table of Contents  
- [Getting Started](https://github.com/jonevanmoore/jello#getting-started)
- [Technical Details](https://github.com/jonevanmoore/jello#technical-details) 
- [Technologies](https://github.com/jonevanmoore/jello#technologies)
- [Feature List](https://github.com/jonevanmoore/jello#feature-list)  



## Getting Started
To get started, you can access the live site [here](https://the-jello-app.herokuapp.com/home). 

#### Step 1

![image](https://user-images.githubusercontent.com/90283463/167236617-3565654b-9add-4cdc-aa36-1db80bcd5fea.png)

From the home page, you can access the site via a demo user or by signing up. In the sign up form, you must enter a first name, last name, email, a password of at least 3 chacters, and you may choose from our selection of Jello avatars.

![brave_ezgiwsQuAb](https://user-images.githubusercontent.com/90283463/167308839-71419027-3537-43aa-a9ac-cc2114efe3bb.gif)

#### Step 2

After filling our the form with your information, you can now access Jello to its full potential! Have fun building your boards!

![brave_LrMEApLXwF](https://user-images.githubusercontent.com/90283463/167309142-154ebc5c-4c13-4be6-b599-1707388a9261.png)

## Technical Details
[Atlassian's react-beautiful-dnd package](https://github.com/atlassian/react-beautiful-dnd) brought life to Jello. By utilizing this package, Jello gives users the capability to reorganize their lists or cards, the power to change their mind, shift their thinking, and make overall better project boards. To fully implement this package, we applied the DragDropContext, Droppable, and Draggable components to our list and card components. The DragDropContext component provides context to allow for our lists and cards to fully mobile. 

![brave_M12cFzcdir](https://user-images.githubusercontent.com/90283463/167308947-89e6d37d-4806-48bf-89ed-e2d22b56ebc7.gif)

![brave_AsDopaWixx](https://user-images.githubusercontent.com/90283463/167309000-673e8d81-29e3-4e78-8bae-821d308f7c3a.gif)

## Technologies
- Reactjs
   - [React Beatiful Drag and Drop](https://github.com/atlassian/react-beautiful-dnd)
- Redux
- Python
- SQLAlchemy
- PostgreSQL
- Heroku
- Docker

## Feature List
- Users can sign up, log in, and log out
- Logged-in users can create a board, view their boards, update their board, and delete a board
- Logged-in users can create a list, view their lists within a board, update a list, and delete a list
- Logged-in users can create a card, view their cards within a list, update a card, and delete a card
- Logged-in users can share their boards, view users who received access to the owner's board, and remove access from a user
- Logged-in users can leave a comment on a card, view all comments on a card, and delete their own comments

#### Future Implementations
A few features missing from this Trello clone that will be implemented at a later date:
- Workspaces
- User profiles
- Board settings
- Hotkeys
