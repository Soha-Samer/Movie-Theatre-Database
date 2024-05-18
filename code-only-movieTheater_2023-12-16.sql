

CREATE TABLE `Auditorium` (
  `auditoriumId` int NOT NULL AUTO_INCREMENT,
  `numberOfAllSeats` int unsigned NOT NULL,
  PRIMARY KEY (`auditoriumId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE `Customer` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE `Movie` (
  `movieId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `length` int DEFAULT NULL,
  PRIMARY KEY (`movieId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Reservation` (
  `reservationId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `screeningSessionId` int NOT NULL,
  PRIMARY KEY (`reservationId`),
  KEY `reservationCustomerFk` (`customerId`),
  KEY `reservationScreenSessionFk` (`screeningSessionId`),
  CONSTRAINT `reservationCustomerFk` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservationScreenSessionFk` FOREIGN KEY (`screeningSessionId`) REFERENCES `ScreeningData` (`screenSessionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `ScreeningData` (
  `screenSessionId` int NOT NULL AUTO_INCREMENT,
  `movieId` int NOT NULL,
  `roomId` int NOT NULL,
  `weekDay` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `startTime` timestamp NOT NULL,
  `duration` int unsigned NOT NULL,
  PRIMARY KEY (`screenSessionId`),
  KEY `movieScreeningFk` (`movieId`),
  KEY `screeningDataRoomAuditoriumIdFk` (`roomId`),
  CONSTRAINT `movieScreeningFk` FOREIGN KEY (`movieId`) REFERENCES `Movie` (`movieId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `screeningDataRoomAuditoriumIdFk` FOREIGN KEY (`roomId`) REFERENCES `Auditorium` (`auditoriumId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `Seat` (
  `auditoriumId` int NOT NULL AUTO_INCREMENT,
  `seatNumber` int NOT NULL,
  `rowNumber` int NOT NULL,
  PRIMARY KEY (`auditoriumId`),
  CONSTRAINT `seatAuditoriumId` FOREIGN KEY (`auditoriumId`) REFERENCES `Auditorium` (`auditoriumId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `SnackMenu` (
  `snackItemId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `price` double unsigned NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`snackItemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `SnackOrder` (
  `snackOrderId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `dateAndTimeOfOrder` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalCost` double unsigned NOT NULL,
  PRIMARY KEY (`snackOrderId`),
  KEY `snackOrderCustomerFk` (`customerId`),
  CONSTRAINT `snackOrderCustomerFk` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `SnackOrderItem` (
  `snackOrderId` int NOT NULL AUTO_INCREMENT,
  `snackItemId` int NOT NULL,
  `quantity` int unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`snackOrderId`),
  KEY `snackOrderItemMenuFk` (`snackItemId`),
  CONSTRAINT `snackOrderItemMenuFk` FOREIGN KEY (`snackItemId`) REFERENCES `SnackMenu` (`snackItemId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `snackOrderItemOrderFk` FOREIGN KEY (`snackOrderId`) REFERENCES `SnackOrder` (`snackOrderId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;