USE StackNewbie
GO

--#################################################
--CREATE STORED PROCEDURE FOR GETTING ALL QUESTIONS
--#################################################
CREATE OR ALTER PROCEDURE getQuestions
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE deleted = 0
END

EXEC getQuestions


--######################################################
--CREATE STORED PROCEDURE FOR GETTING A SINGLE QUESTION
--####################################################
CREATE OR ALTER PROCEDURE getQuestionById
	@question_id INT
AS
BEGIN
	SELECT *
	FROM Questions
	WHERE question_id = @question_id AND deleted = 0
END

EXEC getQuestionById @question_id = 2


--#############################################
--CREATE STORED PROCEDURE FOR ADDING QUESTIONS
--############################################
CREATE OR ALTER PROCEDURE addQuestion
	@question VARCHAR(255),
	@additional_info VARCHAR(255),
	@category VARCHAR(255),
	@user_id INT
AS
BEGIN
	INSERT INTO Questions (question, additional_info, category, user_id)
	VALUES (@question, @additional_info, @category, @user_id)
END

EXEC addQuestion 'How does electricity work?', 'I need a detailed explanation.', 'Science', 1

--################################################
--CREATE STORED PROCEDURE FOR UPDATING A QUESTION
--###############################################
CREATE OR ALTER PROCEDURE updateQuestion
	@question_id INT,
	@question VARCHAR(255),
	@additional_info VARCHAR(255),
	@category VARCHAR(255),
	@user_id INT
AS
BEGIN
	UPDATE Questions
	SET question = @question,
		additional_info = @additional_info,
		category = @category,
		user_id = @user_id
	WHERE question_id = @question_id AND deleted = 0
END


EXEC updateQuestion 7, 'How does gravity work?', 'I need a detailed explanation.', 'Science', 1

--################################################
--CREATE STORED PROCEDURE FOR DELETING A QUESTION
--###############################################
CREATE OR ALTER PROCEDURE deleteQuestion
	@question_id INT
AS
BEGIN
	UPDATE Questions
	SET deleted = 1
	WHERE question_id = @question_id
	AND deleted = 0
END

EXEC deleteQuestion @question_id = 7


