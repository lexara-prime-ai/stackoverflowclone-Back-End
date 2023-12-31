USE StackNewbie;
GO

CREATE TABLE Users
(
    user_id INT IDENTITY(1, 1) PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
	emailed INT DEFAULT 0,
	deleted INT DEFAULT 0,
	admin INT DEFAULT 0,
    CONSTRAINT UC_Users_DisplayName UNIQUE (display_name),
    CONSTRAINT UC_Users_Email UNIQUE (email)
);

CREATE TABLE Questions
(
    question_id INT IDENTITY(1, 1) PRIMARY KEY,
    question VARCHAR(255),
    additional_info VARCHAR(255),
    category VARCHAR(255),
    deleted INT DEFAULT 0,
    user_id INT,
    date_created DATE DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON UPDATE CASCADE
);


CREATE TABLE Answers (
    answer_id INT IDENTITY(1, 1) PRIMARY KEY,
    answer VARCHAR(255) NOT NULL,
    question_id INT,
    user_id INT,
    display_name VARCHAR(255),
	deleted INT DEFAULT 0,
	preferred INT DEFAULT 0,
	vote_count INT DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (display_name) REFERENCES Users(display_name) ON UPDATE CASCADE
);

CREATE TABLE Comments
(
    comment_id INT IDENTITY(1, 1) PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    answer_id INT,
    user_id INT,
	deleted INT DEFAULT 0,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Votes (
    vote_id INT IDENTITY(1, 1) PRIMARY KEY,
    answer_id INT,
    user_id INT,
    vote_type VARCHAR(10),
    CONSTRAINT UC_Votes UNIQUE (answer_id, user_id)
);

ALTER TABLE Votes
ADD CONSTRAINT FK_Votes_Answers FOREIGN KEY (answer_id) REFERENCES Answers(answer_id);

ALTER TABLE Votes
ADD CONSTRAINT FK_Votes_Users FOREIGN KEY (user_id) REFERENCES Users(user_id);
