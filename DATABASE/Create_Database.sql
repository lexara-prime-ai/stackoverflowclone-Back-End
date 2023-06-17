USE master;
GO
--#################
-- CREATE DATABASE
--#################
IF NOT EXISTS (
    SELECT name
FROM sys.databases
WHERE name = N'StackNewbie'
        )
        CREATE DATABASE [StackNewbie];
    GO

IF SERVERPROPERTY('ProductVersion') > '12'
        ALTER DATABASE [StackNewbie] SET QUERY_STORE = ON;
    GO
