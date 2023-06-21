--##################################
-- CREATE PROCEDURE TO INSERT VOTE
--##################################
CREATE OR ALTER PROCEDURE InsertVote
    @answer_id INT,
    @user_id INT,
    @vote_type VARCHAR(10)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Votes WHERE user_id = @user_id)
    BEGIN
        DECLARE @existing_vote_type VARCHAR(10);
        SELECT @existing_vote_type = vote_type FROM Votes WHERE user_id = @user_id;

        IF @existing_vote_type <> @vote_type
        BEGIN
            UPDATE Votes
            SET vote_type = @vote_type
            WHERE user_id = @user_id;
        END
        ELSE
        BEGIN
            RAISERROR ('You have already voted with the same vote type.', 16, 1);
        END
    END
    ELSE
    BEGIN
        INSERT INTO Votes (answer_id, user_id, vote_type)
        VALUES (@answer_id, @user_id, @vote_type);
    END
END;


EXEC InsertVote @answer_id=1, @user_id=1, @vote_type='upvote'