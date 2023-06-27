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
        DECLARE @existing_vote_type VARCHAR(10), @existing_answer_id INT;
        SELECT @existing_vote_type = vote_type, @existing_answer_id = answer_id
        FROM Votes
        WHERE user_id = @user_id;

        IF @existing_vote_type <> @vote_type OR @existing_answer_id <> @answer_id
        BEGIN
            UPDATE Votes
            SET vote_type = @vote_type,
                answer_id = @answer_id
            WHERE user_id = @user_id;

            UPDATE Answers
            SET vote_count = vote_count + (CASE WHEN @vote_type = 'upvote' THEN 1 ELSE -1 END)
            WHERE answer_id = @answer_id;
        END
        ELSE
        BEGIN
            RAISERROR ('You have already voted with the same vote type for this answer.', 16, 1);
        END
    END
    ELSE
    BEGIN
        INSERT INTO Votes (answer_id, user_id, vote_type)
        VALUES (@answer_id, @user_id, @vote_type);

        UPDATE Answers
        SET vote_count = vote_count + (CASE WHEN @vote_type = 'upvote' THEN 1 ELSE -1 END)
        WHERE answer_id = @answer_id;
    END
END;

EXEC InsertVote @answer_id=1, @user_id=1, @vote_type='upvote'