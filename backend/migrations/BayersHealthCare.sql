-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 19, 2025 at 12:30 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BayersHealthCare`
--

-- --------------------------------------------------------

--
-- Table structure for table `diet_plan`
--

CREATE TABLE `diet_plan` (
  `id` int NOT NULL,
  `diet_type_id` int NOT NULL,
  `meal` enum('breakfast','lunch','dinner') NOT NULL,
  `description` text,
  `calories` int DEFAULT NULL,
  `plan_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `diet_plan`
--

INSERT INTO `diet_plan` (`id`, `diet_type_id`, `meal`, `description`, `calories`, `plan_type`) VALUES
(1, 1, 'breakfast', 'Oats with fruits and nuts', 350, NULL),
(2, 1, 'lunch', 'Paneer curry with brown rice', 500, NULL),
(3, 1, 'dinner', 'Mixed vegetable soup and salad', 300, NULL),
(4, 2, 'breakfast', 'Egg omelette with toast', 400, NULL),
(5, 2, 'lunch', 'Grilled chicken with quinoa', 600, NULL),
(6, 2, 'dinner', 'Fish curry with steamed veggies', 350, NULL),
(7, 3, 'breakfast', 'Vegan smoothie bowl', 320, NULL),
(8, 3, 'lunch', 'Chickpea salad with avocado', 450, NULL),
(9, 3, 'dinner', 'Lentil soup with whole grain bread', 310, NULL),
(10, 1, 'breakfast', 'Poha with peas and peanuts', 320, NULL),
(11, 1, 'lunch', 'Dal tadka with chapati and salad', 480, NULL),
(12, 1, 'dinner', 'Curd rice with cucumber salad', 350, NULL),
(13, 2, 'breakfast', 'Chicken sausage with scrambled eggs', 420, NULL),
(14, 2, 'lunch', 'Fish curry with brown rice and veggies', 550, NULL),
(15, 2, 'dinner', 'Grilled prawns with sautéed greens', 370, NULL),
(16, 3, 'breakfast', 'Tofu scramble with spinach', 310, NULL),
(17, 3, 'lunch', 'Quinoa bowl with roasted veggies', 430, NULL),
(18, 3, 'dinner', 'Vegan chili with beans and corn', 340, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `diet_planner`
--

CREATE TABLE `diet_planner` (
  `id` int NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `height` int NOT NULL,
  `activity_level` enum('slightly','moderate','high') NOT NULL,
  `bmi_min` decimal(4,1) NOT NULL,
  `bmi_max` decimal(4,1) NOT NULL,
  `diet_type_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `diet_planner`
--

INSERT INTO `diet_planner` (`id`, `created_on`, `updated_on`, `height`, `activity_level`, `bmi_min`, `bmi_max`, `diet_type_id`) VALUES
(1, '2025-07-19 11:51:23', '2025-07-19 11:51:23', 170, 'moderate', 18.5, 24.9, 1),
(2, '2025-07-19 11:51:23', '2025-07-19 11:51:23', 165, 'high', 25.0, 29.9, 2),
(3, '2025-07-19 11:51:23', '2025-07-19 11:51:23', 160, 'slightly', 30.0, 34.9, 3),
(4, '2025-07-19 11:53:46', '2025-07-19 11:53:46', 175, 'slightly', 18.5, 22.9, 1),
(5, '2025-07-19 11:53:46', '2025-07-19 11:53:46', 180, 'moderate', 23.0, 27.4, 2),
(6, '2025-07-19 11:53:46', '2025-07-19 11:53:46', 165, 'high', 27.5, 32.0, 3),
(7, '2025-07-19 11:53:46', '2025-07-19 11:53:46', 155, 'slightly', 16.0, 18.4, 3),
(8, '2025-07-19 11:53:46', '2025-07-19 11:53:46', 168, 'moderate', 18.5, 24.9, 1),
(9, '2025-07-19 11:53:46', '2025-07-19 11:53:46', 172, 'high', 25.0, 29.9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `diet_type`
--

CREATE TABLE `diet_type` (
  `id` int NOT NULL,
  `name` enum('veg','nonveg','vegan') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `diet_type`
--

INSERT INTO `diet_type` (`id`, `name`) VALUES
(1, 'veg'),
(2, 'nonveg'),
(3, 'vegan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diet_plan`
--
ALTER TABLE `diet_plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diet_type_id` (`diet_type_id`);

--
-- Indexes for table `diet_planner`
--
ALTER TABLE `diet_planner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diet_type_id` (`diet_type_id`);

--
-- Indexes for table `diet_type`
--
ALTER TABLE `diet_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diet_plan`
--
ALTER TABLE `diet_plan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `diet_planner`
--
ALTER TABLE `diet_planner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `diet_type`
--
ALTER TABLE `diet_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diet_plan`
--
ALTER TABLE `diet_plan`
  ADD CONSTRAINT `diet_plan_ibfk_1` FOREIGN KEY (`diet_type_id`) REFERENCES `diet_type` (`id`);

--
-- Constraints for table `diet_planner`
--
ALTER TABLE `diet_planner`
  ADD CONSTRAINT `diet_planner_ibfk_1` FOREIGN KEY (`diet_type_id`) REFERENCES `diet_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
