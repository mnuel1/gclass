-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2024 at 02:13 PM
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
  `class_meeting_id` int(11) DEFAULT NULL,
  `posts` longtext NOT NULL,
  `link` text DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `class_id`, `class_meeting_id`, `posts`, `link`, `created_time`) VALUES
(32, 47, NULL, 'A new assignment, First Assignment, has been created. Please review \n        the assignment details and submit it before the deadline.', NULL, '2024-10-14 18:04:37'),
(33, 47, NULL, 'A new assignment, Second assignment, has been created. Please review \n        the assignment details and submit it before the deadline.', NULL, '2024-10-14 19:18:09'),
(35, 47, 16, '<h4 class=\'text-sm\'>\n            Meeting now: First Meeting<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>', '/meeting/47/First%20Meeting', '2024-10-14 20:14:43'),
(36, 47, NULL, 'A new assignment, New assignment, has been created. Please review \n        the assignment details and submit it before the deadline.', NULL, '2024-10-15 12:25:28'),
(37, 47, NULL, 'A new assignment, test again, has been created. Please review \n        the assignment details and submit it before the deadline.', NULL, '2024-10-15 13:19:32'),
(38, 48, 20, '<h4 class=\'text-sm\'>\n            Meeting now : test<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>', '/meeting/48/test48', '2024-11-10 08:02:17'),
(39, 47, 21, '<h4 class=\'text-sm\'>\n            Meeting now : The meeting<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>', '/meeting/47/The%20meeting47', '2024-12-01 08:08:41'),
(40, 47, 22, '<h4 class=\'text-sm\'>\n            Meeting now : sadadadasdsd<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>', '/meeting/47/sadadadasdsd47', '2024-12-01 08:10:58'),
(41, 47, 23, '<h4 class=\'text-sm\'>\n            Meeting now : asdadasasdasd<br />\n            Don\'t forget, we\'ve got a meeting today! Click the link below to join:<br />            \n            See you there!\n            </h4>', '/meeting/47/asdadasasdasd47', '2024-12-01 08:12:27');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `user` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `user`, `pass`) VALUES
(1, 'admin', '$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK');

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
(65, 47, 'First Assignment', 'i edited the instruction', NULL, 100, '2024-10-14 18:04:37', '2024-10-13 18:16:00', '2024-10-14 18:04:37'),
(66, 47, 'Second assignment', 'just answer', NULL, 100, '2024-10-14 19:18:09', '2024-10-13 18:16:00', '2024-10-14 19:18:09'),
(67, 47, 'New assignment', 'just assignment', NULL, 100, '2024-10-15 12:25:28', '2024-10-15 12:25:00', '2024-10-15 12:25:28'),
(68, 47, 'test again', '', NULL, 100, '2024-10-15 13:19:32', '2024-10-18 13:19:00', '2024-10-15 13:19:32');

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `attachment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `file_name` varchar(60) NOT NULL,
  `file_path` varchar(100) NOT NULL,
  `type` varchar(45) NOT NULL,
  `uploaded_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`attachment_id`, `post_id`, `reply_id`, `file_name`, `file_path`, `type`, `uploaded_at`) VALUES
(1, 16, NULL, 'document-e8dc0f19-excuse letter.pdf', 'uploads/attachments/documents', 'pdf', '2024-12-02 02:00:08'),
(2, 25, NULL, 'document-8a7b176c-excuse letter.pdf', 'uploads/attachments/documents', 'pdf', '2024-12-02 02:35:01');

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
(6, 'C3006', 2, 'History 101', 'Overview of historical events and periods.', '2024-03-06 05:00:00'),
(7, 'C3007', 2, 'Art History', 'Exploration of art movements and history.', '2024-03-07 06:00:00'),
(8, 'C3008', 2, 'Computer Science', 'Introduction to programming and computer systems.', '2024-03-08 07:00:00'),
(9, 'C3009', 2, 'Philosophy 101', 'Introduction to philosophical concepts and thinkers.', '2024-03-09 08:00:00'),
(10, 'C3010', 2, 'Economics 101', 'Basic principles of economics and market systems.', '2024-03-10 09:00:00'),
(11, 'C3011', 3, 'Geography 101', 'Study of physical and human geography.', '2024-03-11 00:00:00'),
(12, 'C3012', 3, 'Sociology 101', 'Introduction to sociological theories and research.', '2024-03-12 01:00:00'),
(13, 'C3013', 3, 'Political Science', 'Overview of political systems and theories.', '2024-03-13 02:00:00'),
(14, 'C3014', 3, 'Environmental Science', 'Study of environmental issues and sustainability.', '2024-03-14 03:00:00'),
(15, 'C3015', 3, 'Statistics 101', 'Introduction to statistical methods and analysis.', '2024-03-15 04:00:00'),
(37, 'CFC-0016', 16, 'FIRST CLASS', 'CLASS 1', '2024-09-18 12:28:20'),
(47, 'viZohQ', 1, 'Class 101', '', '2024-10-14 18:02:46'),
(48, '1ub61o', 18, 'test class', '', '2024-11-10 08:01:35');

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
(180, 65, 16, NULL, NULL, 'Returned', '2024-10-14 18:04:50', 100, 'uploads/attachment-1728929090614.pdf'),
(181, 65, 15, NULL, NULL, 'Not Turned In', NULL, 0, ''),
(182, 65, 1, NULL, NULL, 'Late Turned In', '2024-12-01 09:11:17', 0, 'uploads/attachment-1733044276992.pdf'),
(183, 66, 16, NULL, NULL, 'Late Turned In', '2024-10-14 19:24:22', 0, 'uploads/attachment-1728933862637.pdf'),
(184, 66, 1, NULL, NULL, 'Not Turned In', NULL, 0, ''),
(185, 66, 15, NULL, NULL, 'Not Turned In', NULL, 0, ''),
(186, 67, 16, NULL, NULL, 'Not Turned In', NULL, 0, ''),
(187, 67, 1, NULL, NULL, 'Not Turned In', NULL, 0, ''),
(188, 67, 15, NULL, NULL, 'Not Turned In', NULL, 0, ''),
(189, 68, 16, NULL, NULL, 'Turned In', '2024-10-15 21:58:36', 0, 'uploads/attachment-1729029516177.pdf'),
(190, 68, 1, NULL, NULL, 'Returned', '2024-10-15 22:00:03', 100, 'uploads/attachment-1729029603328.pdf'),
(191, 68, 15, NULL, NULL, 'Not Turned In', NULL, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `class_meetings`
--

CREATE TABLE `class_meetings` (
  `class_meeting_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `link` longtext NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_meetings`
--

INSERT INTO `class_meetings` (`class_meeting_id`, `class_id`, `title`, `link`, `start_date`, `created_time`) VALUES
(16, 47, 'First Meeting', '/meeting/47/First%20Meeting', '2024-10-14 20:11:20', '2024-10-14 20:11:20'),
(17, 47, 'Scheduled meeting', '/meeting/47/Scheduled%20meeting', '2024-10-16 20:42:00', '2024-10-14 20:42:43'),
(18, 47, 'Ecommerce Site', '/meeting/47/Ecommerce%20Site', '2024-10-18 20:43:00', '2024-10-14 20:43:34'),
(19, 47, 'Ecommerce Site', '/meeting/47/Ecommerce%20Site', '2024-10-18 20:43:00', '2024-10-14 20:44:42'),
(20, 48, 'test', '/meeting/48/test48', '2024-11-10 08:02:17', '2024-11-10 08:02:17'),
(21, 47, 'The meeting', '/meeting/47/The%20meeting47', '2024-12-01 13:08:41', '2024-12-01 08:09:29'),
(22, 47, 'sadadadasdsd', '/meeting/47/sadadadasdsd47', '2024-12-01 08:10:58', '2024-12-01 08:10:58'),
(23, 47, 'asdadasasdasd', '/meeting/47/asdadasasdasd47', '2024-12-01 08:12:27', '2024-12-01 08:12:27');

-- --------------------------------------------------------

--
-- Table structure for table `class_students`
--

CREATE TABLE `class_students` (
  `class_student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `student_Id` int(200) NOT NULL,
  `status` enum('Approved','Rejected','Pending','') NOT NULL DEFAULT 'Pending',
  `created_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_students`
--

INSERT INTO `class_students` (`class_student_id`, `class_id`, `student_Id`, `status`, `created_time`) VALUES
(16, 6, 5, 'Pending', '2024-03-06 05:00:00'),
(17, 6, 12, 'Pending', '2024-03-06 05:00:00'),
(18, 6, 13, 'Pending', '2024-03-06 05:00:00'),
(19, 7, 6, 'Pending', '2024-03-07 06:00:00'),
(20, 7, 7, 'Pending', '2024-03-07 06:00:00'),
(21, 7, 14, 'Pending', '2024-03-07 06:00:00'),
(22, 8, 8, 'Pending', '2024-03-08 07:00:00'),
(23, 8, 9, 'Pending', '2024-03-08 07:00:00'),
(24, 8, 15, 'Pending', '2024-03-08 07:00:00'),
(25, 9, 10, 'Pending', '2024-03-09 08:00:00'),
(26, 9, 11, 'Pending', '2024-03-09 08:00:00'),
(27, 9, 12, 'Pending', '2024-03-09 08:00:00'),
(42, 47, 16, 'Approved', '2024-10-22 13:32:05'),
(43, 47, 1, 'Approved', '2024-12-01 08:06:14'),
(50, 47, 26, 'Approved', '2024-11-28 15:00:12'),
(51, 47, 15, 'Approved', '2024-11-28 14:52:00'),
(52, 47, 19, 'Approved', '2024-12-01 08:06:26');

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
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `content` varchar(600) DEFAULT NULL,
  `post_type` enum('Meeting','Assignment','Regular') DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `student_id`, `teacher_id`, `class_id`, `subject`, `content`, `post_type`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 4, 'Research about rizal', 'Research about the way rizal\'s life progress throught from his childhood upto his adulthood. Atleast 5 paragraphs.', NULL, '2024-12-02 00:21:04', '2024-12-02 00:21:04'),
(2, NULL, 1, 47, '', 'asdasdadasdas', NULL, '2024-12-02 00:24:21', '2024-12-02 00:24:21'),
(3, NULL, 1, 47, '', 'asdsadasdasdasd', NULL, '2024-12-02 00:42:16', '2024-12-02 00:42:16'),
(4, NULL, 1, 47, '', 'Research about the way rizal\'s life progress throught from his childhood upto his adulthood. Atleast 5 paragraphs.', NULL, '2024-12-02 01:27:49', '2024-12-02 01:27:49'),
(5, NULL, 1, 47, '', 'Research about the way rizal\'s life progress throught from his childhood upto his adulthood. Atleast 5 paragraphs.', NULL, '2024-12-02 01:28:12', '2024-12-02 01:28:12'),
(6, NULL, 1, 47, '', 'Research about the way rizal\'s life progress throught from his childhood upto his adulthood. Atleast 5 paragraphs.', NULL, '2024-12-02 01:28:21', '2024-12-02 01:28:21'),
(7, NULL, 1, 47, '', 'test attachment', NULL, '2024-12-02 01:44:19', '2024-12-02 01:44:19'),
(8, NULL, 1, 47, '', 'test attachment', NULL, '2024-12-02 01:46:35', '2024-12-02 01:46:35'),
(9, NULL, 1, 47, '', 'test attachment', NULL, '2024-12-02 01:47:13', '2024-12-02 01:47:13'),
(10, NULL, 1, 47, '', 'asdasdasd', NULL, '2024-12-02 01:52:16', '2024-12-02 01:52:16'),
(11, NULL, 1, 47, '', 'test', NULL, '2024-12-02 01:55:07', '2024-12-02 01:55:07'),
(12, NULL, 1, 47, '', 'adadasd', NULL, '2024-12-02 01:56:17', '2024-12-02 01:56:17'),
(13, NULL, 1, 47, '', 'adadasd', NULL, '2024-12-02 01:57:50', '2024-12-02 01:57:50'),
(14, NULL, 1, 47, '', 'adadasd', NULL, '2024-12-02 01:58:57', '2024-12-02 01:58:57'),
(15, NULL, 1, 47, '', 'adadasd', NULL, '2024-12-02 01:59:34', '2024-12-02 01:59:34'),
(16, NULL, 1, 47, '', 'this is a test attachment', NULL, '2024-12-02 02:00:08', '2024-12-02 02:00:08'),
(17, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:31:26', '2024-12-02 02:31:26'),
(18, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:31:29', '2024-12-02 02:31:29'),
(19, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:32:56', '2024-12-02 02:32:56'),
(20, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:33:12', '2024-12-02 02:33:12'),
(21, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:33:14', '2024-12-02 02:33:14'),
(22, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:33:46', '2024-12-02 02:33:46'),
(23, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:33:55', '2024-12-02 02:33:55'),
(24, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:34:23', '2024-12-02 02:34:23'),
(25, NULL, 1, 47, '', 'test ulit', NULL, '2024-12-02 02:35:00', '2024-12-02 02:35:00'),
(26, NULL, 1, 47, '', 'new post to ', NULL, '2024-12-02 21:10:34', '2024-12-02 21:10:34');

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `reaction_id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `type` enum('like','love','laugh','sad','angry') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `reply_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
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
(1, 'S1001', 'John', 'Doe', 'Michael', 'abc888043@gmail.com', '$2b$10$t3vgGrNXD1GurAHDN3kdAuxcp6Vs2xXcL/iuo2NdmeALtkhhxVIby', '2024-01-15 00:30:00', '2024-01-15 00:35:00'),
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
(15, 'S1015', 'Isabella', 'Martin', 'Lily', 'isabella.martin@example.com', 'welcome123', '2024-01-29 07:30:00', '2024-01-29 07:35:00'),
(16, '', 'Man', 'Ok', 'Yes', 'example@gmail.com', '$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK', '2024-09-21 10:22:22', '2024-09-21 10:22:22'),
(17, '2F0PgJ', 'Man', 'Man', 'Mans', 'mansplinterlands.2@gmail.com', '$2b$10$3RKMe/TyASG71IVIP7CpfexvcAS9DtqHnAl3nOoljkkh6PjqEV3va', '2024-10-01 16:41:21', '2024-10-01 16:41:21'),
(19, 'BmXkZM', 'assada', 'asdsad', 'test', 'mansplinterlands.22@gmail.com', '$2b$10$hv1Lx5S.SHGj3YHfHesm6uw0OZzJZxLWVpC7yv4/Qznbs7DFr1ms2', '2024-10-14 15:12:10', '2024-10-14 15:12:10'),
(20, 'johcFA', 'asdasd', 'asdasdas', 'asdasd', 'mansplinterlands.222@gmail.com', '$2b$10$GQ2954QY9zD8rtMsbwGqFeW1P21Hx2O2p52hmE9qTtY80z2H.AD7S', '2024-10-14 15:15:05', '2024-10-14 15:15:05'),
(23, 'vkVIzq', 'another', 'one', 'one', 'abc8188043@gmail.com', '$2b$10$f89UR3cVMmRaIn2cyQmlVemFlMgTUNbfWXuutcYzDPGC7YSR7nxWO', '2024-10-15 12:37:15', '2024-10-15 12:37:15'),
(24, 'cdm9iN', 'Manuel', 'Marin', 'Armentano', 'abc88801212121243@gmail.com', '$2b$10$NsiL7IPX7fjhXsBuEhksYe08UkeI0MYCNq6HIKsEZyMzFSU91WG2m', '2024-11-27 14:56:22', '2024-11-27 14:56:22'),
(25, 'xEzMPQ', 'Manuel', 'Marin', 'Armentano', 'abc888012313131233143@gmail.com', '$2b$10$izMMkx2CcO/KfFvZL1BCx.tzEc.eDoTXogs/Z.VIFUuTUv5IrO7K2', '2024-11-27 16:36:55', '2024-11-27 16:36:55'),
(26, 'vGPoBC', 'Manuel', 'Marin', 'Armentano', 'abc88801212121212313131233143@gmail.com', '$2b$10$oH/hocdQhN3Tz3yOvjK6ZOXdq.MZz0iA5APVIOLLS2qZwzJOOHRMu', '2024-11-28 13:10:43', '2024-11-28 13:10:43');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_string_id` varchar(200) DEFAULT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `middle_name` varchar(200) NOT NULL,
  `email_address` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` enum('Approved','Rejected','Pending','') NOT NULL DEFAULT 'Pending',
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_string_id`, `first_name`, `last_name`, `middle_name`, `email_address`, `password`, `status`, `created_time`, `modified_time`) VALUES
(1, 'T2001', 'Alice', 'Johnson', 'Marie', 'alice.johnson@example.com', '$2b$10$izMMkx2CcO/KfFvZL1BCx.tzEc.eDoTXogs/Z.VIFUuTUv5IrO7K2', 'Approved', '2024-02-01 00:30:00', '2024-02-01 00:35:00'),
(2, 'T2002', 'Bob', 'Smith', 'Lee', 'bob.smith@example.com', 'teachpass2', 'Pending', '2024-02-02 01:00:00', '2024-02-02 01:05:00'),
(3, 'T2003', 'Catherine', 'Williams', 'Anne', 'catherine.williams@example.com', 'teachpass3', 'Pending', '2024-02-03 01:30:00', '2024-02-03 01:35:00'),
(4, 'T2004', 'David', 'Brown', 'Charles', 'david.brown@example.com', 'teachpass4', 'Pending', '2024-02-04 02:00:00', '2024-02-04 02:05:00'),
(5, 'T2005', 'Emily', 'Jones', 'Nicole', 'emily.jones@example.com', 'teachpass5', 'Pending', '2024-02-05 02:30:00', '2024-02-05 02:35:00'),
(6, 'T2006', 'Frank', 'Garcia', 'Luis', 'frank.garcia@example.com', 'teachpass6', 'Pending', '2024-02-06 03:00:00', '2024-02-06 03:05:00'),
(7, 'T2007', 'Grace', 'Martinez', 'Sofia', 'grace.martinez@example.com', 'teachpass7', 'Pending', '2024-02-07 03:30:00', '2024-02-07 03:35:00'),
(8, 'T2008', 'Henry', 'Rodriguez', 'James', 'henry.rodriguez@example.com', 'teachpass8', 'Pending', '2024-02-08 04:00:00', '2024-02-08 04:05:00'),
(9, 'T2009', 'Isabella', 'Hernandez', 'Eva', 'isabella.hernandez@example.com', 'teachpass9', 'Pending', '2024-02-09 04:30:00', '2024-02-09 04:35:00'),
(10, 'T2010', 'Jack', 'Lopez', 'Michael', 'jack.lopez@example.com', 'teachpass10', 'Pending', '2024-02-10 05:00:00', '2024-02-10 05:05:00'),
(11, 'T2011', 'Katherine', 'Wilson', 'Marie', 'katherine.wilson@example.com', 'teachpass11', 'Pending', '2024-02-11 05:30:00', '2024-02-11 05:35:00'),
(12, 'T2012', 'Liam', 'Anderson', 'Henry', 'liam.anderson@example.com', 'teachpass12', 'Pending', '2024-02-12 06:00:00', '2024-02-12 06:05:00'),
(13, 'T2013', 'Mia', 'Thomas', 'Olivia', 'mia.thomas@example.com', 'teachpass13', 'Pending', '2024-02-13 06:30:00', '2024-02-13 06:35:00'),
(14, 'EjuN27', 'Noah', 'Taylor', 'Samuel', 'abc888043@gmail.com', '$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK', 'Approved', '2024-02-14 07:00:00', '2024-02-14 07:05:00'),
(15, 'g9YJyJ', 'Olivia', 'Jackson', 'Ava', 'olivia.jackson@example.com', 'teachpass15', 'Approved', '2024-02-15 07:30:00', '2024-02-15 07:35:00'),
(16, 'F2BSnw', 'Manuel', 'Marin', 'Armentano', 'abc8880431@gmail.com', '$2b$10$Fr2IbXu2AwNIAyL6F34kEOP3Ovnfd/iIxKqjue0z1YYyRjsoTQaXK', 'Approved', '2024-09-18 11:35:42', '2024-09-18 11:35:42'),
(17, NULL, 'test', 'test', 'test', 'mansplinterlands.2@gmail.com', '$2b$10$ZzG8NKyQIC6nrbZ/0MhaJujipQ5cMQK5/iAkQGdFtuRJajgBZjLey', 'Approved', '2024-10-13 02:30:58', '2024-10-13 02:30:58'),
(18, 'g9YJaJ', 'test', 'test', 'test', 'abc8881043@gmail.com', '$2b$10$eERYzyBrbGKnw2RJzwNHyuZcnlDK3rAQt27gj7n1yjwlGmqoj7jCm', 'Approved', '2024-11-10 07:55:26', '2024-11-10 07:55:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `class-relation-activity` (`class_id`),
  ADD KEY `activity-relation-activity` (`class_meeting_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `class-relation-assignment` (`class_id`);

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`attachment_id`);

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
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  ADD KEY `fk_students_idx` (`student_id`),
  ADD KEY `fk_teachers_idx` (`teacher_id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`reaction_id`),
  ADD KEY `fk_teachers_idx` (`teacher_id`),
  ADD KEY `fk_students_idx` (`student_id`),
  ADD KEY `fk_posts_idx` (`post_id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`reply_id`),
  ADD KEY `post_ibfk_1_idx` (`post_id`),
  ADD KEY `teacher_ibfk_1_idx` (`teacher_id`),
  ADD KEY `student_ibfk_1_idx` (`student_id`);

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
  ADD UNIQUE KEY `emaill_address` (`email_address`),
  ADD UNIQUE KEY `teacher_string` (`teacher_string_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `attachment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `class_assignments`
--
ALTER TABLE `class_assignments`
  MODIFY `class_assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `class_meetings`
--
ALTER TABLE `class_meetings`
  MODIFY `class_meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `class_students`
--
ALTER TABLE `class_students`
  MODIFY `class_student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `reaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `reply_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity-relation-activity` FOREIGN KEY (`class_meeting_id`) REFERENCES `class_meetings` (`class_meeting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
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

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_students` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `fk_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `fk_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `fk_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `update_assignment_status` ON SCHEDULE EVERY 1 SECOND STARTS '2024-10-01 22:59:58' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE class_assignments ca
  JOIN assignments a ON ca.assignment_id = a.assignment_id
  SET ca.assignment_status = 'Not Turned In'
  WHERE a.due_date < NOW() AND ca.assignment_status = "Pending"$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
