USE StackNewbie
GO
--####################################
--CREATE STORED PROCEDURE FOR GETTING ALL USERS
--####################################
CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN
	SELECT *
	FROM Users
	WHERE deleted = 0
END
--##################
--EXECUTE PROCEDURE
--##################
EXEC getUsers

--###################################
--CREATE STORED PROCEDURE FOR GETTING INDIVIDUAL USERS
--###################################
CREATE OR ALTER PROCEDURE getUserById(@user_id INT)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE @user_id = user_id AND deleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC getUserById @user_id=2

--########################################
--CREATE STORED PROCEDURE FOR ADDING USERS 
--########################################
CREATE OR ALTER PROCEDURE addUser(
	@display_name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
	INSERT INTO Users
		(display_name, email, password)
    VALUES(@display_name, @email, @password)
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC addUser 'Peter Pan', 'peterpan@gmail.com', 'neverland254'


--######################################################
--CREATE STORED PROCEDURE FOR UPDATING INDIVIDUAL USERS
--######################################################
CREATE OR ALTER PROCEDURE updateUser(
    @user_Id INT,
	@display_name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    UPDATE Users
    SET email=@email, 
	display_name=@display_name,
        password=@password
    WHERE @user_id = user_id AND deleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC updateUser 1, 'John Done', 'johndone@gmail.com', 'Anotherpassword'

--##############################################
--CREAT STORED PROCEDURE FOR DELETING A USER
--##############################################
CREATE OR ALTER PROCEDURE deleteUser (@user_id INT)
AS
BEGIN   
    UPDATE Users SET deleted=1
    WHERE user_id=@user_id
END

EXEC deleteUser 1



--VIEW UPDATED TABLE
SELECT * FROM Users