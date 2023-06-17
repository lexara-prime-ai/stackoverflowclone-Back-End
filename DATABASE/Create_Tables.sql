USE StackNewbie;
GO

CREATE TABLE Users
(
    user_id INT IDENTITY(1, 1) PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT UC_Users_DisplayName UNIQUE (display_name),
    CONSTRAINT UC_Users_Email UNIQUE (email)
);

CREATE TABLE Questions
(
    question_id INT IDENTITY(1, 1) PRIMARY KEY,
    question VARCHAR(255),
    additional_info VARCHAR(255),
    category VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Answers (
    answer_id INT IDENTITY(1, 1) PRIMARY KEY,
    answer VARCHAR(255),
    question_id INT,
    user_id INT,
    display_name VARCHAR(255),
    FOREIGN KEY (question_id) REFERENCES Questions(question_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (display_name) REFERENCES Users(display_name)
);

CREATE TABLE Comments
(
    comment_id INT IDENTITY(1, 1) PRIMARY KEY,
    comment VARCHAR(255),
    answer_id INT,
    user_id INT,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Votes
(
    vote_id INT IDENTITY(1, 1) PRIMARY KEY,
    vote_count INT,
    answer_id INT,
    user_id INT,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
