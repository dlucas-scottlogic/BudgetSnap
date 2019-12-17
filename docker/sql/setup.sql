CREATE TABLE Transactions (
    TransactionId bigint IDENTITY(1,1) PRIMARY KEY,
    [Value] DECIMAL(19,4),
	TransactionDate Datetime,
	Summary varchar(255)
);

INSERT INTO Transactions ([Value], TransactionDate, Summary)
VALUES
(10.99, '2019-12-17', 'Pizza'),
(30.56, '2019-12-16', 'Beers'),
(55.00, '2019-12-15', 'Petrol')