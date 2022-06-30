-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2022 at 04:57 PM
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
(10, 4, 1, ' Nhược điểm của mạng dạng hình sao (Star) là?', 'Khó cài đặt và bảo trì', 'Khó khắc phục khi lỗi cáp xảy ra, và ảnh hưởng tới các nút mạng khác', 'Cần quá nhiều cáp để kết nối tới nút mạng trung tâm', 'Không có khả năng thay đổi khi đã lắp đặt', 3),
(11, 4, 2, ' Đặc điểm của mạng dạng Bus?', 'Tất cả các nút mạng kết nối vào nút mạng trung tâm (Ví dụ như Hub)', 'Tất cả các nút kết nối trên cùng một đường truyền vật lý', 'Tất cả các nút mạng đều kết nối trực tiếp với nhau', 'Mỗi nút mạng kết nối với 2 nút mạng còn lại', 2),
(12, 4, 3, 'Trình tự đóng gói dữ liệu khi truyền từ máy này đến máy khác?', 'Data, frame, packet, segment, bit', 'Data, segment, frame, packet, bit', 'Data, packet, segment, frame, bit', 'Data, segment, packet, frame, bit', 4),
(13, 4, 4, ' Khi sử dụng mạng máy tính ta sẽ thu được các lợi ích?', 'Chia sẻ tài nguyên (ổ cứng, cơ sở dữ liệu, máy in, các phần mềm tiện ích…)', 'Quản lý tập trung', 'Tận dụng năng lực xử lý của các máy tính rỗi kết hợp lại để thực hiện các công việc lớn', 'Tất cả đều đúng', 4),
(14, 4, 5, ' Thứ tự các tầng (layer) của mô hình OSI theo thứ tự từ trên xuống là?', 'Application, Presentation, Session, Transport, Data Link, Network, Physical', 'Application, Presentation, Session, Network, Transport, Data Link, Physical', 'Application, Presentation, Session, Transport, Network, Data Link, Physical', 'Application, Presentation, Transport, Session, Data Link, Network, Physical', 3),
(15, 4, 6, ' Để kết nối hai máy tính với nhau ta có thể sử dụng?', 'Hub', 'Switch', 'Nối cáp trực tiếp', 'Tất cả đều đúng', 4),
(16, 4, 7, ' Chọn chức năng của tầng Presentation?', 'Mã hoá dữ liệu và nén dữ liệu', 'Cung cấp các dịch vụ mạng người dùng', 'Đánh địa chỉ', 'Tất cả đều sai', 1),
(17, 4, 8, ' Biễu diễn số 125 từ cơ số decimal sang cơ số binary?', '01111101', '01101111', '01011111', '01111110', 1),
(18, 4, 9, ' Lớp nào (Layer) trong mô hình OSI chịu trách nhiệm mã hoá (encryption) dữ liệu?', 'Application', 'Presentation', 'Session', 'Transport', 2),
(19, 4, 10, ' Số nhị phân nào dưới đây có giá trị là 164?', '10100100', '10010010', '11000100', '10101010', 1),
(20, 5, 1, ' Trong mô hình Internet, chuẩn UNICODE (cho việc mã hoá các ký tự) sẽ nằm ở tầng?', 'Ứng dụng', 'Giao vận', 'Mạng', 'Liên kết dữ liệu', 1),
(21, 5, 2, ' Khi kết nối máy tính từ nhà vào ISP thông qua đường dây điện thoại, tín hiệu trên đường điện về tầthoại sẽ thuộc ng?', 'Giao vận', 'Mạng', 'Liên kết dữ liệu', 'Vật lý', 4),
(22, 5, 3, ' Theo mô hình OSI, định dạng ảnh JPG nằm ở tầng?', 'Ứng dụng', 'Phiên', 'Trình diễn', 'Mạng', 3),
(23, 5, 4, ' Quá trình dữ liệu di chuyển từ hệ thống máy tính này sang hệ thống máy tính khác phải trải qua giai đoạn nào?', 'Phân tích dữ liệu', 'Lọc dữ liệu', 'Nén dữ liệu và đóng gói', 'Kiểm thử dữ liệu', 3),
(24, 5, 5, ' Đơn vị dữ liệu ở tầng presentation là?', 'Byte', 'Data', 'Frame', 'Packet', 2),
(25, 5, 6, ' Khi nối mạng giữa 2 máy tính, chúng ta sử dụng loại cáp nào để nối trực tiếp giữa chúng?', 'Cáp quang', 'Cáp UTP thẳng', 'Cáp STP', 'Cáp UTP chéo (crossover)', 4),
(26, 5, 7, ' Sợi cáp xoắn nối giữa card mạng với hub thì?', 'Bấm thứ tự 2 đầu cáp giống nhau', 'Đổi vị trí các sợi 1, 2 với sợi 3, 6', 'Một đầu bấm theo chuẩn TIA/EIA T-568A, đầu kia theo chuẩn TIA/EIA T568-B', 'Tất cả đều sai', 1),
(27, 5, 8, ' Các quy tắc điều quản việc truyền thông máy tính được gọi là?', 'Các giao thức', 'Các dịch vụ', 'Các hệ điều hành mạng', 'Các thiết bị mang tải', 1),
(28, 5, 9, ' Hai kiểu máy tính khác nhau có thể truyền thông nếu?', 'Chúng cài đặt cùng hệ điều hành mạng', 'Chúng tuân thủ theo mô hình OSI', 'Chúng cùng dùng giao thức TCP/IP', 'Chúng có phần cứng giống nhau', 2),
(29, 5, 10, ' Mô hình OSI tổ chức các giao thức truyền thông thành bao nhiêu tầng?', '3', '5', '7', '9', 3);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

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
(2, 1, 'second quiz', 'edit'),
(4, 1, 'Mang May Tinh', ''),
(5, 1, 'Mang May Tinh 2', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
