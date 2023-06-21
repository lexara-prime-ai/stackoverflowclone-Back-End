USE StackNewbie
GO
--################
--SELECT ALL Users
--################
SELECT * FROM Users

--##################################
-- SELECT QUESTIONS ASKED BY A USER
--#################################
DECLARE @user_id INT = 3;

SELECT u.user_id, u.display_name AS asked_by, q.question_id, q.question, q.additional_info, q.category
FROM Users u
JOIN Questions q ON u.user_id = q.user_id
WHERE u.user_id = @user_id;

SELECT * FROM Questions


--################################
-- SELECT ANSWERS GIVEN BY A USER
--################################
SELECT a.answer_id, a.answer, a.question_id, u.user_id, u.display_name AS answered_by
FROM Answers a
JOIN Users u ON a.user_id = u.user_id;

SELECT * FROM Answers;


--#################################
-- SELECT COMMENTS ADDED BY A USER
--#################################
SELECT c.comment_id, c.comment, c.user_id, u.display_name AS commented_by, a.answer, q.question_id
FROM Comments c
JOIN Answers a ON c.answer_id = a.answer_id
JOIN Users u ON c.user_id = u.user_id
JOIN Questions q ON a.question_id = q.question_id
WHERE c.user_id = 1;

SELECT * FROM Comments

--#############################
-- SELECT VOTES MADE BY A USER
--############################
SELECT v.vote_id, v.vote_count, v.user_id, u.display_name AS voted_by, a.answer
FROM Votes v
JOIN Answers a ON v.answer_id = a.answer_id
JOIN Users u ON v.user_id = u.user_id;

SELECT * FROM Votes


