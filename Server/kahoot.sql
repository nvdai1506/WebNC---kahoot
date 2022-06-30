-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2022 at 06:05 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kahoot`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `question_index` int(11) NOT NULL,
  `question` varchar(512) DEFAULT NULL,
  `answer1` varchar(128) DEFAULT NULL,
  `answer2` varchar(128) DEFAULT NULL,
  `answer3` varchar(128) DEFAULT NULL,
  `answer4` varchar(128) DEFAULT NULL,
  `correctAnswer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `quiz_id`, `question_index`, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `correctAnswer`) VALUES
(5, 2, 0, 'aa', 'bb', 'cc', 'dd', 'ee', 3),
(6, 2, 1, 'a', 'b', 'c', 'd', 'ee', 2);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--
DROP TABLE IF EXISTS `quiz`;

CREATE TABLE `quiz` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quiz_name` varchar(128) DEFAULT NULL,
  `info` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `user_id`, `quiz_name`, `info`) VALUES
(2, 1, 'second quiz', 'edit');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `dob` datetime DEFAULT NULL,
  `rfToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `dob`, `rfToken`) VALUES
(1, 'dai', '$2a$10$LAQCZjA9Utm6hd7CEnpO2.PBXXgVoE5MGYbZoAq88U4HtSn8WiSvS', 'dai', 'dai@gmail.com', NULL, 'SKIqpDX1N9AhCQKVl5B3m1625O6gP2P8QeMuRQstvMQUHayvv00RMDhqEK2VHztaDRyRVb03jsxvmJUK'),
(2, 'dai2', '$2a$10$hLQPIr4KRHNHTSnSwY6gAu9E.U5.esoQjpSlpgqwhDuJI063qoV4y', 'dai2', 'dai2@gmail.com', NULL, 'MmCjXOXRc7Bh8oji9YMV9tKiDPUxjEzGmBK7328ancQYzV1o0S7kNfBzSYmM4Tka6KvePv7MpkE0tsAD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

