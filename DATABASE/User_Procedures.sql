USE StackNewbie
GO
--#############################################
--CREATE STORED PROCEDURE FOR GETTING ALL USERS
--#############################################
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