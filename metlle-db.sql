-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2024 at 06:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `metlle-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `billings`
--

CREATE TABLE `billings` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `billings`
--

INSERT INTO `billings` (`id`, `user_id`, `order_id`, `address`, `city`, `state`, `zip`, `country`, `created_at`, `updated_at`) VALUES
(1, 30, NULL, 'sanket residency, bavdhan bhurd, pune', 'Pune', 'Maharashtra', '411021', 'India', '2024-02-14 05:31:47', '2024-02-14 05:31:47');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `description`, `cover_image`, `status`, `content`, `created_at`, `updated_at`) VALUES
(14, 'test', 'est', 'blogs/1708524220014.png', 1, '<p>Write Your Blog Here.fdsfsdfsdfsdfsdfsdv vsfsdfsd</p>', '2024-02-21 14:03:40', '2024-02-21 14:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(10) UNSIGNED NOT NULL,
  `CompanyId` int(10) UNSIGNED NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `AddressLine1` varchar(255) NOT NULL,
  `AddressLine2` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `PinCode` int(10) UNSIGNED DEFAULT NULL,
  `Phone` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `item_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 30, 3, 1, 0.00, '2024-02-10 10:52:45', '2024-02-10 10:52:45'),
(2, 30, 1, 1, 0.00, '2024-02-10 10:55:28', '2024-02-10 10:55:28'),
(3, 30, 1, 1, 0.00, '2024-02-10 11:26:10', '2024-02-10 11:26:10'),
(4, 30, 1, 1, 0.00, '2024-02-10 11:29:36', '2024-02-10 11:29:36'),
(5, 30, 1, 1, 0.00, '2024-02-10 11:33:25', '2024-02-10 11:33:25'),
(6, 30, 1, 1, 0.00, '2024-02-10 11:36:38', '2024-02-10 11:36:38'),
(7, 30, 1, 1, 0.00, '2024-02-10 11:44:08', '2024-02-10 11:44:08'),
(8, 30, 2, 1, 0.00, '2024-02-10 12:07:43', '2024-02-10 12:07:43'),
(9, 30, 3, 1, 0.00, '2024-02-10 12:16:44', '2024-02-10 12:16:44'),
(10, 30, 4, 1, 0.00, '2024-02-10 12:21:33', '2024-02-10 12:21:33'),
(11, 30, 5, 1, 0.00, '2024-02-10 12:23:06', '2024-02-10 12:23:06'),
(12, 30, 1, 1, 0.00, '2024-02-10 12:23:44', '2024-02-10 12:23:44'),
(13, 30, 2, 1, 0.00, '2024-02-10 18:03:02', '2024-02-10 18:03:02'),
(14, 30, 3, 1, 0.00, '2024-02-10 18:17:17', '2024-02-10 18:17:17'),
(15, 30, 4, 1, 0.00, '2024-02-10 18:26:31', '2024-02-10 18:26:31'),
(16, 30, 1, 1, 0.00, '2024-02-10 18:29:55', '2024-02-10 18:29:55'),
(17, 30, 1, 1, 0.00, '2024-02-10 18:30:29', '2024-02-10 18:30:29'),
(18, 30, 2, 1, 0.00, '2024-02-10 18:32:04', '2024-02-10 18:32:04'),
(19, 30, 3, 1, 0.00, '2024-02-10 18:37:13', '2024-02-10 18:37:13'),
(20, 30, 4, 1, 0.00, '2024-02-10 18:48:46', '2024-02-10 18:48:46'),
(21, 30, 5, 1, 0.00, '2024-02-10 18:52:30', '2024-02-10 18:52:30'),
(22, 30, 6, 1, 0.00, '2024-02-10 18:55:44', '2024-02-10 18:55:44'),
(23, 30, 7, 1, 0.00, '2024-02-10 18:57:46', '2024-02-10 18:57:46'),
(24, 30, 8, 1, 0.00, '2024-02-10 18:59:05', '2024-02-10 18:59:05'),
(25, 30, 9, 1, 0.00, '2024-02-10 19:00:45', '2024-02-10 19:00:45'),
(26, 30, 10, 1, 0.00, '2024-02-10 19:03:29', '2024-02-10 19:03:29'),
(27, 30, 11, 1, 0.00, '2024-02-10 19:05:47', '2024-02-10 19:05:47'),
(28, 30, 12, 1, 0.00, '2024-02-10 19:07:41', '2024-02-10 19:07:41'),
(29, 30, 13, 1, 0.00, '2024-02-10 19:09:55', '2024-02-10 19:09:55'),
(30, 30, 14, 1, 0.00, '2024-02-10 19:11:37', '2024-02-10 19:11:37'),
(31, 30, 15, 1, 0.00, '2024-02-10 19:13:22', '2024-02-10 19:13:22'),
(32, 30, 16, 1, 0.00, '2024-02-10 19:18:03', '2024-02-10 19:18:03'),
(33, 30, 17, 1, 0.00, '2024-02-10 19:18:40', '2024-02-10 19:18:40'),
(34, 30, 18, 1, 0.00, '2024-02-10 19:20:04', '2024-02-10 19:20:04'),
(35, 30, 19, 1, 0.00, '2024-02-10 19:24:15', '2024-02-10 19:24:15'),
(36, 30, 20, 1, 0.00, '2024-02-10 19:25:45', '2024-02-10 19:25:45'),
(37, 30, 21, 1, 0.00, '2024-02-10 19:30:23', '2024-02-10 19:30:23'),
(38, 30, 22, 1, 0.00, '2024-02-10 19:36:22', '2024-02-10 19:36:22'),
(39, 30, 23, 1, 0.00, '2024-02-10 19:39:18', '2024-02-10 19:39:18'),
(40, 30, 24, 1, 0.00, '2024-02-10 19:42:42', '2024-02-10 19:42:42'),
(41, 30, 25, 1, 0.00, '2024-02-10 19:44:40', '2024-02-10 19:44:40'),
(42, 30, 26, 1, 0.00, '2024-02-10 19:47:20', '2024-02-10 19:47:20'),
(43, 30, 27, 1, 0.00, '2024-02-10 19:49:18', '2024-02-10 19:49:18'),
(44, 30, 28, 1, 0.00, '2024-02-10 19:50:44', '2024-02-10 19:50:44'),
(45, 30, 29, 1, 0.00, '2024-02-10 19:55:11', '2024-02-10 19:55:11'),
(46, 30, 30, 1, 0.00, '2024-02-10 20:00:41', '2024-02-10 20:00:41'),
(47, 30, 31, 1, 0.00, '2024-02-10 20:02:02', '2024-02-10 20:02:02'),
(48, 30, 32, 1, 0.00, '2024-02-10 20:07:08', '2024-02-10 20:07:08'),
(49, 30, 33, 1, 0.00, '2024-02-10 20:08:41', '2024-02-10 20:08:41'),
(50, 30, 34, 1, 0.00, '2024-02-10 20:10:33', '2024-02-10 20:10:33'),
(51, 30, 35, 1, 0.00, '2024-02-10 20:11:35', '2024-02-10 20:11:35'),
(52, 30, 36, 1, 0.00, '2024-02-10 20:13:14', '2024-02-10 20:13:14'),
(53, 30, 37, 1, 0.00, '2024-02-11 03:55:49', '2024-02-11 03:55:49'),
(54, 30, 38, 1, 0.00, '2024-02-11 04:02:44', '2024-02-11 04:02:44'),
(55, 30, 39, 1, 0.00, '2024-02-11 04:04:34', '2024-02-11 04:04:34'),
(56, 30, 40, 1, 0.00, '2024-02-11 04:05:50', '2024-02-11 04:05:50'),
(57, 30, 41, 1, 0.00, '2024-02-11 04:07:24', '2024-02-11 04:07:24'),
(58, 30, 42, 1, 0.00, '2024-02-11 04:08:18', '2024-02-11 04:08:18'),
(59, 30, 43, 1, 0.00, '2024-02-11 04:11:20', '2024-02-11 04:11:20'),
(60, 30, 44, 1, 0.00, '2024-02-11 04:19:06', '2024-02-11 04:19:06'),
(61, 30, 45, 1, 0.00, '2024-02-11 04:21:05', '2024-02-11 04:21:05'),
(62, 30, 46, 1, 0.00, '2024-02-11 04:24:00', '2024-02-11 04:24:00'),
(63, 30, 47, 1, 0.00, '2024-02-11 04:25:54', '2024-02-11 04:25:54'),
(64, 30, 48, 1, 0.00, '2024-02-11 04:26:39', '2024-02-11 04:26:39'),
(65, 30, 49, 1, 0.00, '2024-02-11 04:27:53', '2024-02-11 04:27:53'),
(66, 30, 50, 1, 0.00, '2024-02-11 04:30:47', '2024-02-11 04:30:47'),
(67, 30, 51, 1, 0.00, '2024-02-11 04:34:26', '2024-02-11 04:34:26'),
(68, 30, 52, 1, 0.00, '2024-02-11 04:36:15', '2024-02-11 04:36:15'),
(69, 30, 53, 1, 0.00, '2024-02-11 04:40:58', '2024-02-11 04:40:58'),
(70, 30, 54, 1, 0.00, '2024-02-11 04:43:31', '2024-02-11 04:43:31'),
(71, 30, 55, 1, 0.00, '2024-02-11 04:45:49', '2024-02-11 04:45:49'),
(72, 30, 56, 1, 0.00, '2024-02-11 04:47:48', '2024-02-11 04:47:48'),
(73, 30, 57, 1, 0.00, '2024-02-11 05:34:55', '2024-02-11 05:34:55'),
(74, 30, 58, 1, 0.00, '2024-02-11 05:37:47', '2024-02-11 05:37:47'),
(75, 30, 59, 1, 0.00, '2024-02-11 05:43:23', '2024-02-11 05:43:23'),
(76, 30, 60, 1, 0.00, '2024-02-11 07:10:29', '2024-02-11 07:10:29'),
(77, 30, 61, 1, 0.00, '2024-02-11 07:11:23', '2024-02-11 07:11:23'),
(78, 30, 62, 1, 0.00, '2024-02-11 07:14:01', '2024-02-11 07:14:01'),
(79, 30, 63, 1, 0.00, '2024-02-11 07:15:15', '2024-02-11 07:15:15'),
(80, 30, 64, 1, 0.00, '2024-02-11 07:21:16', '2024-02-11 07:21:16'),
(81, 30, 65, 1, 0.00, '2024-02-11 07:24:56', '2024-02-11 07:24:56'),
(82, 30, 66, 1, 0.00, '2024-02-11 07:26:24', '2024-02-11 07:26:24'),
(83, 30, 67, 1, 0.00, '2024-02-11 07:29:14', '2024-02-11 07:29:14'),
(84, 30, 68, 1, 0.00, '2024-02-11 07:30:40', '2024-02-11 07:30:40'),
(85, 30, 69, 1, 0.00, '2024-02-11 07:33:45', '2024-02-11 07:33:45'),
(86, 30, 70, 1, 0.00, '2024-02-11 07:58:08', '2024-02-11 07:58:08'),
(87, 30, 71, 1, 0.00, '2024-02-11 08:01:38', '2024-02-11 08:01:38'),
(88, 30, 72, 1, 0.00, '2024-02-11 08:04:24', '2024-02-11 08:04:24'),
(89, 30, 73, 1, 0.00, '2024-02-11 08:06:19', '2024-02-11 08:06:19'),
(90, 30, 74, 1, 0.00, '2024-02-11 08:08:31', '2024-02-11 08:08:31'),
(91, 30, 75, 1, 0.00, '2024-02-11 08:12:57', '2024-02-11 08:12:57'),
(92, 30, 76, 1, 0.00, '2024-02-11 08:20:58', '2024-02-11 08:20:58'),
(93, 30, 77, 1, 0.00, '2024-02-11 08:41:21', '2024-02-11 08:41:21'),
(94, 30, 78, 1, 0.00, '2024-02-11 08:43:28', '2024-02-11 08:43:28'),
(95, 30, 79, 1, 0.00, '2024-02-11 08:46:07', '2024-02-11 08:46:07'),
(96, 30, 80, 1, 0.00, '2024-02-11 08:46:49', '2024-02-11 08:46:49'),
(97, 30, 81, 1, 0.00, '2024-02-11 08:51:41', '2024-02-11 08:51:41'),
(98, 30, 82, 1, 0.00, '2024-02-11 08:54:52', '2024-02-11 08:54:52'),
(99, 30, 83, 1, 0.00, '2024-02-11 09:07:44', '2024-02-11 09:07:44'),
(100, 30, 84, 1, 0.00, '2024-02-11 09:09:43', '2024-02-11 09:09:43'),
(101, 30, 85, 1, 0.00, '2024-02-11 09:13:33', '2024-02-11 09:13:33'),
(102, 30, 86, 1, 0.00, '2024-02-11 09:18:07', '2024-02-11 09:18:07'),
(103, 30, 87, 1, 0.00, '2024-02-11 09:20:07', '2024-02-11 09:20:07'),
(104, 30, 88, 1, 0.00, '2024-02-11 09:21:31', '2024-02-11 09:21:31'),
(105, 30, 89, 1, 0.00, '2024-02-11 09:24:55', '2024-02-11 09:24:55'),
(106, 30, 90, 1, 0.00, '2024-02-11 09:26:48', '2024-02-11 09:26:48'),
(107, 30, 91, 1, 0.00, '2024-02-11 09:28:43', '2024-02-11 09:28:43'),
(108, 30, 92, 1, 0.00, '2024-02-11 09:56:40', '2024-02-11 09:56:40'),
(109, 30, 93, 1, 0.00, '2024-02-11 09:59:04', '2024-02-11 09:59:04'),
(110, 30, 94, 1, 0.00, '2024-02-11 10:28:02', '2024-02-11 10:28:02'),
(111, 30, 95, 1, 0.00, '2024-02-11 10:32:56', '2024-02-11 10:32:56'),
(112, 30, 96, 1, 0.00, '2024-02-11 10:35:16', '2024-02-11 10:35:16'),
(113, 30, 97, 1, 0.00, '2024-02-11 10:42:38', '2024-02-11 10:42:38'),
(114, 30, 98, 1, 0.00, '2024-02-11 10:44:10', '2024-02-11 10:44:10'),
(115, 30, 99, 1, 0.00, '2024-02-11 10:58:34', '2024-02-11 10:58:34'),
(116, 30, 100, 1, 0.00, '2024-02-11 11:01:34', '2024-02-11 11:01:34'),
(117, 30, 101, 1, 0.00, '2024-02-11 11:04:19', '2024-02-11 11:04:19'),
(118, 30, 102, 1, 0.00, '2024-02-11 11:19:34', '2024-02-11 11:19:34'),
(119, 30, 103, 1, 0.00, '2024-02-11 11:24:27', '2024-02-11 11:24:27'),
(120, 30, 104, 1, 0.00, '2024-02-11 11:29:36', '2024-02-11 11:29:36'),
(121, 30, 105, 1, 0.00, '2024-02-11 11:33:57', '2024-02-11 11:33:57'),
(122, 30, 106, 1, 0.00, '2024-02-13 10:12:56', '2024-02-13 10:12:56'),
(123, 30, 107, 1, 0.00, '2024-02-13 10:18:45', '2024-02-13 10:18:45'),
(124, 30, 108, 1, 0.00, '2024-02-13 10:39:37', '2024-02-13 10:39:37'),
(125, 30, 109, 1, 0.00, '2024-02-13 10:44:09', '2024-02-13 10:44:09'),
(126, 30, 110, 1, 0.00, '2024-02-13 10:51:16', '2024-02-13 10:51:16'),
(127, 30, 111, 1, 0.00, '2024-02-13 10:55:57', '2024-02-13 10:55:57'),
(128, 30, 112, 1, 0.00, '2024-02-13 11:05:36', '2024-02-13 11:05:36'),
(129, 30, 113, 1, 0.00, '2024-02-13 11:09:35', '2024-02-13 11:09:35'),
(130, 30, 114, 1, 0.00, '2024-02-13 11:11:24', '2024-02-13 11:11:24'),
(131, 30, 115, 1, 0.00, '2024-02-13 11:18:26', '2024-02-13 11:18:26'),
(132, 30, 116, 1, 0.00, '2024-02-13 11:20:02', '2024-02-13 11:20:02'),
(133, 30, 117, 1, 0.00, '2024-02-13 11:21:57', '2024-02-13 11:21:57'),
(134, 30, 118, 1, 0.00, '2024-02-13 11:30:28', '2024-02-13 11:30:28'),
(135, 30, 119, 1, 0.00, '2024-02-13 11:32:17', '2024-02-13 11:32:17'),
(136, 35, 120, 1, 0.00, '2024-02-14 11:50:46', '2024-02-14 11:50:46'),
(137, 35, 121, 1, 0.00, '2024-02-16 10:07:04', '2024-02-16 10:07:04'),
(138, 30, 1, 1, 0.00, '2024-02-18 00:56:16', '2024-02-18 00:56:16'),
(139, 35, 2, 1, 0.00, '2024-02-18 01:38:53', '2024-02-18 01:38:53'),
(140, 30, 3, 1, 0.00, '2024-02-18 07:50:08', '2024-02-18 07:50:08'),
(141, 35, 4, 1, 0.00, '2024-02-18 10:03:41', '2024-02-18 10:03:41'),
(142, 30, 5, 1, 0.00, '2024-02-21 13:34:56', '2024-02-21 13:34:56'),
(143, 35, 6, 1, 0.00, '2024-02-22 03:10:09', '2024-02-22 03:10:09'),
(144, 30, 7, 1, 0.00, '2024-02-23 14:55:16', '2024-02-23 14:55:16'),
(145, 30, 8, 1, 0.00, '2024-02-23 15:06:02', '2024-02-23 15:06:02'),
(146, 30, 9, 1, 0.00, '2024-02-23 17:00:13', '2024-02-23 17:00:13'),
(147, 30, 10, 1, 0.00, '2024-02-24 03:24:24', '2024-02-24 03:24:24'),
(148, 30, 11, 1, 0.00, '2024-02-24 04:11:00', '2024-02-24 04:11:00'),
(149, 30, 12, 1, 0.00, '2024-02-24 04:11:48', '2024-02-24 04:11:48'),
(150, 30, 13, 1, 0.00, '2024-02-24 04:13:37', '2024-02-24 04:13:37'),
(151, 30, 14, 1, 0.00, '2024-02-24 04:17:45', '2024-02-24 04:17:45'),
(152, 30, 15, 1, 0.00, '2024-02-24 04:22:11', '2024-02-24 04:22:11'),
(153, 30, 16, 1, 0.00, '2024-02-24 04:36:35', '2024-02-24 04:36:35'),
(154, 30, 17, 1, 0.00, '2024-02-24 04:44:46', '2024-02-24 04:44:46');

-- --------------------------------------------------------

--
-- Table structure for table `compnay`
--

CREATE TABLE `compnay` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `Industry` enum('Advertising','Agriculture Industry','Communications Industry') NOT NULL,
  `Website` varchar(255) NOT NULL,
  `ContactEmail` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `companySize` varchar(255) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` int(10) UNSIGNED NOT NULL,
  `industry_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `machine_materials`
--

CREATE TABLE `machine_materials` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `machine_materials`
--

INSERT INTO `machine_materials` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Aluminium', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(2, 'Carbon Steel', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(3, 'Stainless Steel', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(4, 'Alloy steel', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(5, 'Tool Steel', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(6, 'Copper', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(7, 'Brass', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(8, 'Titanium', '2024-02-17 04:24:03', '2024-02-17 04:24:03'),
(9, 'Super alloy', '2024-02-17 04:24:03', '2024-02-17 04:24:03');

-- --------------------------------------------------------

--
-- Table structure for table `machine_sub_materials`
--

CREATE TABLE `machine_sub_materials` (
  `id` int(10) UNSIGNED NOT NULL,
  `material_id` int(11) UNSIGNED NOT NULL,
  `material` varchar(255) NOT NULL,
  `density` varchar(255) NOT NULL,
  `sub_material_price_per_kg` float(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `machine_sub_materials`
--

INSERT INTO `machine_sub_materials` (`id`, `material_id`, `material`, `density`, `sub_material_price_per_kg`, `created_at`, `updated_at`) VALUES
(1, 1, 'Al 6065-T6', '0.0000027', 350.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(2, 1, 'Al 7075-T6', '0.0000027', 450.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(3, 1, 'Al 6061', '0.0000027', 350.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(4, 1, 'Al6082', '0.0000027', 330.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(5, 1, 'Al 6063', '0.0000027', 310.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(6, 1, 'AMPCOLOY 45', '0.0000027', 350.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(7, 1, 'Al 2014', '0.0000027', 300.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(8, 2, '1018', '0.000008', 80.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(9, 2, '1040', '0.000008', 80.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(10, 2, 'EN8', '0.000008', 85.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(11, 2, 'A36', '0.000008', 82.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(12, 2, 'EN1A', '0.000008', 84.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(13, 2, '1045', '0.000008', 82.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(14, 2, 'IS2062', '0.000008', 78.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(15, 2, 'EN9', '0.000008', 87.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(16, 2, 'EN3B\r\n', '0.000008', 89.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(17, 2, '1010', '0.000008', 76.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(18, 2, '1020 ', '0.000008', 78.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(19, 2, '1024', '0.000008', 80.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(20, 2, '1527 \r\n', '0.000008', 82.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(21, 2, '1035 \r\n', '0.000008', 78.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(22, 2, '1042 \r\n', '0.000008', 74.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(23, 2, '1080', '0.000008', 75.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(24, 2, '129', '0.000008', 76.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(25, 3, 'SS304\r\n', '0.000008', 375.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(26, 3, 'SS316', '0.000008', 420.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(27, 3, 'SS310', '0.000008', 360.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(28, 3, 'SS304L\r\n', '0.000008', 385.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(29, 3, 'SS303\r\n', '0.000008', 370.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(30, 3, 'SS316L\r\n', '0.000008', 430.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(31, 3, 'SS416\r\n', '0.000008', 410.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(32, 3, 'SS420\r\n', '0.000008', 390.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(33, 3, '17-4 PH\r\n', '0.000008', 380.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(34, 3, 'SS430\r\n', '0.000008', 350.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(35, 3, 'Super duplex', '0.000008', 500.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(36, 4, 'EN-19/ 4140', '0.000008', 150.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(37, 4, 'EN-24/ 4340\r\n', '0.000008', 160.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(38, 4, '1215.0 \r\n', '0.000008', 150.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(39, 4, '4145.0 \r\n', '0.000008', 165.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(40, 4, '8620.0 \r\n', '0.000008', 170.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(41, 4, '4130.0 \r\n', '0.000008', 175.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(42, 4, '4150.0 \r\n\r\n', '0.000008', 180.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(43, 4, '4320.0 \r\n', '0.000008', 182.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(44, 4, '5150.0 \r\n\r\n', '0.000008', 170.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(45, 4, '16MNCR5 \r\n\r\n', '0.000008', 200.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(46, 4, '20MNCR5 /4820\r\n', '0.000008', 210.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(47, 4, '8630.0 \r\n', '0.000008', 200.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(48, 5, 'A1\r\n\r\n', '0.0000089', 350.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(49, 5, 'A2\r\n', '0.0000089', 320.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(50, 5, 'OHNS O1\r\n', '0.0000089', 250.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(51, 5, 'OHNS O2\r\n\r\n', '0.0000089', 270.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(52, 5, 'D2\r\n', '0.0000089', 300.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(53, 5, 'D3\r\n', '0.0000089', 320.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(54, 5, 'M2\r\n', '0.0000089', 340.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(55, 5, 'M42\r\n', '0.0000089', 300.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(56, 5, 'W1\r\n', '0.0000089', 280.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(57, 6, 'C110\r\n', '0.0000089', 850.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(58, 6, 'C101\r\n', '0.0000089', 900.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(59, 6, 'C17200\r\n', '0.0000089', 860.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(60, 7, 'ASTM B16\r\n', '0.0000087', 600.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(61, 7, 'C36000\r\n', '0.0000087', 620.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(62, 7, 'CZ121\r\n', '0.0000087', 700.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(63, 7, 'Navel brass UNS 46400\r\n', '0.0000087', 640.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(64, 8, 'Grade 1\r\n', '0.0000087', 460.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(65, 8, 'Grade 2', '0.0000087', 500.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(66, 8, 'Grade 5', '0.0000087', 470.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(67, 9, 'Hstelloy c276\r\n', '0.000008', 450.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(68, 9, 'inconel 718\r\n', '0.000008', 470.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(69, 9, 'incoloy 925\r\n', '0.000008', 450.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(70, 9, 'Inconel 625\r\n', '0.000008', 500.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(71, 9, 'Monel 400\r\n', '0.000008', 550.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40'),
(72, 9, 'Monel 500\r\n', '0.000008', 450.00, '2024-02-17 04:28:40', '2024-02-17 04:28:40');

-- --------------------------------------------------------

--
-- Table structure for table `manufacture`
--

CREATE TABLE `manufacture` (
  `id` int(10) UNSIGNED NOT NULL,
  `experience` int(11) NOT NULL,
  `manufacture_status` varchar(50) NOT NULL,
  `certifications` varchar(50) NOT NULL,
  `additional_notes` varchar(500) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manufacture_machine`
--

CREATE TABLE `manufacture_machine` (
  `id` int(10) UNSIGNED NOT NULL,
  `machine` varchar(20) NOT NULL,
  `machine_status` varchar(20) NOT NULL,
  `model_make` varchar(20) NOT NULL,
  `max_allowed_part_size` varchar(20) NOT NULL,
  `min_allowed_part_size` varchar(20) NOT NULL,
  `finest_surface_roughness` float(8,2) NOT NULL,
  `finest_acheivable_tolerance` float(8,2) NOT NULL,
  `max_acheivable_hardness` float(8,2) NOT NULL,
  `machine_avg` float(8,2) NOT NULL,
  `machine_material_id` int(10) UNSIGNED NOT NULL,
  `process_id` int(10) UNSIGNED NOT NULL,
  `sub_process` varchar(20) NOT NULL,
  `manufacturer_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manufacture_machine_material_mapping`
--

CREATE TABLE `manufacture_machine_material_mapping` (
  `id` int(10) UNSIGNED NOT NULL,
  `manufacture_machine_id` int(10) UNSIGNED NOT NULL,
  `machine_material_id` int(10) UNSIGNED NOT NULL,
  `manufacturer_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manufacture_photos`
--

CREATE TABLE `manufacture_photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `photo_location` varchar(100) NOT NULL,
  `manufacturer_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manufacture_process_sub_mapping`
--

CREATE TABLE `manufacture_process_sub_mapping` (
  `id` int(10) UNSIGNED NOT NULL,
  `manufacturer_id` int(10) UNSIGNED NOT NULL,
  `process_id` int(10) UNSIGNED NOT NULL,
  `sub_process_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `msaas`
--

CREATE TABLE `msaas` (
  `id` int(10) UNSIGNED NOT NULL,
  `experience` int(11) NOT NULL,
  `certificate` varchar(20) NOT NULL,
  `additional_notes` varchar(500) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `msaas_machine`
--

CREATE TABLE `msaas_machine` (
  `id` int(10) UNSIGNED NOT NULL,
  `machine` varchar(20) NOT NULL,
  `msass_id` int(10) UNSIGNED NOT NULL,
  `machine_status` varchar(20) NOT NULL,
  `model_make` varchar(20) NOT NULL,
  `max_allowed_part_size` varchar(20) NOT NULL,
  `min_allowed_part_size` varchar(20) NOT NULL,
  `finest_surface_roughness` float(8,2) NOT NULL,
  `finest_acheivable_tolerance` float(8,2) NOT NULL,
  `max_machinable_hardness` float(8,2) NOT NULL,
  `machine_age` int(11) NOT NULL,
  `per_hr_machine_rate_inr` float(8,2) NOT NULL,
  `part_quantity` int(11) NOT NULL,
  `tooling_id` int(10) UNSIGNED NOT NULL,
  `threads_tapped_holes` int(11) NOT NULL,
  `process` varchar(10) NOT NULL,
  `max_power` float(8,2) NOT NULL,
  `max_rpm` float(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `msaas_machine`
--

INSERT INTO `msaas_machine` (`id`, `machine`, `msass_id`, `machine_status`, `model_make`, `max_allowed_part_size`, `min_allowed_part_size`, `finest_surface_roughness`, `finest_acheivable_tolerance`, `max_machinable_hardness`, `machine_age`, `per_hr_machine_rate_inr`, `part_quantity`, `tooling_id`, `threads_tapped_holes`, `process`, `max_power`, `max_rpm`) VALUES
(3, 'machine Name', 35, '1', 'xyz', '[\"200\",\"200\",\"200\"]', '[\"200\",\"200\",\"200\"]', 6.40, 0.12, 10.00, 7, 1000.00, 1, 1, 0, 'cnc', 10.00, 10000.00),
(4, 'm-1', 35, '1', 'xyz', '[\"100\",\"100\",\"100\"]', '[\"150\",\"150\",\"150\"]', 6.40, 0.12, 10.00, 7, 200.00, 1, 0, 0, 'cnc', 10.00, 10000.00);

-- --------------------------------------------------------

--
-- Table structure for table `msaas_machine_material_mapping`
--

CREATE TABLE `msaas_machine_material_mapping` (
  `id` int(10) UNSIGNED NOT NULL,
  `msaas_machine_id` int(10) UNSIGNED NOT NULL,
  `machine_material_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `msaas_machine_material_mapping`
--

INSERT INTO `msaas_machine_material_mapping` (`id`, `msaas_machine_id`, `machine_material_id`) VALUES
(23, 3, 0),
(24, 3, 1),
(25, 3, 3),
(26, 3, 7),
(27, 3, 8),
(72, 5, 1),
(73, 5, 0),
(84, 4, 1),
(85, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `msaas_machine_material_sub_grade_mapping`
--

CREATE TABLE `msaas_machine_material_sub_grade_mapping` (
  `id` int(10) UNSIGNED NOT NULL,
  `msaas_machine_id` int(10) UNSIGNED NOT NULL,
  `machine_material_id` int(10) UNSIGNED NOT NULL,
  `machine_sub_material_id` int(10) UNSIGNED NOT NULL,
  `sub_material_price_per_kg` float(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `msaas_machine_material_sub_grade_mapping`
--

INSERT INTO `msaas_machine_material_sub_grade_mapping` (`id`, `msaas_machine_id`, `machine_material_id`, `machine_sub_material_id`, `sub_material_price_per_kg`) VALUES
(1, 3, 0, 0, 500.00),
(3, 3, 0, 2, 800.00),
(4, 3, 1, 4, 70.00),
(5, 3, 3, 2, 900.00),
(6, 3, 3, 3, 800.00),
(7, 3, 0, 1, 600.00),
(8, 3, 7, 1, 400.00),
(9, 3, 7, 2, 500.00),
(10, 3, 8, 1, 80.00),
(11, 3, 8, 0, 60.00),
(22, 4, 1, 3, 900.00),
(28, 4, 0, 2, 800.00),
(29, 4, 0, 0, 500.00),
(30, 4, 0, 1, 600.00),
(31, 4, 1, 4, 70.00),
(32, 4, 1, 2, 400.00),
(34, 4, 1, 1, 700.00),
(35, 5, 1, 4, 70.00),
(36, 5, 1, 3, 900.00),
(37, 5, 1, 2, 400.00),
(38, 5, 1, 4, 70.00),
(39, 5, 1, 1, 700.00),
(40, 5, 0, 0, 500.00),
(41, 5, 0, 2, 800.00),
(42, 5, 0, 1, 600.00),
(43, 5, 0, 2, 800.00),
(44, 5, 0, 0, 500.00),
(45, 5, 0, 1, 600.00),
(46, 4, 1, 5, 780.00);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `p_id` varchar(150) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `requested_part_date` datetime DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL,
  `finalized_date` datetime DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `thumbnail_path` varchar(500) DEFAULT NULL,
  `quote_type` enum('auto_generated','manual_generated') DEFAULT NULL,
  `status` enum('pending','processing','manual','finalized','ordered') DEFAULT NULL,
  `kiri_value` int(11) DEFAULT NULL,
  `surface_area` float(15,2) DEFAULT NULL,
  `irmr` float(15,2) DEFAULT NULL,
  `bounding_box` varchar(50) DEFAULT NULL,
  `predicted_cost` float(15,2) DEFAULT NULL,
  `volume` float(15,2) DEFAULT NULL,
  `bounding_box_volume` float(15,2) DEFAULT NULL,
  `process` enum('cnc','3d') DEFAULT '3d',
  `material` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `surface_roughness` float(15,2) DEFAULT NULL,
  `tolerances` float(15,2) DEFAULT NULL,
  `finishing` varchar(50) DEFAULT NULL,
  `threads` varchar(50) DEFAULT NULL,
  `inspection` varchar(50) DEFAULT NULL,
  `certificate` int(11) DEFAULT NULL,
  `parts_quantity` int(11) DEFAULT NULL,
  `target_price_per_pcs` varchar(255) DEFAULT NULL,
  `sub_grade_material` varchar(50) DEFAULT NULL,
  `machine_cost` float(15,2) DEFAULT NULL,
  `weight_of_part` float(15,2) DEFAULT NULL,
  `material_cost` float(15,2) DEFAULT NULL,
  `cost_before_quantity` float(15,2) DEFAULT NULL,
  `cost_after_quantity` float(15,2) DEFAULT NULL,
  `overhead` float(15,2) DEFAULT NULL,
  `profit` float(15,2) DEFAULT NULL,
  `packing_cost` float(15,2) DEFAULT NULL,
  `shipping_cost` float(15,2) DEFAULT NULL,
  `final_cost` int(15) DEFAULT NULL,
  `gst` float(15,2) DEFAULT NULL,
  `sub_total` float(15,2) DEFAULT NULL,
  `post_process` float(15,2) DEFAULT NULL,
  `part_finish` int(11) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `credit` float(8,2) DEFAULT NULL,
  `discount` float(8,2) DEFAULT NULL,
  `infill_percentage` int(11) DEFAULT NULL,
  `dfm_comp` int(11) DEFAULT NULL,
  `surge` int(11) DEFAULT 50,
  `payment_method` varchar(255) NOT NULL,
  `delivery` varchar(255) NOT NULL,
  `end_final_cost` varchar(255) NOT NULL,
  `net_30_file` varchar(255) DEFAULT NULL,
  `po_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `p_id`, `user_id`, `requested_part_date`, `last_updated_date`, `finalized_date`, `file_path`, `thumbnail_path`, `quote_type`, `status`, `kiri_value`, `surface_area`, `irmr`, `bounding_box`, `predicted_cost`, `volume`, `bounding_box_volume`, `process`, `material`, `color`, `surface_roughness`, `tolerances`, `finishing`, `threads`, `inspection`, `certificate`, `parts_quantity`, `target_price_per_pcs`, `sub_grade_material`, `machine_cost`, `weight_of_part`, `material_cost`, `cost_before_quantity`, `cost_after_quantity`, `overhead`, `profit`, `packing_cost`, `shipping_cost`, `final_cost`, `gst`, `sub_total`, `post_process`, `part_finish`, `note`, `credit`, `discount`, `infill_percentage`, `dfm_comp`, `surge`, `payment_method`, `delivery`, `end_final_cost`, `net_30_file`, `po_number`) VALUES
(1, '210220245', 'ROUND GROOVE .stl', 30, '2024-02-21 19:04:56', NULL, NULL, '1708522496281.stl', 'thumbnails/1708522496281.png', 'auto_generated', 'finalized', 164959, 69957.19, 0.68, '[167.9624, 167.9812, 30.0]', 501.39, 577357.69, 846435.75, '3d', '1', 'White', 0.00, 0.00, '0', '1', '0', 1, 1, NULL, '1', 2707.51, 2.29, 799.88, 2474.39, 2474.39, 123.72, NULL, 2061.99, 0.00, 2598, 467.66, 5127.75, 0.00, NULL, '', 0.00, 0.00, 25, 43, 390, 'cod', 'standard_delivery', '5127.75', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partner_company_details`
--

CREATE TABLE `partner_company_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `industry` varchar(255) NOT NULL,
  `experience` int(11) NOT NULL,
  `certifications` varchar(255) NOT NULL,
  `other_processes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partner_company_details`
--

INSERT INTO `partner_company_details` (`id`, `user_id`, `industry`, `experience`, `certifications`, `other_processes`) VALUES
(9, 33, 'Aerospace and Defense', 5, 'ISO 9001:2015', 'Xerox, Printing'),
(10, 34, 'Aerospace and Defense', 5, 'ISO 9001:2015', 'Xerox, Printing'),
(11, 35, 'Aerospace and Defense', 5, 'ISO 9001:2015', 'Xerox, Printing');

-- --------------------------------------------------------

--
-- Table structure for table `partner_company_photos`
--

CREATE TABLE `partner_company_photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `picture_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partner_company_photos`
--

INSERT INTO `partner_company_photos` (`id`, `user_id`, `picture_path`) VALUES
(2, 1, 'manufacturers/17069276932173dp.png'),
(3, 1, 'manufacturers/17069276932173.png'),
(4, 1, 'manufacturers/1708524015877WhatsApp Image 2024-01-16 at 12.53.30_2339facf.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `partner_company_processes`
--

CREATE TABLE `partner_company_processes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `process` enum('CNC','3D_printing','Conventional_lathe_machining','Finishing','Inspection') NOT NULL,
  `sub_process` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partner_machines`
--

CREATE TABLE `partner_machines` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `process` enum('cnc_turning','cnc_milling','conventional_lathe_machining','fused_deposition_modeling','stereolithography','selective_laser_sintering','metal_3d_printing','finishing','co_ordinate_measuring_machine') NOT NULL,
  `model_make` varchar(20) NOT NULL,
  `max_allowed_part_size` varchar(20) NOT NULL,
  `min_allowed_part_size` varchar(20) NOT NULL,
  `finest_surface_roughness` float(8,2) NOT NULL,
  `finest_acheivable_tolerance` float(8,2) NOT NULL,
  `max_machinable_hardness` float(8,2) NOT NULL,
  `max_speed` float(8,2) NOT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partner_machines`
--

INSERT INTO `partner_machines` (`id`, `user_id`, `process`, `model_make`, `max_allowed_part_size`, `min_allowed_part_size`, `finest_surface_roughness`, `finest_acheivable_tolerance`, `max_machinable_hardness`, `max_speed`, `status`) VALUES
(8, 32, 'cnc_turning', '2020', '2000', '500', 1.60, 0.12, 45.00, 200.00, 1),
(9, 38, 'cnc_turning', '', '', '', 0.00, 0.00, 0.00, 0.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `partner_machine_materials`
--

CREATE TABLE `partner_machine_materials` (
  `id` int(10) UNSIGNED NOT NULL,
  `machine_id` int(10) UNSIGNED NOT NULL,
  `material` enum('aluminium','plain_carbon_steel','alloy_steel','tool_steel','stainless_steel','copper_alloy','titanium','super_alloys','engineering_plastics','pla','ptfe','petg','abs','nylon','other') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partner_machine_materials`
--

INSERT INTO `partner_machine_materials` (`id`, `machine_id`, `material`) VALUES
(11, 8, 'aluminium'),
(12, 8, 'alloy_steel');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(10) UNSIGNED NOT NULL,
  `payment_method_details_id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment1_details`
--

CREATE TABLE `payment1_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `Name_on_card` varchar(50) NOT NULL,
  `card_number` int(11) NOT NULL,
  `expiry_date` datetime NOT NULL,
  `payment_method_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment2_details`
--

CREATE TABLE `payment2_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `account_number` int(11) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `ifsc` varchar(20) NOT NULL,
  `payment_method_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(10) UNSIGNED NOT NULL,
  `payment_method_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `price_matchings`
--

CREATE TABLE `price_matchings` (
  `id` int(10) UNSIGNED NOT NULL,
  `machine_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `c_per_unit` varchar(255) DEFAULT NULL,
  `c_50_unit` varchar(255) DEFAULT NULL,
  `ai_per_unit` varchar(255) DEFAULT NULL,
  `ai_50_unit` varchar(500) DEFAULT NULL,
  `ratio_50_qty` varchar(500) DEFAULT NULL,
  `ratio_50_qty_average` varchar(255) DEFAULT NULL,
  `ratio_1_qty` varchar(255) DEFAULT NULL,
  `ratio_1_qty_average` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `percentage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `price_matchings`
--

INSERT INTO `price_matchings` (`id`, `machine_id`, `c_per_unit`, `c_50_unit`, `ai_per_unit`, `ai_50_unit`, `ratio_50_qty`, `ratio_50_qty_average`, `ratio_1_qty`, `ratio_1_qty_average`, `user_id`, `percentage`) VALUES
(1, 3, '[100,75,69,67,79,36,19,93,97,79]', '[50,60,60,65,75,30,10,70,90,70]', '[198,243,241,385,557,432,310,1161,442,1101]', '[183,225,223,356,515,400,287,1073,408,1018]', '[2,1.25,1.15,1.0307692307692307,1.0533333333333332,1.2,1.9,1.3285714285714285,1.0777777777777777,1.1285714285714286]', '1.3119023199023199', '[0.5050505050505051,0.30864197530864196,0.2863070539419087,0.17402597402597403,0.14183123877917414,0.08333333333333333,0.06129032258064516,0.08010335917312661,0.21945701357466063,0.07175295186194369]', '0.19317937276299132', 35, '9.102004994696946');

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(10) UNSIGNED NOT NULL,
  `promo_code` varchar(15) DEFAULT NULL,
  `promo_name` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quote_requests`
--

CREATE TABLE `quote_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `p_id` varchar(150) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `requested_part_date` datetime DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL,
  `finalized_date` datetime DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `thumbnail_path` varchar(500) DEFAULT NULL,
  `quote_type` enum('auto_generated','manual_generated') DEFAULT NULL,
  `status` enum('pending','processing','manual','finalized','ordered') DEFAULT NULL,
  `kiri_value` int(11) DEFAULT NULL,
  `surface_area` float(15,2) DEFAULT NULL,
  `irmr` float(15,2) DEFAULT NULL,
  `bounding_box` varchar(50) DEFAULT NULL,
  `predicted_cost` float(15,2) DEFAULT NULL,
  `volume` float(15,2) DEFAULT NULL,
  `bounding_box_volume` float(15,2) DEFAULT NULL,
  `process` enum('cnc','3d') DEFAULT '3d',
  `material` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `surface_roughness` float(15,2) DEFAULT NULL,
  `tolerances` float(15,2) DEFAULT NULL,
  `finishing` varchar(50) DEFAULT NULL,
  `threads` varchar(50) DEFAULT NULL,
  `inspection` varchar(50) DEFAULT NULL,
  `certificate` int(11) DEFAULT NULL,
  `parts_quantity` int(11) DEFAULT NULL,
  `target_price_per_pcs` varchar(255) DEFAULT NULL,
  `sub_grade_material` varchar(50) DEFAULT NULL,
  `machine_cost` float(15,2) DEFAULT NULL,
  `weight_of_part` float(15,2) DEFAULT NULL,
  `material_cost` float(15,2) DEFAULT NULL,
  `cost_before_quantity` float(15,2) DEFAULT NULL,
  `cost_after_quantity` float(15,2) DEFAULT NULL,
  `overhead` float(15,2) DEFAULT NULL,
  `profit` float(15,2) DEFAULT NULL,
  `packing_cost` float(15,2) DEFAULT NULL,
  `shipping_cost` float(15,2) DEFAULT NULL,
  `final_cost` int(15) DEFAULT NULL,
  `gst` float(15,2) DEFAULT NULL,
  `sub_total` float(15,2) DEFAULT NULL,
  `post_process` float(15,2) DEFAULT NULL,
  `part_finish` int(11) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `credit` float(8,2) DEFAULT NULL,
  `discount` float(8,2) DEFAULT NULL,
  `infill_percentage` int(11) DEFAULT NULL,
  `dfm_comp` int(11) DEFAULT NULL,
  `surge` int(11) DEFAULT 50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quote_requests`
--

INSERT INTO `quote_requests` (`id`, `p_id`, `user_id`, `requested_part_date`, `last_updated_date`, `finalized_date`, `file_path`, `thumbnail_path`, `quote_type`, `status`, `kiri_value`, `surface_area`, `irmr`, `bounding_box`, `predicted_cost`, `volume`, `bounding_box_volume`, `process`, `material`, `color`, `surface_roughness`, `tolerances`, `finishing`, `threads`, `inspection`, `certificate`, `parts_quantity`, `target_price_per_pcs`, `sub_grade_material`, `machine_cost`, `weight_of_part`, `material_cost`, `cost_before_quantity`, `cost_after_quantity`, `overhead`, `profit`, `packing_cost`, `shipping_cost`, `final_cost`, `gst`, `sub_total`, `post_process`, `part_finish`, `note`, `credit`, `discount`, `infill_percentage`, `dfm_comp`, `surge`) VALUES
(5, 'ROUND GROOVE .stl', 30, '2024-02-21 19:04:56', NULL, NULL, '1708522496281.stl', 'thumbnails/1708522496281.png', 'auto_generated', 'finalized', 164959, 69957.19, 0.68, '[167.9624, 167.9812, 30.0]', 501.39, 577357.69, 846435.75, '3d', '1', 'White', 0.00, 0.00, '0', '1', 'standard', 1, 1, NULL, '1', 2707.51, 2.29, 799.88, 2534.39, 2534.39, 126.72, NULL, 2061.99, 0.00, 2661, 479.00, 5202.09, 0.00, NULL, '', 0.00, 0.00, 25, 43, 399),
(6, 'ROUND EXTRUDE .stl', 35, '2024-02-22 08:40:09', NULL, NULL, '1708571409457.stl', 'thumbnails/1708571409457.png', 'auto_generated', 'finalized', NULL, 69957.38, 0.61, '[167.9624, 167.9812, 35.0]', 523.72, 603857.69, 987508.38, 'cnc', '1', NULL, 1.00, 1.00, '1', '1', '2', 1, 1, NULL, '1', 576.68, 2.67, 1599.76, 2502.91, 2176.44, 108.82, NULL, 26.66, 0.00, 2285, 411.35, 2723.28, 0.00, NULL, '', NULL, NULL, NULL, NULL, 343),
(17, 'ROUND GROOVE .stl', 30, '2024-02-24 10:14:46', NULL, NULL, '1708749886038.stl', 'thumbnails/1708749886038.png', 'auto_generated', 'finalized', 164959, 69957.19, 0.68, '[167.9624, 167.9812, 30.0]', 501.39, 577357.69, 846435.75, '3d', '1', 'White', 1.00, 1.00, '1', '1', 'standard', NULL, 1, NULL, '1', NULL, NULL, NULL, 2534.39, 2534.39, 126.72, NULL, 2061.99, 0.00, 2661, 479.00, 5202.10, NULL, NULL, '', 0.00, 0.00, 25, NULL, 399);

-- --------------------------------------------------------

--
-- Table structure for table `shipment_order`
--

CREATE TABLE `shipment_order` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `request_id` int(10) UNSIGNED NOT NULL,
  `order_creation_date` datetime NOT NULL,
  `order_status` varchar(25) NOT NULL,
  `order_description` varchar(500) NOT NULL,
  `manufacturer_id` int(10) UNSIGNED NOT NULL,
  `shipping_address` varchar(100) NOT NULL,
  `billing_address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shippings`
--

CREATE TABLE `shippings` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shippings`
--

INSERT INTO `shippings` (`id`, `user_id`, `order_id`, `address`, `city`, `state`, `zip`, `country`, `created_at`, `updated_at`) VALUES
(1, 30, NULL, 'fl no 63b sanket residency bavdhan budruk pune', 'Pune', 'Maharashtra', '411021', 'India', '2024-02-14 04:16:21', '2024-02-14 04:16:21');

-- --------------------------------------------------------

--
-- Table structure for table `tooling`
--

CREATE TABLE `tooling` (
  `id` int(10) UNSIGNED NOT NULL,
  `tooling` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(10) UNSIGNED NOT NULL,
  `role` enum('admin','msas','partner','customer') DEFAULT 'customer',
  `user_full_name` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `user_email_id` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `user_creation_date` datetime DEFAULT NULL,
  `user_last_update_date` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `industry_id` int(11) DEFAULT NULL,
  `contact_number` varchar(13) DEFAULT NULL,
  `address_pincode` int(11) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `gst_number` varchar(255) DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `credit` float(8,2) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `role`, `user_full_name`, `company_name`, `user_email_id`, `user_password`, `city`, `user_creation_date`, `user_last_update_date`, `address`, `industry_id`, `contact_number`, `address_pincode`, `country`, `token`, `state`, `gst_number`, `user_type_id`, `status`, `credit`, `pincode`) VALUES
(1, 'admin', 'admin', 'admin', 'admin@gmail.com', 'MTIzNDU2Nzg5', 'Pune', NULL, NULL, NULL, NULL, '07666939441', NULL, 'India', '7bnhx71w2ci9wdgcmq5pd', 'Maharashtra', NULL, NULL, NULL, NULL, 411021),
(28, 'customer', 'Shubham Mazire', 'shubham', 'shubhammazire7@gmail.com', 'MTIzNDU2Nzg5', 'Pune', NULL, NULL, NULL, 0, '07666939441', NULL, 'India', '3qru0ndyvztgomqzvjbi65', 'Maharashtra', NULL, NULL, NULL, NULL, 411021),
(29, 'partner', 'John Doe', 'ABC Corporation', 'john.doe@example.com', 'cGFzc3dvcmQxMjM=', NULL, '2024-02-02 23:25:07', '2024-02-02 23:25:07', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, 'i7gsf2qckljksz4w1nkibn', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456),
(30, 'customer', 'SM', 'Trijan', 'shubhammazire72@gmail.com', 'MTIzNDU2Nzg5', 'Pune', NULL, NULL, NULL, 0, '8550915528', NULL, 'India', 'mjzp69c75o537o6tyx7y6', 'Maharashtra', NULL, NULL, NULL, NULL, 411021),
(31, 'partner', 'Partner Manufaturer', 'manf. Corporation', 'partner@gmail.com', 'MTIzNDU2Nzg5', NULL, '2024-02-03 07:59:07', '2024-02-03 07:59:07', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, '5qbmagbq6ap5wrdshwytst', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456),
(32, 'partner', 'Partner manufacturer', 'manf. Corporation', 'partner1@gmail.com', 'MTIzNDU2Nzg5', NULL, '2024-02-03 08:02:25', '2024-02-03 08:02:25', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, '4q39rqmthh6wms6fwnnwqi', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456),
(33, 'msas', 'John1 Doe1', 'ABC Corporation1', 'john@gmail.com', 'MTIzNDU2Nzg5', NULL, '2024-02-03 08:13:28', '2024-02-03 08:13:28', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, 'six1mjg2ji2jk5lcjin4', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456),
(34, 'msas', 'Jack Doe', 'ABC Corporation', 'jack@gmail.com', 'MTIzNDU2Nzg5', NULL, '2024-02-03 13:15:28', '2024-02-03 13:15:28', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, 's60opsmqoedsre1fox30wi', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456),
(35, 'msas', 'sprint MAZIRE', 'ABC Corporation', 'sprint@gmail.com', 'MTIzNDU2Nzg5', NULL, '2024-02-04 09:40:15', '2024-02-04 09:40:15', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, 'fxa3wu3nr0700etp7ipr2njl', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456),
(38, 'partner', 'John Doe', 'ABC Corporation', 'john22@example.com', 'MTIzNDU2Nzg5', NULL, '2024-02-21 19:28:38', '2024-02-21 19:28:38', '123, Main Street, City', NULL, '+1234567890', NULL, NULL, '8woax3af7brj3wphktmpy', NULL, 'ABC1234XYZ', NULL, NULL, NULL, 123456);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `user_type`) VALUES
(1, 'admin'),
(2, 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billings`
--
ALTER TABLE `billings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compnay`
--
ALTER TABLE `compnay`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `machine_materials`
--
ALTER TABLE `machine_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `machine_sub_materials`
--
ALTER TABLE `machine_sub_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_foreign_key_material_id` (`material_id`);

--
-- Indexes for table `manufacture`
--
ALTER TABLE `manufacture`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manufacture_machine`
--
ALTER TABLE `manufacture_machine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manufacture_machine_material_mapping`
--
ALTER TABLE `manufacture_machine_material_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manufacture_photos`
--
ALTER TABLE `manufacture_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manufacture_process_sub_mapping`
--
ALTER TABLE `manufacture_process_sub_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `msaas`
--
ALTER TABLE `msaas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `msaas_machine`
--
ALTER TABLE `msaas_machine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `msaas_machine_material_mapping`
--
ALTER TABLE `msaas_machine_material_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `msaas_machine_material_sub_grade_mapping`
--
ALTER TABLE `msaas_machine_material_sub_grade_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_company_details`
--
ALTER TABLE `partner_company_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_company_photos`
--
ALTER TABLE `partner_company_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_company_processes`
--
ALTER TABLE `partner_company_processes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_machines`
--
ALTER TABLE `partner_machines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_machine_materials`
--
ALTER TABLE `partner_machine_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment1_details`
--
ALTER TABLE `payment1_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment2_details`
--
ALTER TABLE `payment2_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_matchings`
--
ALTER TABLE `price_matchings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quote_requests`
--
ALTER TABLE `quote_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipment_order`
--
ALTER TABLE `shipment_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tooling`
--
ALTER TABLE `tooling`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billings`
--
ALTER TABLE `billings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `compnay`
--
ALTER TABLE `compnay`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `industry`
--
ALTER TABLE `industry`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `machine_materials`
--
ALTER TABLE `machine_materials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `machine_sub_materials`
--
ALTER TABLE `machine_sub_materials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `manufacture`
--
ALTER TABLE `manufacture`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacture_machine`
--
ALTER TABLE `manufacture_machine`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacture_machine_material_mapping`
--
ALTER TABLE `manufacture_machine_material_mapping`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacture_photos`
--
ALTER TABLE `manufacture_photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacture_process_sub_mapping`
--
ALTER TABLE `manufacture_process_sub_mapping`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `msaas`
--
ALTER TABLE `msaas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `msaas_machine`
--
ALTER TABLE `msaas_machine`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `msaas_machine_material_mapping`
--
ALTER TABLE `msaas_machine_material_mapping`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `msaas_machine_material_sub_grade_mapping`
--
ALTER TABLE `msaas_machine_material_sub_grade_mapping`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partner_company_details`
--
ALTER TABLE `partner_company_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `partner_company_photos`
--
ALTER TABLE `partner_company_photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `partner_company_processes`
--
ALTER TABLE `partner_company_processes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `partner_machines`
--
ALTER TABLE `partner_machines`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `partner_machine_materials`
--
ALTER TABLE `partner_machine_materials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment1_details`
--
ALTER TABLE `payment1_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment2_details`
--
ALTER TABLE `payment2_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `price_matchings`
--
ALTER TABLE `price_matchings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quote_requests`
--
ALTER TABLE `quote_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `shipment_order`
--
ALTER TABLE `shipment_order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tooling`
--
ALTER TABLE `tooling`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `machine_sub_materials`
--
ALTER TABLE `machine_sub_materials`
  ADD CONSTRAINT `material_foreign_key_material_id` FOREIGN KEY (`material_id`) REFERENCES `machine_materials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
