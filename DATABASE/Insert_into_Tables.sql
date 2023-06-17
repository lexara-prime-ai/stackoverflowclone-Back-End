USE StackNewbie GO 

--####################
-- INSERT INTO Users
--####################
INSERT INTO Users (display_name, email, password) 
VALUES 
  ('John Doe', 'johndoe@example.com', 'password123'), 
  ('Jane Smith', 'janesmith@example.com', 'pass456'), 
  ('Mike Johnson', 'mikejohnson@example.com', 'securepass'), 
  ('Emily Brown', 'emilybrown@example.com', 'abc123'), 
  ('David Wilson', 'davidwilson@example.com', 'qwerty987');

--#######################
-- INSERT INTO Questions
--#######################
INSERT INTO Questions (question, additional_info, category, user_id) 
VALUES 
  ('What is the capital of France?', 'Asking for a trivia night', 'Geography', 1), 
  ('How do I bake a chocolate cake?', 'Looking for a recipe', 'Cooking', 2), 
  ('What are the benefits of regular exercise?', 'Interested in starting a fitness routine', 'Health', 3), 
  ('What is Javascript?', 'I only know Typescript', 'Programming', 3), 
  ('What is the best programming language for beginners?', 'Wanting to learn coding', 'Technology', 4), 
  ('How can I improve my public speaking skills?', 'Preparing for a presentation', 'Personal Development', 5);

--####################
-- INSERTING ANSWERS
--####################

-- Answer for question_id = 1
INSERT INTO Answers (answer, question_id, user_id, display_name) 
SELECT 
  'Paris is the capital of France.', 1, user_id, display_name 
FROM 
  Users 
WHERE 
  user_id = 3;
------------- END --------------

-- Answer for question_id = 2
INSERT INTO Answers (answer, question_id, user_id, display_name) 
SELECT 
  'To bake a chocolate cake, you need ingredients like flour, sugar, cocoa powder, etc. Follow a recipe for detailed instructions.', 2, user_id, display_name 
FROM 
  Users 
WHERE 
  user_id = 4;
------------- END --------------

-- Answer for question_id = 3
INSERT INTO Answers (answer, question_id, user_id, display_name) 
SELECT 
  'Regular exercise has numerous benefits including improved cardiovascular health, increased strength, and enhanced mood.', 3, user_id, display_name 
FROM 
  Users 
WHERE 
  user_id = 2;
------------- END --------------

-- Answer for question_id = 4
INSERT INTO Answers (answer, question_id, user_id, display_name) 
SELECT 
  'JavaScript is a programming language commonly used for web development. It is known for its versatility and ability to add interactivity to websites.', 4, user_id, display_name 
FROM 
  Users 
WHERE 
  user_id = 2;
------------- END --------------

-- Answer for question_id = 5
INSERT INTO Answers (answer, question_id, user_id, display_name) 
SELECT 
  'The best programming language for beginners can vary based on personal preferences, but popular choices include Python, JavaScript, and Ruby.', 5, user_id, display_name 
FROM 
  Users 
WHERE 
  user_id = 3;
------------- END --------------

-- Answer for question_id = 6
INSERT INTO Answers (answer, question_id, user_id, display_name) 
SELECT 
  'To improve public speaking skills, practice regularly, prepare your content, use visual aids, and focus on engaging with the audience.', 6, user_id, display_name 
FROM 
  Users 
WHERE 
  user_id = 4;
------------- END --------------

--##################
--INSERTING COMMENTS
--##################
-- Inserting a comment for an answer by a user
INSERT INTO Comments (comment, answer_id, user_id)
VALUES ('Great answer!', 1, 1);

-- Inserting another comment for a different answer by a different user
INSERT INTO Comments (comment, answer_id, user_id)
VALUES ('Thanks for the explanation!', 4, 2);

--################
--INSERTING VOTES
--################
-- Inserting an upvote for an answer by a user
INSERT INTO Votes (vote_count, answer_id, user_id)
VALUES (1, 3, 1);

-- Inserting a downvote for a different answer by a different user
INSERT INTO Votes (vote_count, answer_id, user_id)
VALUES (-1, 4, 2);
