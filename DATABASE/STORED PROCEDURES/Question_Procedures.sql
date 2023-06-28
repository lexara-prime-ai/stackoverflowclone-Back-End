USE StackNewbie
GO

--#################################################
--CREATE STORED PROCEDURE FOR GETTING ALL QUESTIONS
--#################################################
CREATE OR ALTER PROCEDURE getQuestions
AS
BEGIN
    SELECT Q.*, U.display_name
    FROM Questions Q
    JOIN Users U ON Q.user_id = U.user_id
    WHERE Q.deleted = 0
END

EXEC getQuestions

--####################################################
-- GET QUESTIONS ALONG WITH ANSWERS AND DISPLAY NAMES
--####################################################
CREATE OR ALTER PROCEDURE GetQuestionsWithAnswersAndDisplayNames
AS
BEGIN
    SELECT
        Q.question_id,
        Q.question,
        Q.additional_info,
        Q.category,
        Q.date_created,
        Q.user_id AS question_asker_id,
        UQ.display_name AS question_asker,
        (
            SELECT
                A.answer_id,
                A.answer,
                A.vote_count,
                UA.display_name AS answerer,
                UA.user_id AS answerer_id
            FROM
                Answers A
            INNER JOIN
                Users UA ON A.user_id = UA.user_id
            WHERE
                A.question_id = Q.question_id
                AND A.deleted = 0
            FOR JSON PATH
        ) AS answers
    FROM
        Questions Q
    INNER JOIN
        Users UQ ON Q.user_id = UQ.user_id
    WHERE
        Q.deleted = 0
    ORDER BY
        Q.date_created DESC;
END

EXEC GetQuestionsWithAnswersAndDisplayNames;

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


