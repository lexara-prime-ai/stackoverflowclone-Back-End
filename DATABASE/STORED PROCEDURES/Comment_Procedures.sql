USE StackNewbie
GO

--####################################
--CREATE STORED PROCEDURE FOR GETTING ALL COMMENTS
--####################################
CREATE OR ALTER PROCEDURE getComments
AS
BEGIN
	SELECT *
	FROM Comments
	WHERE deleted = 0
END
--##################
--EXECUTE PROCEDURE
--##################
EXEC getComments

--###################################
--CREATE STORED PROCEDURE FOR GETTING INDIVIDUAL COMMENTS
--###################################
CREATE OR ALTER PROCEDURE getCommentById(@comment_id INT)
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE @comment_id = comment_id AND deleted = 0
END
--######################## 
--EXECUTE STORED PROCEDURE
--########################
EXEC getCommentById @comment_id=1

--##########################################
--CREATE STORED PROCEDURE FOR ADDING COMMENT
--##########################################
CREATE OR ALTER PROCEDURE addComment(
	@comment VARCHAR(255),
    @answer_id INT,
    @user_id INT
)
AS
BEGIN
	INSERT INTO Comments
		(comment, answer_id, user_id)
    VALUES(@comment, @answer_id, @user_id)
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC addComment 'Thanks for the clarification', 4, 3


--############################################
--CREATE STORED PROCEDURE FOR UPDATING COMMENT
--############################################
CREATE OR ALTER PROCEDURE updateComment
    @comment_id INT,
    @comment VARCHAR(255),
    @answer_id INT,
    @user_id INT
AS
BEGIN
    UPDATE Comments
    SET 
        comment = @comment,
        answer_id = @answer_id,
        user_id = @user_id
    WHERE comment_id = @comment_id AND deleted = 0
END

--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC updateComment 1, 'Thanks, great answer!', 1, 1


--##############################################
--CREAT STORED PROCEDURE FOR DELETING A COMMENT
--##############################################
CREATE OR ALTER PROCEDURE deleteComment (@comment_id INT)
AS
BEGIN   
    UPDATE Comments SET deleted=1
    WHERE comment_id=@comment_id
END

EXEC deleteComment 3



--VIEW UPDATED TABLE
SELECT * FROM Comments