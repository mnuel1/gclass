-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: gclass
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `class_meeting_id` int DEFAULT NULL,
  `posts` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `link` text COLLATE utf8mb4_general_ci,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`activity_id`),
  KEY `class-relation-activity` (`class_id`),
  KEY `activity-relation-activity` (`class_meeting_id`),
  CONSTRAINT `activity-relation-activity` FOREIGN KEY (`class_meeting_id`) REFERENCES `class_meetings` (`class_meeting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class-relation-activity` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (32,47,NULL,'A new assignment, First Assignment, has been created. Please review \n        the assignment details and submit it before the deadline.',NULL,'2024-10-14 18:04:37'),(33,47,NULL,'A new assignment, Second assignment, has been created. Please review \n        the assignment details and submit it before the deadline.',NULL,'2024-10-14 19:18:09'),(35,47,16,'<h4 class=\'text-sm\'>\n            Meeting now: First Meeting<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>','/meeting/47/First%20Meeting','2024-10-14 20:14:43'),(36,47,NULL,'A new assignment, New assignment, has been created. Please review \n        the assignment details and submit it before the deadline.',NULL,'2024-10-15 12:25:28'),(37,47,NULL,'A new assignment, test again, has been created. Please review \n        the assignment details and submit it before the deadline.',NULL,'2024-10-15 13:19:32'),(38,47,20,'<h4 class=\'text-sm\'>\n            Meeting now : Hello world<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>','/meeting/47/Hello%20world47','2024-11-26 11:00:14');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` text COLLATE utf8mb4_general_ci NOT NULL,
  `pass` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `instruction` varchar(900) COLLATE utf8mb4_general_ci NOT NULL,
  `attachment` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `points` double NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assignment_id`),
  KEY `class-relation-assignment` (`class_id`),
  CONSTRAINT `class-relation-assignment` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (65,47,'First Assignment','i edited the instruction',NULL,100,'2024-10-14 18:04:37','2024-10-13 18:16:00','2024-10-14 18:04:37'),(66,47,'Second assignment','just answer',NULL,100,'2024-10-14 19:18:09','2024-10-13 18:16:00','2024-10-14 19:18:09'),(67,47,'New assignment','just assignment',NULL,100,'2024-10-15 12:25:28','2024-10-15 12:25:00','2024-10-15 12:25:28'),(68,47,'test again','',NULL,100,'2024-10-15 13:19:32','2024-10-18 13:19:00','2024-10-15 13:19:32');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `attachment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `reply_id` int DEFAULT NULL,
  `file_name` varchar(60) NOT NULL,
  `file_path` varchar(100) NOT NULL,
  `type` varchar(45) NOT NULL,
  `uploaded_at` datetime NOT NULL,
  PRIMARY KEY (`attachment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_string_id` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `teacher_id` int NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`class_id`),
  KEY `teacher-relation` (`teacher_id`),
  CONSTRAINT `teacher-relation` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (6,'C3006',2,'History 101','Overview of historical events and periods.','2024-03-06 05:00:00'),(7,'C3007',2,'Art History','Exploration of art movements and history.','2024-03-07 06:00:00'),(8,'C3008',2,'Computer Science','Introduction to programming and computer systems.','2024-03-08 07:00:00'),(9,'C3009',2,'Philosophy 101','Introduction to philosophical concepts and thinkers.','2024-03-09 08:00:00'),(10,'C3010',2,'Economics 101','Basic principles of economics and market systems.','2024-03-10 09:00:00'),(11,'C3011',3,'Geography 101','Study of physical and human geography.','2024-03-11 00:00:00'),(12,'C3012',3,'Sociology 101','Introduction to sociological theories and research.','2024-03-12 01:00:00'),(13,'C3013',3,'Political Science','Overview of political systems and theories.','2024-03-13 02:00:00'),(14,'C3014',3,'Environmental Science','Study of environmental issues and sustainability.','2024-03-14 03:00:00'),(15,'C3015',3,'Statistics 101','Introduction to statistical methods and analysis.','2024-03-15 04:00:00'),(37,'CFC-0016',16,'FIRST CLASS','CLASS 1','2024-09-18 12:28:20'),(47,'viZohQ',1,'Class 101','','2024-10-14 18:02:46');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_assignments`
--

DROP TABLE IF EXISTS `class_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_assignments` (
  `class_assignment_id` int NOT NULL AUTO_INCREMENT,
  `assignment_id` int NOT NULL,
  `student_id` int NOT NULL,
  `form_id` int DEFAULT NULL,
  `form_answers` longtext COLLATE utf8mb4_general_ci,
  `assignment_status` enum('Turned In','Not Turned In','Pending','Late Turned In','Returned','To Grade') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  `pass_date` timestamp NULL DEFAULT NULL,
  `grade` double NOT NULL,
  `attachments` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`class_assignment_id`),
  KEY `student-relation` (`student_id`),
  KEY `form-relation` (`form_id`),
  KEY `assigment-relation` (`assignment_id`),
  CONSTRAINT `assigment-relation` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `form-relation` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student-relation` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_assignments`
--

LOCK TABLES `class_assignments` WRITE;
/*!40000 ALTER TABLE `class_assignments` DISABLE KEYS */;
INSERT INTO `class_assignments` VALUES (180,65,16,NULL,NULL,'Returned','2024-10-14 18:04:50',100,'uploads/attachment-1728929090614.pdf'),(181,65,15,NULL,NULL,'Not Turned In',NULL,0,''),(182,65,1,NULL,NULL,'Not Turned In',NULL,0,''),(183,66,16,NULL,NULL,'Late Turned In','2024-10-14 19:24:22',0,'uploads/attachment-1728933862637.pdf'),(184,66,1,NULL,NULL,'Not Turned In',NULL,0,''),(185,66,15,NULL,NULL,'Not Turned In',NULL,0,''),(186,67,16,NULL,NULL,'Not Turned In',NULL,0,''),(187,67,1,NULL,NULL,'Not Turned In',NULL,0,''),(188,67,15,NULL,NULL,'Not Turned In',NULL,0,''),(189,68,16,NULL,NULL,'Turned In','2024-10-15 21:58:36',0,'uploads/attachment-1729029516177.pdf'),(190,68,1,NULL,NULL,'Returned','2024-10-15 22:00:03',100,'uploads/attachment-1729029603328.pdf'),(191,68,15,NULL,NULL,'Not Turned In',NULL,0,'');
/*!40000 ALTER TABLE `class_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_meetings`
--

DROP TABLE IF EXISTS `class_meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_meetings` (
  `class_meeting_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `link` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`class_meeting_id`),
  KEY `class-relation-meeting` (`class_id`),
  CONSTRAINT `class-relation-meeting` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_meetings`
--

LOCK TABLES `class_meetings` WRITE;
/*!40000 ALTER TABLE `class_meetings` DISABLE KEYS */;
INSERT INTO `class_meetings` VALUES (16,47,'First Meeting','/meeting/47/First%20Meeting','2024-10-14 20:11:20','2024-10-14 20:11:20'),(17,47,'Scheduled meeting','/meeting/47/Scheduled%20meeting','2024-10-16 20:42:00','2024-10-14 20:42:43'),(18,47,'Ecommerce Site','/meeting/47/Ecommerce%20Site','2024-10-18 20:43:00','2024-10-14 20:43:34'),(19,47,'Ecommerce Site','/meeting/47/Ecommerce%20Site','2024-10-18 20:43:00','2024-10-14 20:44:42'),(20,47,'Hello world','/meeting/47/Hello%20world47','2024-11-26 11:00:14','2024-11-26 11:00:14');
/*!40000 ALTER TABLE `class_meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_students`
--

DROP TABLE IF EXISTS `class_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_students` (
  `class_student_id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `student_Id` int NOT NULL,
  `status` enum('Approved','Rejected','Pending','') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`class_student_id`),
  KEY `class-students-relation` (`student_Id`),
  KEY `class-class-relation` (`class_id`),
  CONSTRAINT `class-class-relation` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class-students-relation` FOREIGN KEY (`student_Id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_students`
--

LOCK TABLES `class_students` WRITE;
/*!40000 ALTER TABLE `class_students` DISABLE KEYS */;
INSERT INTO `class_students` VALUES (16,6,5,'Pending','2024-03-06 05:00:00'),(17,6,12,'Pending','2024-03-06 05:00:00'),(18,6,13,'Pending','2024-03-06 05:00:00'),(19,7,6,'Pending','2024-03-07 06:00:00'),(20,7,7,'Pending','2024-03-07 06:00:00'),(21,7,14,'Pending','2024-03-07 06:00:00'),(22,8,8,'Pending','2024-03-08 07:00:00'),(23,8,9,'Pending','2024-03-08 07:00:00'),(24,8,15,'Pending','2024-03-08 07:00:00'),(25,9,10,'Pending','2024-03-09 08:00:00'),(26,9,11,'Pending','2024-03-09 08:00:00'),(27,9,12,'Pending','2024-03-09 08:00:00'),(42,47,16,'Approved','2024-10-22 13:32:05'),(43,47,1,'Approved','2024-10-22 12:40:27');
/*!40000 ALTER TABLE `class_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form` (
  `form_id` int NOT NULL AUTO_INCREMENT,
  `form_questions` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `form_right_answers` longtext COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form`
--

LOCK TABLES `form` WRITE;
/*!40000 ALTER TABLE `form` DISABLE KEYS */;
/*!40000 ALTER TABLE `form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `content` varchar(600) DEFAULT NULL,
  `post_type` enum('Meeting','Assignment','Regular') DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `fk_students_idx` (`student_id`),
  KEY `fk_teachers_idx` (`teacher_id`),
  CONSTRAINT `fk_students` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `fk_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `reaction_id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `reply_id` int DEFAULT NULL,
  `type` enum('like','love','laugh','sad','angry') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`reaction_id`),
  KEY `fk_teachers_idx` (`teacher_id`),
  KEY `fk_students_idx` (`student_id`),
  KEY `fk_posts_idx` (`post_id`),
  CONSTRAINT `fk_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `fk_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (4,NULL,2,1,NULL,'love','2024-11-28 18:00:43');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `replies` (
  `reply_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `teacher_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `post_ibfk_1_idx` (`post_id`),
  KEY `teacher_ibfk_1_idx` (`teacher_id`),
  KEY `student_ibfk_1_idx` (`student_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_string_id` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `email_address` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `email_address` (`email_address`),
  UNIQUE KEY `student_string_id` (`student_string_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'S1001','John','Doe','Michael','abc888043@gmail.com','$2b$10$zWmSMhf2BD5LnEViPJSthu8w1EmxyOXElUC6Gt/UDglyyV1yWHKPe','2024-01-15 00:30:00','2024-01-15 00:35:00'),(2,'S1002','Jane','Smith','Elizabeth','jane.smith@example.com','securepass','2024-01-16 01:00:00','2024-01-16 01:05:00'),(3,'S1003','Emily','Johnson','Rose','emily.johnson@example.com','mypassword','2024-01-17 01:30:00','2024-01-17 01:35:00'),(4,'S1004','Michael','Brown','James','michael.brown@example.com','password456','2024-01-18 02:00:00','2024-01-18 02:05:00'),(5,'S1005','Jessica','Davis','Marie','jessica.davis@example.com','123password','2024-01-19 02:30:00','2024-01-19 02:35:00'),(6,'S1006','David','Miller','William','david.miller@example.com','passw0rd','2024-01-20 03:00:00','2024-01-20 03:05:00'),(7,'S1007','Sophia','Wilson','Ann','sophia.wilson@example.com','password789','2024-01-21 03:30:00','2024-01-21 03:35:00'),(8,'S1008','James','Moore','Robert','james.moore@example.com','qwerty123','2024-01-22 04:00:00','2024-01-22 04:05:00'),(9,'S1009','Olivia','Taylor','Grace','olivia.taylor@example.com','abc12345','2024-01-23 04:30:00','2024-01-23 04:35:00'),(10,'S1010','William','Anderson','Henry','william.anderson@example.com','letmein','2024-01-24 05:00:00','2024-01-24 05:05:00'),(11,'S1011','Ava','Thomas','Jane','ava.thomas@example.com','password1','2024-01-25 05:30:00','2024-01-25 05:35:00'),(12,'S1012','Lucas','Jackson','Thomas','lucas.jackson@example.com','myp@ssw0rd','2024-01-26 06:00:00','2024-01-26 06:05:00'),(13,'S1013','Mia','White','Olivia','mia.white@example.com','123456','2024-01-27 06:30:00','2024-01-27 06:35:00'),(14,'S1014','Ethan','Harris','Jacob','ethan.harris@example.com','password321','2024-01-28 07:00:00','2024-01-28 07:05:00'),(15,'S1015','Isabella','Martin','Lily','isabella.martin@example.com','welcome123','2024-01-29 07:30:00','2024-01-29 07:35:00'),(16,'','Man','Ok','Yes','example@gmail.com','$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK','2024-09-21 10:22:22','2024-09-21 10:22:22'),(17,'2F0PgJ','Man','Man','Mans','mansplinterlands.2@gmail.com','$2b$10$3RKMe/TyASG71IVIP7CpfexvcAS9DtqHnAl3nOoljkkh6PjqEV3va','2024-10-01 16:41:21','2024-10-01 16:41:21'),(19,'BmXkZM','assada','asdsad','test','mansplinterlands.22@gmail.com','$2b$10$hv1Lx5S.SHGj3YHfHesm6uw0OZzJZxLWVpC7yv4/Qznbs7DFr1ms2','2024-10-14 15:12:10','2024-10-14 15:12:10'),(20,'johcFA','asdasd','asdasdas','asdasd','mansplinterlands.222@gmail.com','$2b$10$GQ2954QY9zD8rtMsbwGqFeW1P21Hx2O2p52hmE9qTtY80z2H.AD7S','2024-10-14 15:15:05','2024-10-14 15:15:05'),(23,'vkVIzq','another','one','one','abc8188043@gmail.com','$2b$10$f89UR3cVMmRaIn2cyQmlVemFlMgTUNbfWXuutcYzDPGC7YSR7nxWO','2024-10-15 12:37:15','2024-10-15 12:37:15'),(24,'APk9KP','Ashley','Lumibao','Pontay','ashlumibao1602@gmail.com','$2b$10$Ih09YfvCYoWWFNaYFQ7tMewYMueUiMcR7rSI4vIwPrgidv3u3JyWy','2024-11-26 04:03:24','2024-11-26 04:03:24');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `teacher_string_id` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `email_address` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('Approved','Rejected','Pending','') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`teacher_id`),
  UNIQUE KEY `emaill_address` (`email_address`),
  UNIQUE KEY `teacher_string` (`teacher_string_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'T2001','Alice','Johnson','Marie','alice.johnson@example.com','$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK','Approved','2024-02-01 00:30:00','2024-02-01 00:35:00'),(2,'T2002','Bob','Smith','Lee','bob.smith@example.com','teachpass2','Pending','2024-02-02 01:00:00','2024-02-02 01:05:00'),(3,'T2003','Catherine','Williams','Anne','catherine.williams@example.com','teachpass3','Pending','2024-02-03 01:30:00','2024-02-03 01:35:00'),(4,'T2004','David','Brown','Charles','david.brown@example.com','teachpass4','Pending','2024-02-04 02:00:00','2024-02-04 02:05:00'),(5,'T2005','Emily','Jones','Nicole','emily.jones@example.com','teachpass5','Pending','2024-02-05 02:30:00','2024-02-05 02:35:00'),(6,'T2006','Frank','Garcia','Luis','frank.garcia@example.com','teachpass6','Pending','2024-02-06 03:00:00','2024-02-06 03:05:00'),(7,'T2007','Grace','Martinez','Sofia','grace.martinez@example.com','teachpass7','Pending','2024-02-07 03:30:00','2024-02-07 03:35:00'),(8,'T2008','Henry','Rodriguez','James','henry.rodriguez@example.com','teachpass8','Pending','2024-02-08 04:00:00','2024-02-08 04:05:00'),(9,'T2009','Isabella','Hernandez','Eva','isabella.hernandez@example.com','teachpass9','Pending','2024-02-09 04:30:00','2024-02-09 04:35:00'),(10,'T2010','Jack','Lopez','Michael','jack.lopez@example.com','teachpass10','Pending','2024-02-10 05:00:00','2024-02-10 05:05:00'),(11,'T2011','Katherine','Wilson','Marie','katherine.wilson@example.com','teachpass11','Pending','2024-02-11 05:30:00','2024-02-11 05:35:00'),(12,'T2012','Liam','Anderson','Henry','liam.anderson@example.com','teachpass12','Pending','2024-02-12 06:00:00','2024-02-12 06:05:00'),(13,'T2013','Mia','Thomas','Olivia','mia.thomas@example.com','teachpass13','Pending','2024-02-13 06:30:00','2024-02-13 06:35:00'),(14,'EjuN27','Noah','Taylor','Samuel','abc888043@gmail.com','$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK','Approved','2024-02-14 07:00:00','2024-02-14 07:05:00'),(15,'g9YJyJ','Olivia','Jackson','Ava','olivia.jackson@example.com','teachpass15','Approved','2024-02-15 07:30:00','2024-02-15 07:35:00'),(16,'F2BSnw','Manuel','Marin','Armentano','abc8880431@gmail.com','$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK','Approved','2024-09-18 11:35:42','2024-09-18 11:35:42'),(17,NULL,'test','test','test','mansplinterlands.2@gmail.com','$2b$10$ZzG8NKyQIC6nrbZ/0MhaJujipQ5cMQK5/iAkQGdFtuRJajgBZjLey','Approved','2024-10-13 02:30:58','2024-10-13 02:30:58');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 20:20:30
