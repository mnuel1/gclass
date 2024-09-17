-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2024 at 12:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gclass`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `posts` longtext NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `class_id`, `posts`, `created_time`) VALUES
(1, 1, 'Homework: Complete Chapter 1 exercises', '2024-03-01 00:00:00'),
(2, 1, 'Quiz: Algebra Basics', '2024-03-02 01:00:00'),
(3, 1, 'Assignment: Solve Trigonometric Problems', '2024-03-03 02:00:00'),
(4, 1, 'Class Discussion: Geometry Concepts', '2024-03-04 03:00:00'),
(5, 1, 'Project: Create a Graph of Functions', '2024-03-05 04:00:00'),
(6, 2, 'Reading: Analyze Shakespeare’s Plays', '2024-03-01 05:00:00'),
(7, 2, 'Essay: Write about Romanticism', '2024-03-02 06:00:00'),
(8, 2, 'Discussion: Victorian Literature Trends', '2024-03-03 07:00:00'),
(9, 2, 'Presentation: Modern Poetry', '2024-03-04 08:00:00'),
(10, 2, 'Final Exam Review', '2024-03-05 09:00:00'),
(11, 3, 'Lab Report: Basic Biology Experiments', '2024-03-01 10:00:00'),
(12, 3, 'Quiz: Cell Structure', '2024-03-02 11:00:00'),
(13, 3, 'Homework: Genetics Problems', '2024-03-03 12:00:00'),
(14, 3, 'Project: Create a Plant Growth Journal', '2024-03-04 13:00:00'),
(15, 3, 'Discussion: Evolutionary Theory', '2024-03-05 14:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `instruction` varchar(900) NOT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `points` double NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `due_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `class_id`, `name`, `instruction`, `attachment`, `points`, `start_date`, `due_date`, `modified_time`) VALUES
(1, 1, 'Algebra Exercise 1', 'Solve the equations provided in the document.', 'https://example.com/algebra1.pdf', 100, '2024-02-29 16:00:00', '2024-03-06 16:00:00', '2024-03-01 00:00:00'),
(2, 1, 'Trigonometry Worksheet', 'Complete the worksheet on trigonometric functions.', 'https://example.com/trigworksheet.pdf', 80, '2024-03-01 16:00:00', '2024-03-07 16:00:00', '2024-03-02 01:00:00'),
(3, 1, 'Geometry Proofs', 'Write detailed proofs for the given geometry problems.', 'https://example.com/geometryproofs.pdf', 90, '2024-03-02 16:00:00', '2024-03-08 16:00:00', '2024-03-03 02:00:00'),
(4, 1, 'Graphing Functions', 'Create graphs for the functions listed in the assignment.', 'https://example.com/graphingfunctions.pdf', 85, '2024-03-03 16:00:00', '2024-03-09 16:00:00', '2024-03-04 03:00:00'),
(5, 1, 'Math Project', 'Complete the final project on mathematical modeling.', 'https://example.com/mathproject.pdf', 150, '2024-03-04 16:00:00', '2024-03-14 16:00:00', '2024-03-05 04:00:00'),
(6, 2, 'Shakespeare Analysis Essay', 'Write a 1500-word essay on Shakespeare’s use of soliloquies.', 'https://example.com/shakespeareessay.docx', 100, '2024-02-29 16:00:00', '2024-03-09 16:00:00', '2024-03-01 05:00:00'),
(7, 2, 'Poetry Presentation', 'Prepare a presentation on Romantic poets.', 'https://example.com/poetspresentation.pptx', 80, '2024-03-01 16:00:00', '2024-03-11 16:00:00', '2024-03-02 06:00:00'),
(8, 2, 'Literary Criticism Assignment', 'Analyze a piece of modern literature and provide a critique.', 'https://example.com/literarycriticism.docx', 90, '2024-03-02 16:00:00', '2024-03-12 16:00:00', '2024-03-03 07:00:00'),
(9, 2, 'Victorian Era Research Paper', 'Research and write a paper on Victorian literature.', 'https://example.com/victorianpaper.pdf', 120, '2024-03-03 16:00:00', '2024-03-13 16:00:00', '2024-03-04 08:00:00'),
(10, 2, 'Final Exam Preparation', 'Prepare for the final exam with a comprehensive review.', 'https://example.com/finalreview.pdf', 100, '2024-03-04 16:00:00', '2024-03-19 16:00:00', '2024-03-05 09:00:00'),
(11, 3, 'Biology Lab Report 1', 'Complete the lab report for the first biology experiment.', 'https://example.com/labreport1.docx', 100, '2024-02-29 16:00:00', '2024-03-06 16:00:00', '2024-03-01 10:00:00'),
(12, 3, 'Genetics Homework', 'Solve the provided genetics problems and submit your answers.', 'https://example.com/geneticshomework.pdf', 85, '2024-03-01 16:00:00', '2024-03-07 16:00:00', '2024-03-02 11:00:00'),
(13, 3, 'Plant Growth Project', 'Document the growth of plants over several weeks.', 'https://example.com/plantgrowthproject.docx', 120, '2024-03-02 16:00:00', '2024-03-13 16:00:00', '2024-03-03 12:00:00'),
(14, 3, 'Evolution Discussion Paper', 'Write a paper on evolutionary theory and its implications.', 'https://example.com/evolutionpaper.pdf', 100, '2024-03-03 16:00:00', '2024-03-14 16:00:00', '2024-03-04 13:00:00'),
(15, 3, 'Biology Quiz', 'Complete the quiz on cell biology and submit it online.', 'https://example.com/biologyquiz.pdf', 70, '2024-03-04 16:00:00', '2024-03-11 16:00:00', '2024-03-05 14:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(11) NOT NULL,
  `class_string_id` varchar(200) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `class_string_id`, `teacher_id`, `name`, `description`, `created_time`) VALUES
(1, 'C3001', 1, 'Math 101', 'Introduction to basic mathematics.', '2024-03-01 00:00:00'),
(2, 'C3002', 1, 'English Literature', 'Study of classic and modern literature.', '2024-03-02 01:00:00'),
(3, 'C3003', 1, 'Biology 101', 'Fundamentals of biology and life sciences.', '2024-03-03 02:00:00'),
(4, 'C3004', 1, 'Chemistry 101', 'Introduction to chemical principles and reactions.', '2024-03-04 03:00:00'),
(5, 'C3005', 1, 'Physics 101', 'Basic concepts of physics and mechanics.', '2024-03-05 04:00:00'),
(6, 'C3006', 2, 'History 101', 'Overview of historical events and periods.', '2024-03-06 05:00:00'),
(7, 'C3007', 2, 'Art History', 'Exploration of art movements and history.', '2024-03-07 06:00:00'),
(8, 'C3008', 2, 'Computer Science', 'Introduction to programming and computer systems.', '2024-03-08 07:00:00'),
(9, 'C3009', 2, 'Philosophy 101', 'Introduction to philosophical concepts and thinkers.', '2024-03-09 08:00:00'),
(10, 'C3010', 2, 'Economics 101', 'Basic principles of economics and market systems.', '2024-03-10 09:00:00'),
(11, 'C3011', 3, 'Geography 101', 'Study of physical and human geography.', '2024-03-11 00:00:00'),
(12, 'C3012', 3, 'Sociology 101', 'Introduction to sociological theories and research.', '2024-03-12 01:00:00'),
(13, 'C3013', 3, 'Political Science', 'Overview of political systems and theories.', '2024-03-13 02:00:00'),
(14, 'C3014', 3, 'Environmental Science', 'Study of environmental issues and sustainability.', '2024-03-14 03:00:00'),
(15, 'C3015', 3, 'Statistics 101', 'Introduction to statistical methods and analysis.', '2024-03-15 04:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `class_assignments`
--

CREATE TABLE `class_assignments` (
  `class_assignment_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `form_id` int(11) DEFAULT NULL,
  `form_answers` longtext DEFAULT NULL,
  `assignment_status` enum('Turned In','Not Turned In','Pending','Late Turned In','Returned','To Grade') NOT NULL DEFAULT 'Pending',
  `pass_date` timestamp NULL DEFAULT NULL,
  `grade` double NOT NULL,
  `attachments` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_assignments`
--

INSERT INTO `class_assignments` (`class_assignment_id`, `assignment_id`, `student_id`, `form_id`, `form_answers`, `assignment_status`, `pass_date`, `grade`, `attachments`) VALUES
(1, 1, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(2, 2, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(3, 3, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(4, 4, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(5, 5, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(6, 1, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(7, 2, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(8, 3, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(9, 4, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(10, 5, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(11, 1, 3, NULL, NULL, 'Pending', NULL, 0, ''),
(12, 2, 3, NULL, NULL, 'Pending', NULL, 0, ''),
(13, 3, 3, NULL, NULL, 'Pending', NULL, 0, ''),
(14, 4, 3, NULL, NULL, 'Pending', NULL, 0, ''),
(15, 5, 3, NULL, NULL, 'Pending', NULL, 0, ''),
(16, 6, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(17, 7, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(18, 8, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(19, 9, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(20, 10, 1, NULL, NULL, 'Pending', NULL, 0, ''),
(21, 6, 4, NULL, NULL, 'Pending', NULL, 0, ''),
(22, 7, 4, NULL, NULL, 'Pending', NULL, 0, ''),
(23, 8, 4, NULL, NULL, 'Pending', NULL, 0, ''),
(24, 9, 4, NULL, NULL, 'Pending', NULL, 0, ''),
(25, 10, 4, NULL, NULL, 'Pending', NULL, 0, ''),
(26, 6, 5, NULL, NULL, 'Pending', NULL, 0, ''),
(27, 7, 5, NULL, NULL, 'Pending', NULL, 0, ''),
(28, 8, 5, NULL, NULL, 'Pending', NULL, 0, ''),
(29, 9, 5, NULL, NULL, 'Pending', NULL, 0, ''),
(30, 10, 5, NULL, NULL, 'Pending', NULL, 0, ''),
(31, 11, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(32, 12, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(33, 13, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(34, 14, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(35, 15, 2, NULL, NULL, 'Pending', NULL, 0, ''),
(36, 11, 6, NULL, NULL, 'Pending', NULL, 0, ''),
(37, 12, 6, NULL, NULL, 'Pending', NULL, 0, ''),
(38, 13, 6, NULL, NULL, 'Pending', NULL, 0, ''),
(39, 14, 6, NULL, NULL, 'Pending', NULL, 0, ''),
(40, 15, 6, NULL, NULL, 'Pending', NULL, 0, ''),
(41, 11, 7, NULL, NULL, 'Pending', NULL, 0, ''),
(42, 12, 7, NULL, NULL, 'Pending', NULL, 0, ''),
(43, 13, 7, NULL, NULL, 'Pending', NULL, 0, ''),
(44, 14, 7, NULL, NULL, 'Pending', NULL, 0, ''),
(45, 15, 7, NULL, NULL, 'Pending', NULL, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `class_meetings`
--

CREATE TABLE `class_meetings` (
  `class_meeting_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attendance_attachment` varchar(200) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class_students`
--

CREATE TABLE `class_students` (
  `class_student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `student_Id` int(200) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_students`
--

INSERT INTO `class_students` (`class_student_id`, `class_id`, `student_Id`, `created_time`) VALUES
(1, 1, 1, '2024-03-01 00:00:00'),
(2, 1, 2, '2024-03-01 00:00:00'),
(3, 1, 3, '2024-03-01 00:00:00'),
(4, 2, 1, '2024-03-02 01:00:00'),
(5, 2, 4, '2024-03-02 01:00:00'),
(6, 2, 5, '2024-03-02 01:00:00'),
(7, 3, 2, '2024-03-03 02:00:00'),
(8, 3, 6, '2024-03-03 02:00:00'),
(9, 3, 7, '2024-03-03 02:00:00'),
(10, 4, 3, '2024-03-04 03:00:00'),
(11, 4, 8, '2024-03-04 03:00:00'),
(12, 4, 9, '2024-03-04 03:00:00'),
(13, 5, 4, '2024-03-05 04:00:00'),
(14, 5, 10, '2024-03-05 04:00:00'),
(15, 5, 11, '2024-03-05 04:00:00'),
(16, 6, 5, '2024-03-06 05:00:00'),
(17, 6, 12, '2024-03-06 05:00:00'),
(18, 6, 13, '2024-03-06 05:00:00'),
(19, 7, 6, '2024-03-07 06:00:00'),
(20, 7, 7, '2024-03-07 06:00:00'),
(21, 7, 14, '2024-03-07 06:00:00'),
(22, 8, 8, '2024-03-08 07:00:00'),
(23, 8, 9, '2024-03-08 07:00:00'),
(24, 8, 15, '2024-03-08 07:00:00'),
(25, 9, 10, '2024-03-09 08:00:00'),
(26, 9, 11, '2024-03-09 08:00:00'),
(27, 9, 12, '2024-03-09 08:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `form_id` int(11) NOT NULL,
  `form_questions` longtext NOT NULL,
  `form_right_answers` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `student_string_id` varchar(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `middle_name` varchar(200) NOT NULL,
  `email_address` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_string_id`, `first_name`, `last_name`, `middle_name`, `email_address`, `password`, `created_time`, `modified_time`) VALUES
(1, 'S1001', 'John', 'Doe', 'Michael', 'john.doe@example.com', 'password123', '2024-01-15 00:30:00', '2024-01-15 00:35:00'),
(2, 'S1002', 'Jane', 'Smith', 'Elizabeth', 'jane.smith@example.com', 'securepass', '2024-01-16 01:00:00', '2024-01-16 01:05:00'),
(3, 'S1003', 'Emily', 'Johnson', 'Rose', 'emily.johnson@example.com', 'mypassword', '2024-01-17 01:30:00', '2024-01-17 01:35:00'),
(4, 'S1004', 'Michael', 'Brown', 'James', 'michael.brown@example.com', 'password456', '2024-01-18 02:00:00', '2024-01-18 02:05:00'),
(5, 'S1005', 'Jessica', 'Davis', 'Marie', 'jessica.davis@example.com', '123password', '2024-01-19 02:30:00', '2024-01-19 02:35:00'),
(6, 'S1006', 'David', 'Miller', 'William', 'david.miller@example.com', 'passw0rd', '2024-01-20 03:00:00', '2024-01-20 03:05:00'),
(7, 'S1007', 'Sophia', 'Wilson', 'Ann', 'sophia.wilson@example.com', 'password789', '2024-01-21 03:30:00', '2024-01-21 03:35:00'),
(8, 'S1008', 'James', 'Moore', 'Robert', 'james.moore@example.com', 'qwerty123', '2024-01-22 04:00:00', '2024-01-22 04:05:00'),
(9, 'S1009', 'Olivia', 'Taylor', 'Grace', 'olivia.taylor@example.com', 'abc12345', '2024-01-23 04:30:00', '2024-01-23 04:35:00'),
(10, 'S1010', 'William', 'Anderson', 'Henry', 'william.anderson@example.com', 'letmein', '2024-01-24 05:00:00', '2024-01-24 05:05:00'),
(11, 'S1011', 'Ava', 'Thomas', 'Jane', 'ava.thomas@example.com', 'password1', '2024-01-25 05:30:00', '2024-01-25 05:35:00'),
(12, 'S1012', 'Lucas', 'Jackson', 'Thomas', 'lucas.jackson@example.com', 'myp@ssw0rd', '2024-01-26 06:00:00', '2024-01-26 06:05:00'),
(13, 'S1013', 'Mia', 'White', 'Olivia', 'mia.white@example.com', '123456', '2024-01-27 06:30:00', '2024-01-27 06:35:00'),
(14, 'S1014', 'Ethan', 'Harris', 'Jacob', 'ethan.harris@example.com', 'password321', '2024-01-28 07:00:00', '2024-01-28 07:05:00'),
(15, 'S1015', 'Isabella', 'Martin', 'Lily', 'isabella.martin@example.com', 'welcome123', '2024-01-29 07:30:00', '2024-01-29 07:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_string_id` varchar(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `middle_name` varchar(200) NOT NULL,
  `email_address` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_string_id`, `first_name`, `last_name`, `middle_name`, `email_address`, `password`, `created_time`, `modified_time`) VALUES
(1, 'T2001', 'Alice', 'Johnson', 'Marie', 'alice.johnson@example.com', 'teachpass1', '2024-02-01 00:30:00', '2024-02-01 00:35:00'),
(2, 'T2002', 'Bob', 'Smith', 'Lee', 'bob.smith@example.com', 'teachpass2', '2024-02-02 01:00:00', '2024-02-02 01:05:00'),
(3, 'T2003', 'Catherine', 'Williams', 'Anne', 'catherine.williams@example.com', 'teachpass3', '2024-02-03 01:30:00', '2024-02-03 01:35:00'),
(4, 'T2004', 'David', 'Brown', 'Charles', 'david.brown@example.com', 'teachpass4', '2024-02-04 02:00:00', '2024-02-04 02:05:00'),
(5, 'T2005', 'Emily', 'Jones', 'Nicole', 'emily.jones@example.com', 'teachpass5', '2024-02-05 02:30:00', '2024-02-05 02:35:00'),
(6, 'T2006', 'Frank', 'Garcia', 'Luis', 'frank.garcia@example.com', 'teachpass6', '2024-02-06 03:00:00', '2024-02-06 03:05:00'),
(7, 'T2007', 'Grace', 'Martinez', 'Sofia', 'grace.martinez@example.com', 'teachpass7', '2024-02-07 03:30:00', '2024-02-07 03:35:00'),
(8, 'T2008', 'Henry', 'Rodriguez', 'James', 'henry.rodriguez@example.com', 'teachpass8', '2024-02-08 04:00:00', '2024-02-08 04:05:00'),
(9, 'T2009', 'Isabella', 'Hernandez', 'Eva', 'isabella.hernandez@example.com', 'teachpass9', '2024-02-09 04:30:00', '2024-02-09 04:35:00'),
(10, 'T2010', 'Jack', 'Lopez', 'Michael', 'jack.lopez@example.com', 'teachpass10', '2024-02-10 05:00:00', '2024-02-10 05:05:00'),
(11, 'T2011', 'Katherine', 'Wilson', 'Marie', 'katherine.wilson@example.com', 'teachpass11', '2024-02-11 05:30:00', '2024-02-11 05:35:00'),
(12, 'T2012', 'Liam', 'Anderson', 'Henry', 'liam.anderson@example.com', 'teachpass12', '2024-02-12 06:00:00', '2024-02-12 06:05:00'),
(13, 'T2013', 'Mia', 'Thomas', 'Olivia', 'mia.thomas@example.com', 'teachpass13', '2024-02-13 06:30:00', '2024-02-13 06:35:00'),
(14, 'T2014', 'Noah', 'Taylor', 'Samuel', 'noah.taylor@example.com', 'teachpass14', '2024-02-14 07:00:00', '2024-02-14 07:05:00'),
(15, 'T2015', 'Olivia', 'Jackson', 'Ava', 'olivia.jackson@example.com', 'teachpass15', '2024-02-15 07:30:00', '2024-02-15 07:35:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `class-relation-activity` (`class_id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `class-relation-assignment` (`class_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `teacher-relation` (`teacher_id`);

--
-- Indexes for table `class_assignments`
--
ALTER TABLE `class_assignments`
  ADD PRIMARY KEY (`class_assignment_id`),
  ADD KEY `student-relation` (`student_id`),
  ADD KEY `form-relation` (`form_id`),
  ADD KEY `assigment-relation` (`assignment_id`);

--
-- Indexes for table `class_meetings`
--
ALTER TABLE `class_meetings`
  ADD PRIMARY KEY (`class_meeting_id`),
  ADD KEY `class-relation-meeting` (`class_id`);

--
-- Indexes for table `class_students`
--
ALTER TABLE `class_students`
  ADD PRIMARY KEY (`class_student_id`),
  ADD KEY `class-students-relation` (`student_Id`),
  ADD KEY `class-class-relation` (`class_id`);

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`form_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email_address` (`email_address`),
  ADD UNIQUE KEY `student_string_id` (`student_string_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `emaill_address` (`email_address`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `class_assignments`
--
ALTER TABLE `class_assignments`
  MODIFY `class_assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `class_meetings`
--
ALTER TABLE `class_meetings`
  MODIFY `class_meeting_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `class_students`
--
ALTER TABLE `class_students`
  MODIFY `class_student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `class-relation-activity` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `class-relation-assignment` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `teacher-relation` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_assignments`
--
ALTER TABLE `class_assignments`
  ADD CONSTRAINT `assigment-relation` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `form-relation` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student-relation` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_meetings`
--
ALTER TABLE `class_meetings`
  ADD CONSTRAINT `class-relation-meeting` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_students`
--
ALTER TABLE `class_students`
  ADD CONSTRAINT `class-class-relation` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `class-students-relation` FOREIGN KEY (`student_Id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
