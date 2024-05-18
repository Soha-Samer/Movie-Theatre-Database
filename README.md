Description:

Developed a comprehensive database system and application for a movie theatre. This project involved designing and implementing several interconnected database tables to manage various aspects of theatre operations, including auditoriums, customers, movies, reservations, screening sessions, seat assignments, and snack orders.
Key Features:

    Auditorium Management:
        Table: Auditorium
        Description: Stores information about each auditorium, including a unique identifier and the total number of seats.
        Key Fields: auditoriumId, numberOfAllSeats

    Customer Management:
        Table: Customer
        Description: Maintains records of customers with fields for name, email, and password.
        Key Fields: customerId, name, email, password

    Movie Information:
        Table: Movie
        Description: Contains details about movies being shown, such as title, description, and length.
        Key Fields: movieId, title, description, length

    Reservation System:
        Table: Reservation
        Description: Manages reservations made by customers for specific screening sessions, ensuring referential integrity with foreign keys.
        Key Fields: reservationId, customerId, screeningSessionId
        Foreign Keys: References Customer and ScreeningData tables with cascading updates and deletions.

    Screening Sessions:
        Table: ScreeningData
        Description: Tracks details of movie screening sessions, including movie ID, auditorium ID, weekday, start time, and duration.
        Key Fields: screenSessionId, movieId, roomId, weekDay, startTime, duration
        Foreign Keys: References Movie and Auditorium tables with cascading updates and deletions.

    Seat Management:
        Table: Seat
        Description: Manages individual seats within each auditorium.
        Key Fields: auditoriumId, seatNumber, rowNumber
        Foreign Key: References Auditorium table with cascading updates and deletions.

    Snack Menu:
        Table: SnackMenu
        Description: Lists available snacks with details such as name, price, and availability status.
        Key Fields: snackItemId, name, price, available

    Snack Orders:
        Table: SnackOrder
        Description: Tracks snack orders made by customers, including order time and total cost.
        Key Fields: snackOrderId, customerId, dateAndTimeOfOrder, totalCost
        Foreign Key: References Customer table with cascading updates and deletions.

    Snack Order Items:
        Table: SnackOrderItem
        Description: Manages individual items within each snack order.
        Key Fields: snackOrderId, snackItemId, quantity
        Foreign Keys: References SnackMenu and SnackOrder tables with cascading updates and deletions.

Technical Specifications:

    Database Engine: InnoDB
    Character Set: UTF-8 (utf8mb4) for comprehensive character support.
    Collation: utf8mb4_0900_ai_ci for proper sorting and comparison.

Contributions:

    Designed and implemented the database schema, ensuring normalization and efficient data retrieval.
    Established primary and foreign key constraints to maintain data integrity and support cascading updates and deletions.
    Utilized appropriate data types and defaults to enhance data accuracy and consistency.

Skills Demonstrated:

    SQL database design and management.
    Implementing data integrity and referential integrity constraints.
    Optimizing database schema for performance and scalability.
    Using advanced SQL features such as foreign keys, cascading updates, and deletions.

This project showcases your ability to design and implement a complex database system tailored to the specific needs of a movie theatre, demonstrating your proficiency in database management and SQL.
