USE StackNewbie
GO

--####################################
--CREATE STORED PROCEDURE FOR GETTING ALL ANSWERS
--####################################
CREATE OR ALTER PROCEDURE getAnswers
AS
BEGIN
	SELECT *
	FROM Answers
	WHERE deleted = 0
END
--##################
--EXECUTE PROCEDURE
--##################
EXEC getAnswers

--###################################
--CREATE STORED PROCEDURE FOR GETTING INDIVIDUAL ANSWERS
--###################################
CREATE OR ALTER PROCEDURE getAnswerById(@answer_id INT)
AS
BEGIN
    SELECT *
    FROM Answers
    WHERE @answer_id = answer_id AND deleted = 0
END
--######################## 
--EXECUTE STORED PROCEDURE
--########################
EXEC getAnswerById @answer_id=1

--##########################################
--CREATE STORED PROCEDURE FOR ADDING ANSWER
--##########################################
CREATE OR ALTER PROCEDURE addAnswer(
	@answer VARCHAR(255),
    @question_id INT,
    @user_id INT,
    @display_name VARCHAR(255)
)
AS
BEGIN
	INSERT INTO Answers
		(answer, question_id, user_id, display_name)
    VALUES(@answer, @question_id, @user_id, @display_name)
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC addAnswer 'The capital city of France is Paris, pronounced parii', 1, 5, 'David Wilson'


--############################################
--CREATE STORED PROCEDURE FOR UPDATING ANSWER
--############################################
CREATE OR ALTER PROCEDURE updateAnswer
    @answer_id INT,
    @answer VARCHAR(255),
    @question_id INT,
    @user_id INT,
    @display_name VARCHAR(255) 
AS
BEGIN
    UPDATE Answers
    SET 
        answer_id = @answer_id,
        answer = @answer,
        user_id = @user_id,
        display_name = @display_name
    WHERE answer_id = @answer_id AND deleted = 0
END

--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC updateAnswer 7, 'It is Paris, pronounced parii', 1, 5, 'David Wilson'


--##############################################
--CREAT STORED PROCEDURE FOR DELETING A ANSWER
--##############################################
CREATE OR ALTER PROCEDURE deleteAnswer (@answer_id INT)
AS
BEGIN   
    UPDATE Answers SET deleted=1
    WHERE answer_id=@answer_id
END

EXEC deleteAnswer 7

--##########################################
--GET A USER'S ANSWER BASED ON THE answer_id
--##########################################
CREATE OR ALTER PROCEDURE GetUserAnswer
    @answer_id INT
AS
BEGIN
    SELECT a.answer_id, a.answer, a.question_id, u.user_id, u.display_name AS answered_by, u.email, a.preferred
    FROM Answers a
    JOIN Users u ON a.user_id = u.user_id
    WHERE a.answer_id = @answer_id;
END;

EXEC GetUserAnswer @answer_id=2


--########################
--UPDATE ANSWER PREFERENCE
--########################
CREATE OR ALTER PROCEDURE UpdatePreference
    @answer_id INT
AS
BEGIN
    IF (SELECT preferred FROM Answers WHERE answer_id = @answer_id) = 0
    BEGIN
        UPDATE Answers
        SET preferred = 1
        WHERE answer_id = @answer_id; 
    END;
END;

EXEC UpdatePreference @answer_id=2


--##########################################
--CREATE PROCEDURE FOR INCREASING VOTE COUNT
--##########################################
CREATE OR ALTER PROCEDURE IncreaseAnswerVoteCount
    @answer_id INT
AS
BEGIN
    UPDATE Answers
    SET vote_count = vote_count + 1
    WHERE answer_id = @answer_id;
END;

EXEC UpdateAnswerVoteCount @answer_id=1

--##########################################
--CREATE PROCEDURE FOR DECREASING VOTE COUNT
--##########################################
CREATE OR ALTER PROCEDURE DecreaseAnswerVoteCount
    @answer_id INT
AS
BEGIN
    UPDATE Answers
    SET vote_count = vote_count - 1
    WHERE answer_id = @answer_id;
END;

EXEC DecreaseAnswerVoteCount @answer_id=1
 
--VIEW UPDATED TABLE
SELECT * FROM Answers