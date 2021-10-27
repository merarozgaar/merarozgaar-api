-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: mera_rozgaar
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `city` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `geo_code` point NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `locality` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pin_code` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `street_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES ('Mumbai','India','2021-09-05 20:13:09',_binary '\0\0\0\0\0\0\0K\�h�;R@�4�\�\'3@',3,'Bhandup West','400078','Maharashtra','Ram Nagar, Bhandup West, Mumbai, Maharashtra 400078, India','2021-09-05 20:13:09'),('Mumbai','India','2021-09-05 20:20:32',_binary '\0\0\0\0\0\0\0\r馃+8R@q�\�s3@',4,'','','Maharashtra','Mumbai, Maharashtra, India','2021-09-05 20:20:32'),('Mumbai','India','2021-09-05 20:28:36',_binary '\0\0\0\0\0\0\0K\�h�;R@�4�\�\'3@',5,'Bhandup West','400078','Maharashtra','Ram Nagar, Bhandup West, Mumbai, Maharashtra 400078, India','2021-09-05 20:28:36'),('New Delhi','India','2021-09-05 20:48:22',_binary '\0\0\0\0\0\0\0\�t�`MS@U<\�+�<@',6,'','','Delhi','New Delhi, Delhi, India','2021-09-05 20:48:22'),('Mumbai','India','2021-09-05 21:06:40',_binary '\0\0\0\0\0\0\0\r馃+8R@q�\�s3@',7,'','','Maharashtra','Mumbai, Maharashtra, India','2021-09-05 21:06:40'),('New Delhi','India','2021-09-05 21:35:02',_binary '\0\0\0\0\0\0\0\�t�`MS@U<\�+�<@',8,'','','Delhi','New Delhi, Delhi, India','2021-09-05 21:35:02'),('New Delhi','India','2021-09-05 21:35:35',_binary '\0\0\0\0\0\0\0\�t�`MS@U<\�+�<@',9,'','','Delhi','New Delhi, Delhi, India','2021-09-05 21:35:35'),('New Delhi','India','2021-09-05 21:35:51',_binary '\0\0\0\0\0\0\0\�t�`MS@U<\�+�<@',10,'','','Delhi','New Delhi, Delhi, India','2021-09-05 21:35:51');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `applicant_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `status` enum('WITHDRAWN','HIRED','APPLIED','SCREENING','SHORTLISTED','REJECTED') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'APPLIED',
  `upadated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `applicant_id` (`applicant_id`,`job_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `questions` json NOT NULL,
  `thumbnail_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `video_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('2021-08-06 01:16:33','',1,'फर्स्ट इम्प्रैशन कैसे अच्छा बनायें','[{\"id\": 1, \"options\": [{\"id\": 1, \"option\": \"अच्छे शब्द जैसे आपसे मिलकर अच्छा लगा, आपके समय के लिए धन्यावद\", \"correct\": true}, {\"id\": 2, \"option\": \"अच्छे शब्द जैसे आप बहुत सुंदर और अच्छे इंसान है\", \"correct\": false}, {\"id\": 3, \"option\": \"बुरे शब्द जैसे आपने मेरा समय बर्बाद कर दिया\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"हमे किन शब्दों का इस्तेमाल करना चाहिए?\"}, {\"id\": 2, \"options\": [{\"id\": 1, \"option\": \"जब तक आपसे बैठने के लिए ना कहा जाए आप न बैठें \", \"correct\": true}, {\"id\": 2, \"option\": \"जब तक आपसे बोलने के लिए ना कहा जाए आप न बोलें\", \"correct\": false}, {\"id\": 3, \"option\": \"जब तक आपसे उठने के लिए ना कहा जाए आप न उठें\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"जब तक आपसे क्या ना कहा जाये आप न करे?\"}, {\"id\": 3, \"options\": [{\"id\": 1, \"option\": \"आत्मविश्वास से\", \"correct\": true}, {\"id\": 2, \"option\": \"गुस्से से\", \"correct\": false}, {\"id\": 3, \"option\": \"ताकत से\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आप हाथ कैसे मिलाएँ?\"}, {\"id\": 4, \"options\": [{\"id\": 1, \"option\": \"ऑय कांटेक्ट\", \"correct\": true}, {\"id\": 2, \"option\": \"साइलेंस/ शांति\", \"correct\": false}, {\"id\": 3, \"option\": \"सफ़ाई\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आप इंटरव्यू के समय क्या मेन्टेन करके रखें?\"}, {\"id\": 5, \"options\": [{\"id\": 1, \"option\": \"साफ़ और स्पष्ट\", \"correct\": true}, {\"id\": 2, \"option\": \"लम्बे और कठिन \", \"correct\": false}, {\"id\": 3, \"option\": \"धीरे और हिचकिचाहट वाले\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपके शब्द कैसे होने चाहिऐ?\"}]','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/1.jpeg','2021-08-06 01:16:33','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/001.mp4'),('2021-08-06 01:36:35','',7,'इंटरव्यू के लिए कैसे कपड़े पहनें','[{\"id\": 1, \"options\": [{\"id\": 1, \"option\": \"साफ़,सादे ,उचित और इस्त्री वाले \", \"correct\": true}, {\"id\": 2, \"option\": \"साफ़, चमकीले और रंगबिरंगी \", \"correct\": false}, {\"id\": 3, \"option\": \"गंदे और पुराने\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपके कपड़े कैसे होने चाहिये?\"}, {\"id\": 2, \"options\": [{\"id\": 1, \"option\": \"एक फुल ड्रेस रिहर्सल करनी चाहिए \", \"correct\": true}, {\"id\": 2, \"option\": \"कम सोना चाहिए \", \"correct\": false}, {\"id\": 3, \"option\": \"अच्छे से तैयारी नहीं करनी चाहिए\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"इंटरव्यू से एक दिन पहले क्या करना चाहिए?\"}, {\"id\": 3, \"options\": [{\"id\": 1, \"option\": \"कम मात्रा में\", \"correct\": true}, {\"id\": 2, \"option\": \"ज़्यादा मात्रा में\", \"correct\": false}, {\"id\": 3, \"option\": \"बहुत ज़्यादा मात्रा में\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"कितनी मात्रा में परफ्यूम यह आफ़्टरशेव लगाए?\"}, {\"id\": 4, \"options\": [{\"id\": 1, \"option\": \"आपके कपड़े आरामदायक  हों\", \"correct\": true}, {\"id\": 2, \"option\": \"आपके कपड़े टाइट और बॉडी फिटिंग के हों\", \"correct\": false}, {\"id\": 3, \"option\": \"आपके कपड़े ढ़ीले ढ़ाले हों\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपके कपड़े कैसे हों कि आपका सारा ध्यान सवाल पैर केंद्रित हों?\"}]','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/2.jpeg','2021-08-06 01:36:35','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/002.mp4'),('2021-08-06 01:36:35','',8,'शारीरिक हाव भाव कैसा होना चाहिए','[{\"id\": 1, \"options\": [{\"id\": 1, \"option\": \"सीधा होना चाहिए\", \"correct\": true}, {\"id\": 2, \"option\": \"झुका हुआ होना चाहिए \", \"correct\": false}, {\"id\": 3, \"option\": \"टेढ़ा होना चाहिए \", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपका पोस्चर  कैसा होने चाहिये?\"}, {\"id\": 2, \"options\": [{\"id\": 1, \"option\": \"ध्यानपूर्वक\", \"correct\": true}, {\"id\": 2, \"option\": \"जल्दी जवाब देने के लक्ष्य से सुने \", \"correct\": false}, {\"id\": 3, \"option\": \"बिना सन्दर्भ समझे सुने\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"सवालों को किस प्रकार सुनें?\"}, {\"id\": 3, \"options\": [{\"id\": 1, \"option\": \"२ सेकंड का पॉज लेकर, सोच समझकर हल्का सा आगे झुकार उत्तर दें\", \"correct\": true}, {\"id\": 2, \"option\": \"२ सेकंड का पॉज लेकर, बिना सोचे समझे हल्का सा आगे झुकार उत्तर दें\", \"correct\": false}, {\"id\": 3, \"option\": \"२ मिनट का पॉज लेकर, सोच समझकर हल्का सा आगे झुकार उत्तर दें\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आप अपना उत्तर कैसे दें?\"}, {\"id\": 4, \"options\": [{\"id\": 1, \"option\": \"नर्वस हो जाने पर आप अपनी बोलने की गति को धीमा कर लें, सोचें और फिर बोलें\", \"correct\": true}, {\"id\": 2, \"option\": \"नर्वस हो जाने पर आप अपनी बोलने की गति को तेज़ कर लें, सोचें और फिर बोलें\", \"correct\": false}, {\"id\": 3, \"option\": \"नर्वस हो जाने पर आप अपनी बोलने की गति को तेज़ कर लें और बिना सोचे बोलें\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"नर्वस हो जाने पर आप क्या करें?\"}, {\"id\": 5, \"options\": [{\"id\": 1, \"option\": \"आत्मविश्वास के साथ \", \"correct\": true}, {\"id\": 2, \"option\": \"गुस्से के साथ \", \"correct\": false}, {\"id\": 3, \"option\": \"जानकारी के साथ\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"जवाब किस प्रकार दें?\"}]','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/3.jpeg','2021-08-06 01:36:35','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/003.mp4'),('2021-08-06 01:36:35','',9,'कुछ महत्वपूर्ण सवाल','[{\"id\": 1, \"options\": [{\"id\": 1, \"option\": \"अपने नाम से\", \"correct\": true}, {\"id\": 2, \"option\": \"अपने परिवार के बारे में बताने से\", \"correct\": false}, {\"id\": 3, \"option\": \"अपनी पढ़ाई बताने से\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपको अपना परिचय किस से शुरू करना चाहिए?\"}, {\"id\": 2, \"options\": [{\"id\": 1, \"option\": \"उन्हें बताएं की आपको उनकी कंपनी में क्या पसंद आया और आपके लॉन्ग टर्म गोल्स कैसे इस कंपनी से मेल खाते हैं\", \"correct\": true}, {\"id\": 2, \"option\": \"बाकी कंपनियों के बारे में बताएं \", \"correct\": false}, {\"id\": 3, \"option\": \"बोलें मुझे नहीं पता\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपसे जब यह पूछा जाए की आप हमारी कंपनी क्यों  ज्वाइन करना चाहते हैं तो आप क्या जवाब दें?\"}, {\"id\": 3, \"options\": [{\"id\": 1, \"option\": \"वर्क अनुभव, ज्ञान और आपका कौशल  कैसे कंपनी के काम आ सकता है\", \"correct\": true}, {\"id\": 2, \"option\": \"उनको बताएं की आपको इस नौकरी की ज़रूरत है \", \"correct\": false}, {\"id\": 3, \"option\": \"बोलेन की मैं जवाब नहीं जानता\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"जब आपसे यह पूछा जाए की हम आपको क्यों नौकरी दें तो आप क्या बताएँगे?\"}, {\"id\": 4, \"options\": [{\"id\": 1, \"option\": \"कि आप एक खुदगर्ज़ इंसान हैं \", \"correct\": true}, {\"id\": 2, \"option\": \"आप मेहनती, सेल्फ मोटिवेटेड और ईमानदार इंसान हैं \", \"correct\": false}, {\"id\": 3, \"option\": \"आपकी कोई ताकत नहीं है\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"जब आपसे यह पूछा जाए की आपकी ताकत क्या है तो आप क्या बताएं?\"}, {\"id\": 5, \"options\": [{\"id\": 1, \"option\": \"बताएँगे की आपकी पिछली नौकरी में क्या बुराइयाँ थी\", \"correct\": true}, {\"id\": 2, \"option\": \"पिछली कंपनी को धन्यवाद देंगे और आपके लॉन्ग टर्म गोल्स कैसे इस कंपनी से जुड़े हैं\", \"correct\": false}, {\"id\": 3, \"option\": \"मुझे नहीं पता मैं यह कदम क्यों ले रहा हूँ\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"जब आपसे पूछा जाये की आप नौकरी क्यों बदल रहे हैं, आप क्या कहेंगे?\"}]','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/5.jpeg','2021-08-17 20:40:13','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/004.mp4'),('2021-08-06 01:36:35','',10,'STAR फॉर्मूला','[{\"id\": 1, \"options\": [{\"id\": 1, \"option\": \"स्टार फार्मूला\", \"correct\": true}, {\"id\": 2, \"option\": \"कार फार्मूला\", \"correct\": false}, {\"id\": 3, \"option\": \"हार फॉर्मूला\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"इस वीडियो में हमने किस फार्मूला के बारे में बात की है?\"}, {\"id\": 2, \"options\": [{\"id\": 1, \"option\": \"सीटुएशनल एनालिसिस- आपको किसी भी सिचुएशन में डाला जाए आप उसमें सोच समझ कर कदम उठाएं\", \"correct\": true}, {\"id\": 2, \"option\": \"सिली थिंकिंग- किसी भी सवाल का उत्तर बिना सोचे समझे दिया जाए\", \"correct\": false}, {\"id\": 3, \"option\": \"सॉलिड एप्रोच- आप किसी भी प्रश्न की ओर एक सॉलिड एप्रोच रखें\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"स्टार फार्मूला में ‘स’ किसको दर्शाता है?\"}, {\"id\": 3, \"options\": [{\"id\": 1, \"option\": \"टास्क कम्पलीशन- जो भी काम दिया जाए उसको समय से ख़त्म करें\", \"correct\": true}, {\"id\": 2, \"option\": \"टोटल फेलियर- जो भी काम दिया जाए उसको बिलकुल न करें\", \"correct\": false}, {\"id\": 3, \"option\": \"टॉक्सिक थिंकिंग- अपने दिमाग को बोझिल न करें काम ख़त्म करने के लिए\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"स्टार फार्मूला में ‘टी’ किसको दर्शाता है?\"}, {\"id\": 4, \"options\": [{\"id\": 1, \"option\": \"एक्शन ऑफ़ द टाइम- टास्क को एक्शन के साथ और समय से ख़त्म करें\", \"correct\": true}, {\"id\": 2, \"option\": \"आस्किंग कुएस्शन- आप टास्क को जल्दी से न समझें और सवाल पूछने में सारा वक़्त जाया कर दें\", \"correct\": false}, {\"id\": 3, \"option\": \"आराम से काम- समय और एक्शन पे ध्यान न दें और अपने हिसाब से काम करें\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"स्टार फार्मूला में  ‘A’  किसको दर्शाता है?\"}, {\"id\": 5, \"options\": [{\"id\": 1, \"option\": \"रिजल्ट- आप अगर पहले के तीन स्टेप्स को सफलता से फॉलो करेंगे तो आपको बेस्ट रिजल्ट मिलेगा\", \"correct\": true}, {\"id\": 2, \"option\": \"रॉंग - आप गलत तरीके से सवालों का जवाब दें \", \"correct\": false}, {\"id\": 3, \"option\": \"रेस्ट- ज़्यादा मत सोचें और अपना इंटरव्यू का समय ज़ाया कर दें\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"स्टार फार्मूला में ‘र’ किसको दर्शाता है?\"}, {\"id\": 6, \"options\": [{\"id\": 1, \"option\": \"जुझारूपन \", \"correct\": true}, {\"id\": 2, \"option\": \"आलस \", \"correct\": false}, {\"id\": 3, \"option\": \"उदासीनता\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपको किसके साथ जवाब देने चाहियें?\"}]','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/4.jpeg','2021-08-17 20:40:17','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/005.mp4'),('2021-08-06 01:36:35','',11,'इंटरव्यू के अंत में','[{\"id\": 1, \"options\": [{\"id\": 1, \"option\": \"शुक्रिया उनके समय के लिए\", \"correct\": true}, {\"id\": 2, \"option\": \"शुक्रिया मेरा समय बर्बाद करने के लिए\", \"correct\": false}, {\"id\": 3, \"option\": \"कुछ भी नहीं और उठ के बिना कुछ बोले चला जाना चाहिए\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपको इंटरव्यू के अंत में interviewer को क्या कहना चाहिए?\"}, {\"id\": 2, \"options\": [{\"id\": 1, \"option\": \"आपसे मिल कर अच्छा लगा, और नमस्ते या गुडबाय कहें\", \"correct\": true}, {\"id\": 2, \"option\": \"मुझे यह इंटरव्यू उतना ख़ास नहीं लगा \", \"correct\": false}, {\"id\": 3, \"option\": \"आपने मुझसे बेवजह कठिन सवाल पूछे\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"जाते समय आप और क्या कहेंगे?\"}, {\"id\": 3, \"options\": [{\"id\": 1, \"option\": \"कुर्सी आपको जिस तरह मिली थी आप वैसे ही छोड़ के जाएँ\", \"correct\": true}, {\"id\": 2, \"option\": \"कुर्सी को उसकी ओरिजिनल जगह पर न रखें\", \"correct\": false}, {\"id\": 3, \"option\": \"कुर्सी को धक्का देकर बहार आएं\", \"correct\": false}, {\"id\": 4, \"option\": \"इनमें से कोई नहीं\", \"correct\": false}], \"question\": \"आपको उठ के जाते समय सबसे महत्वपूर्ण किस चीज़ का ध्यान देना चाहिए?\"}]','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/6.jpeg','2021-08-06 01:36:35','https://merarozgaarapp-assets.s3.ap-south-1.amazonaws.com/courses/Sumit+Productions/006.mp4');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_preferences`
--

DROP TABLE IF EXISTS `employee_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_preferences` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `industry_id` int DEFAULT NULL,
  `profession_id` int NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id_4` (`employee_id`,`profession_id`),
  KEY `employee_id` (`employee_id`) USING BTREE,
  KEY `employee_id_2` (`profession_id`) USING BTREE,
  KEY `industry_id` (`industry_id`) USING BTREE,
  CONSTRAINT `employee_preferences_ibfk_2` FOREIGN KEY (`industry_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_preferences_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_preferences_ibfk_4` FOREIGN KEY (`profession_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_preferences`
--

LOCK TABLES `employee_preferences` WRITE;
/*!40000 ALTER TABLE `employee_preferences` DISABLE KEYS */;
INSERT INTO `employee_preferences` VALUES ('2021-09-05 20:28:36',3,1,NULL,923,'2021-09-05 20:28:36'),('2021-09-05 20:28:36',3,2,NULL,938,'2021-09-05 20:28:36');
/*!40000 ALTER TABLE `employee_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_profile`
--

DROP TABLE IF EXISTS `employee_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_profile` (
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `address_id` int NOT NULL,
  `avatar_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_of_birth` date NOT NULL,
  `education_id` int NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `employee_id` int NOT NULL,
  `gender_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `languages` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `profile_score` int NOT NULL DEFAULT '0',
  `reference` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `show_contact` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  KEY `education_id` (`education_id`),
  KEY `gender_id` (`gender_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `employee_profile_ibfk_2` FOREIGN KEY (`education_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_profile_ibfk_3` FOREIGN KEY (`gender_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_profile_ibfk_7` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_profile_ibfk_8` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_profile`
--

LOCK TABLES `employee_profile` WRITE;
/*!40000 ALTER TABLE `employee_profile` DISABLE KEYS */;
INSERT INTO `employee_profile` VALUES (1,5,3,'2021-09-05 20:28:36','2003-09-05',775,'',3,2,1,'A',0,'',0,'2021-09-05 20:28:36');
/*!40000 ALTER TABLE `employee_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_profile_v2`
--

DROP TABLE IF EXISTS `employee_profile_v2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_profile_v2` (
  `address_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_of_birth` datetime NOT NULL,
  `education` enum('PRIMARY','CLASS_X','CLASS_XII','DIPLOMA','GRADUATE','POST_GRADUATE') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `industry_id` int NOT NULL,
  `profession_id` int NOT NULL,
  `profile_pic_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `profile_video_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `professional_references` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `selected_language` enum('HINDI','ENGLISH') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `industry_id` (`industry_id`),
  KEY `profession_id` (`profession_id`),
  CONSTRAINT `employee_profile_v2_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_profile_v2_ibfk_2` FOREIGN KEY (`industry_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_profile_v2_ibfk_3` FOREIGN KEY (`profession_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_profile_v2`
--

LOCK TABLES `employee_profile_v2` WRITE;
/*!40000 ALTER TABLE `employee_profile_v2` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_profile_v2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_skills`
--

DROP TABLE IF EXISTS `employee_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_skills` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `skill_id` int NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`,`skill_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `employee_skills_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_skills`
--

LOCK TABLES `employee_skills` WRITE;
/*!40000 ALTER TABLE `employee_skills` DISABLE KEYS */;
INSERT INTO `employee_skills` VALUES ('2021-09-05 20:28:36',3,1,33,'2021-09-05 20:28:36');
/*!40000 ALTER TABLE `employee_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_work_experiences`
--

DROP TABLE IF EXISTS `employee_work_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_work_experiences` (
  `company` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_id` int NOT NULL,
  `employment_end_date` datetime DEFAULT NULL,
  `employment_start_date` datetime DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `profession_id` int DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `upadated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `profession_id` (`profession_id`),
  CONSTRAINT `employee_work_experiences_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `employee_work_experiences_ibfk_2` FOREIGN KEY (`profession_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_work_experiences`
--

LOCK TABLES `employee_work_experiences` WRITE;
/*!40000 ALTER TABLE `employee_work_experiences` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_work_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer_profile`
--

DROP TABLE IF EXISTS `employer_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer_profile` (
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `address_id` int NOT NULL,
  `avatar_id` int NOT NULL,
  `company_id` int NOT NULL,
  `company_size_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  `industry_type_id` int NOT NULL,
  `overview` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `website` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id_2` (`company_id`),
  KEY `company_id` (`company_id`),
  KEY `company_size_id` (`company_size_id`),
  KEY `industry_type_id` (`industry_type_id`),
  KEY `address_id` (`address_id`),
  KEY `avatar_id` (`avatar_id`),
  CONSTRAINT `employer_profile_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employer_profile_ibfk_2` FOREIGN KEY (`company_size_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employer_profile_ibfk_3` FOREIGN KEY (`industry_type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employer_profile_ibfk_4` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employer_profile_ibfk_5` FOREIGN KEY (`avatar_id`) REFERENCES `uploads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer_profile`
--

LOCK TABLES `employer_profile` WRITE;
/*!40000 ALTER TABLE `employer_profile` DISABLE KEYS */;
INSERT INTO `employer_profile` VALUES (1,3,2,2,784,'2021-09-05 20:13:09',3,870,'Delta','2021-09-05 20:13:09',0,''),(1,6,4,4,784,'2021-09-05 20:48:22',4,860,'Mike','2021-09-05 20:48:22',0,'');
/*!40000 ALTER TABLE `employer_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviews` (
  `application_id` int NOT NULL,
  `channel_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` date NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('PENDING','CONFIRMED','REJECTED','RESCHEDULE') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'PENDING',
  `time` time NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_locations`
--

DROP TABLE IF EXISTS `job_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_locations` (
  `address_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `job_locations_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `job_locations_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_locations`
--

LOCK TABLES `job_locations` WRITE;
/*!40000 ALTER TABLE `job_locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `address_id` int NOT NULL,
  `benefits` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `gender` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `min_age` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `min_experience` int DEFAULT '0',
  `profession_id` int NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `salary_frequency` enum('MONTHLY','WEEKLY','DAILY') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `timings` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vacancies` int NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `working_days` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `profession_id` (`profession_id`),
  KEY `created_by` (`created_by`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`profession_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `jobs_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `jobs_ibfk_8` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,4,'NA','2021-09-05 20:20:32',2,0,'No preference',1,'',1,923,25000.00,'MONTHLY','09:00 AM - 05:00 PM','2021-09-05 20:46:31',1,1,'Monday to Friday'),(1,7,'No','2021-09-05 21:06:40',4,0,'Female',2,'',6,901,10000.00,'DAILY','10:30 AM - 09:30 PM','2021-09-05 21:07:53',3,1,'Wednesday to Thursday'),(1,10,'Yes','2021-09-05 21:35:51',4,0,'Male',3,'',0,905,100000.00,'MONTHLY','06:30 AM - 09:30 PM','2021-09-05 21:36:10',3,1,'Monday to Sunday');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT '1',
  `body` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` enum('INTERVIEW_ACCEPTED','CALL_REQUESTED','CONTACT_DETAILS','INTERVIEW_SCHEDULED','CONTACT_SHARED','JOB_OFFERED','INTERVIEW_REJECTED') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salaries`
--

DROP TABLE IF EXISTS `salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salaries` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `frequency_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `max_amount` decimal(10,2) NOT NULL,
  `min_amount` decimal(10,2) NOT NULL,
  `plus_commission` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `frequency_id` (`frequency_id`),
  CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`frequency_id`) REFERENCES `types` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salaries`
--

LOCK TABLES `salaries` WRITE;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `display_order` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `language` enum('HINDI','ENGLISH','BOTH') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'BOTH',
  `type` enum('COMPANY_SIZE_TYPE','DOCUMENT_TYPE','EDUCATION','GENDER','INDUSTRY_TYPE','JOB_TYPE','PROFESSION','SALARY_FREQUENCY','SALARY_TYPE','SKILL_TYPE') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`,`type`,`language`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES ('2021-08-01 05:51:37',1,1,'Male','ENGLISH','GENDER','2021-08-01 05:51:37'),('2021-08-01 05:51:37',2,2,'Female','ENGLISH','GENDER','2021-08-01 05:51:37'),('2021-08-01 05:51:37',3,3,'Other','ENGLISH','GENDER','2021-08-01 05:51:37'),('2021-08-01 05:59:15',1,4,'Primary','ENGLISH','EDUCATION','2021-08-07 10:33:37'),('2021-08-01 05:59:15',4,5,'Diploma','ENGLISH','EDUCATION','2021-08-07 10:32:35'),('2021-08-01 14:34:25',1,22,'Full time','ENGLISH','JOB_TYPE','2021-08-01 14:34:25'),('2021-08-01 14:34:25',2,23,'Part time','ENGLISH','JOB_TYPE','2021-08-01 14:34:25'),('2021-08-01 14:53:41',1,24,'Monthly','ENGLISH','SALARY_FREQUENCY','2021-08-01 14:53:41'),('2021-08-01 14:53:41',2,25,'Weekly','ENGLISH','SALARY_FREQUENCY','2021-08-01 14:53:41'),('2021-08-06 05:25:57',1,30,'पुस्र्ष','HINDI','GENDER','2021-08-06 05:25:57'),('2021-08-06 05:25:57',2,31,'महिला','HINDI','GENDER','2021-08-06 05:25:57'),('2021-08-06 05:25:57',3,32,'अन्य','HINDI','GENDER','2021-08-06 05:25:57'),('2021-08-07 09:41:50',1,33,'Computer skills','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',2,34,'Creativity','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',3,35,'Decision making','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',4,36,'Driving','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',5,37,'Electronic skills','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',6,38,'English speaking','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',7,39,'English writing','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',8,40,'Mechanical skills','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',9,41,'More physical work','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',10,42,'Problem-solving skills','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',11,43,'Social skills','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',12,44,'Teamwork','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:41:50',13,45,'Any other','ENGLISH','SKILL_TYPE','2021-08-07 09:41:50'),('2021-08-07 09:45:18',1,46,'कंप्यूटर कौशल','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',2,47,'रचनात्मकता','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',3,48,'निर्णय लेना','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',4,49,'ड्राइविंग','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',5,50,'इलेक्ट्रॉनिक कौशल','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',6,51,'अंग्रेजी बोलना','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',7,52,'अंग्रेजी लिखना','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',8,53,'यांत्रिक कौशल','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',9,54,'अधिक शारीरिक कार्य','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',10,55,'समस्या सुलझाने का कौशल','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',11,56,'सामाजिक कौशल','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',12,57,'टीम वर्क','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 09:45:18',13,58,'कोई अन्य','HINDI','SKILL_TYPE','2021-08-07 09:45:18'),('2021-08-07 10:32:16',2,773,'10th pass','ENGLISH','EDUCATION','2021-08-07 10:32:16'),('2021-08-07 10:32:16',3,774,'12th pass','ENGLISH','EDUCATION','2021-08-07 10:32:16'),('2021-08-07 10:32:16',5,775,'Graduate','ENGLISH','EDUCATION','2021-08-07 10:32:16'),('2021-08-07 10:32:16',6,776,'Postgraduate','ENGLISH','EDUCATION','2021-08-07 10:32:16'),('2021-08-07 10:35:01',1,777,'प्राइमरी','HINDI','EDUCATION','2021-08-07 10:35:01'),('2021-08-07 10:35:01',2,778,'10 वीं पास','HINDI','EDUCATION','2021-08-07 10:35:01'),('2021-08-07 10:35:01',3,779,'12 वीं पास','HINDI','EDUCATION','2021-08-07 10:35:01'),('2021-08-07 10:35:01',4,780,'डिप्लोमा','HINDI','EDUCATION','2021-08-07 10:35:01'),('2021-08-07 10:35:01',5,781,'ग्रेजुएट','HINDI','EDUCATION','2021-08-07 10:35:01'),('2021-08-07 10:35:01',6,782,'पोस्ट ग्रेजुएट','HINDI','EDUCATION','2021-08-07 10:35:01'),('2021-08-07 14:01:37',1,783,'Less than 100','ENGLISH','COMPANY_SIZE_TYPE','2021-08-07 14:01:37'),('2021-08-07 14:01:37',2,784,'100-1000','ENGLISH','COMPANY_SIZE_TYPE','2021-08-07 14:01:37'),('2021-08-07 14:01:37',3,785,'Above 1000','ENGLISH','COMPANY_SIZE_TYPE','2021-08-07 14:01:37'),('2021-08-07 14:03:51',1,789,'100 से कम','HINDI','COMPANY_SIZE_TYPE','2021-08-07 14:03:51'),('2021-08-07 14:03:51',2,790,'100-1000','HINDI','COMPANY_SIZE_TYPE','2021-08-07 14:03:51'),('2021-08-07 14:03:51',3,791,'1000 से ज़्यादा','HINDI','COMPANY_SIZE_TYPE','2021-08-08 17:01:16'),('2021-09-05 19:02:50',1,847,'Aerospace and Aviation / एयरोस्पेस और एविएशन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',2,848,'Agriculture and Allied / कृषि और संबद्ध','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',3,849,'Apparel / Textile / वस्त्र','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',4,850,'Automotive / ऑटोमोटिव','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',5,851,'Banking, Financial Services and Insurance / बैंकिंग, वित्तीय सेवाएं और बीमा','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',6,852,'Beauty & Wellness / सौंदर्य और कल्याण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',7,853,'Biotechnology / जैव प्रौद्योगिकी','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',8,854,'Capital Goods / पूंजीगत सामान','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',9,855,'Cement / सीमेंट','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',10,856,'Chemicals / रसायन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',11,857,'Construction / निर्माण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',12,858,'Consumer Durables / कंज्यूमर ड्यूरेबल्स','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',13,859,'Domestic Workers / घरेलू कामगार','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',14,860,'E-Commerce / ई-कॉमर्स','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',15,861,'Education and Training / शिक्षा और प्रशिक्षण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',16,862,'Electronics / इलेक्ट्रॉनिक्स','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',17,863,'Engineering / इंजीनियरिंग','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',18,864,'Food Processing / खाद्य प्रसंस्करण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',19,865,'Furniture & Fittings / फर्नीचर और फिटिंग','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',20,866,'Gems & Jewellery / रत्न और आभूषण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',21,867,'Handicrafts and Carpet / हस्तशिल्प और कालीन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',22,868,'Healthcare / स्वास्थ्य देखभाल','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',23,869,'Hospitality and Tourism / आतिथ्य और पर्यटन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',24,870,'Information Technology / सूचना प्रौद्योगिकी','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',25,871,'Infrastructure / बुनियादी ढांचा','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',26,872,'Instrumentation / इंस्ट्रुमेंटेशन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',27,873,'Iron and Steel / लोहा और इस्पात','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',28,874,'Leather / चमड़ा','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',29,875,'Life Sciences / जीवन विज्ञान','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',30,876,'Logistics / लॉजिस्टिक्स','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',31,877,'MSME / सूक्ष्म, लघु व मध्यम उद्योग','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',32,878,'Management / प्रबंधन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',33,879,'Manufacturing / विनिर्माण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',34,880,'Media & Entertainment / मीडिया और मनोरंजन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',35,881,'Medical Devices / चिकित्सा उपकरण','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',36,882,'Metals and Mining / धातु और खनन','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',37,883,'Microfinance Institutions / माइक्रो फ़ाइनैन्स संस्था','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',38,884,'Oil and Gas / तेल और गैस','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',39,885,'Paints and Coatings / पेंट और कोटिंग्स','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',40,886,'Pharmaceuticals / फार्मास्यूटिकल्स','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',41,887,'Plumbing / प्लंबिंग','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',42,888,'Ports / बंदरगाह','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',43,889,'Power / पावर','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',44,890,'Railways / रेलवे','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',45,891,'Real Estate / रियल एस्टेट','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',46,892,'Renewable Energy and Green Jobs / अक्षय ऊर्जा और हरित नौकरियां','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',47,893,'Retail / खुदरा','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',48,894,'Roads / सड़कें','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',49,895,'Rubber / रबड़','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',50,896,'Science and Technology / विज्ञान और प्रौद्योगिकी','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',51,897,'Services / सर्विसेज','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',52,898,'Sports / खेल','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:02:50',53,899,'Telecommunications / दूरसंचार','BOTH','INDUSTRY_TYPE','2021-09-05 19:02:50'),('2021-09-05 19:49:30',1,900,'AC Technician / एसी तकनीशियन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',2,901,'Accounts / Finance / लेखा / वित्त','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',3,902,'Acupressure therapist / एक्यूप्रेशर थेरेपिस्ट','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',4,903,'Admin / Office Assistant / व्यवस्थापक / कार्यालय सहायक','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',5,904,'Aerodynamics Engineer / वायुगतिकी इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',6,905,'Aircraft Maintenance / विमान रखरखाव','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',7,906,'Airline Cabin Crew / एयरलाइन केबिन क्रू','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',8,907,'Airline Cargo Assistant / एयरलाइन कार्गो सहायक','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',9,908,'Airline High Lift Truck Operator / एयरलाइन हाई लिफ्ट ट्रक ऑपरेटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',10,909,'Airline Security Staff / एयरलाइन सुरक्षा कर्मचारी','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',11,910,'App Developer / ऐप डेवलपर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',12,911,'Aquaculture/ Fish farm / जलीय कृषि/मछली फार्म','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',13,912,'Baby/Child caretaker / बेबी / चाइल्ड केयरटेकर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',14,913,'Back Office / बैक कार्यालय','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',15,914,'Beautician / Hair Stylist / ब्यूटीशियन / हेयर स्टाइलिस्ट','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',16,915,'Business Development / व्यापार विकास','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',17,916,'Caregiver for mother & newborn / माँ और नवजात शिशु की देखभाल','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',18,917,'Caretaker for disabled/ elderly / विकलांग/बुजुर्गों की  देखभाल ','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',19,918,'Carpenter / कारपेंटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',20,919,'Chemical Engineer / रासायनिक इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',21,920,'Civil Engineer / सिविल इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',22,921,'Cold Store / कोल्ड स्टोर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',23,922,'Computer / Data Entry Operator / COPA / कंप्यूटर / डाटा एंट्री ऑपरेटर / सीओपीए','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',24,923,'Computer Engineer / कंप्यूटर इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',25,924,'Content Writing / कंटेंट लेखन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',26,925,'Cook / Chef / Baker / रसोइया / बावर्ची / बेकर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',27,926,'Corporate Trainer / कॉर्पोरेट ट्रेनर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',28,927,'Counsellor / काउंसलर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',29,928,'DTP Operator / Printer / डीटीपी ऑपरेटर / प्रिंटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',30,929,'Dairy farm / गोशाला','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',31,930,'Delivery Person / डिलिवरी करने वाला व्यक्ति','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',32,931,'Digital Marketing / Online Marketing / डिजिटल मार्केटिंग / ऑनलाइन मार्केटिंग','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',33,932,'Doctors / डॉक्टर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',34,933,'Draughtsman / नक़्शानवीस','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',35,934,'Driver / ड्राइवर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',36,935,'Electrical Engineer / विद्युत इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',37,936,'Electrician / Wireman / इलेक्ट्रीशियन / वायरमैन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',38,937,'Electronic Engineer / इलेक्ट्रॉनिक इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',39,938,'Engineer (Other) / इंजीनियर (अन्य)','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',40,939,'Farmer/ Cultivator / किसान','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',41,940,'Fashion Designer / फैशन डिजाइनर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',42,941,'Fitness Trainer / फिटनेस ट्रेनर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',43,942,'Florist / फूलवाला','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',44,943,'Foreman / फोरमैन/ पंचों का सरदार','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',45,944,'Foundry / फाउंड्री','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',46,945,'Gardener/ Nursery Worker / माली/नर्सरी कार्यकर्ता','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',47,946,'Graphic Designer / ग्राफिक डिजाइनर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',48,947,'Hand Embroiderer /Weaver / हाथ से कढ़ाई करने वाला/ बुनकर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',49,948,'Hardware & Network Engineer / हार्डवेयर और नेटवर्क इंजीनियर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',50,949,'Hospitality / Hotel Management / हॉस्पिटैलिटी / होटल प्रबंधन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',51,950,'Hotel / Restaurant Staff / होटल / रेस्टोरेंट कर्मचारी','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',52,951,'Housekeeping / घर का रख रखाव','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',53,952,'Human resources / मानव संसाधन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',54,953,'IT Support / आईटी समर्थन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',55,954,'Instrument Mechanic / यंत्र मैकेनिक','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',56,955,'Insurance agent / बीमा एजेंट','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',57,956,'Interior Designer / इंटीरियर डिज़ाइनर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',58,957,'Lab Technician / प्रयोगशाला तकनीशियन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',59,958,'Labour / Worker / श्रमिक / कार्यकर्ता','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',60,959,'Legal / कानूनी','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',61,960,'Logistics/Operations / लोजिस्टिक्स/ संचालन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',62,961,'Machine Operator / मशीन आपरेटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',63,962,'Maid / मेड (सेविका )','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',64,963,'Marketing / विपणन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',65,964,'Mason / मिस्त्री','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',66,965,'Mechanic / मैकेनिक','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',67,966,'Mechanical Engineer / यांत्रिकी अभियंता','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',68,967,'Medical (Other) / चिकित्सा (अन्य)','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',69,968,'Mobile Technician / मोबाइल तकनीशियन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',70,969,'Mutual fund agent / म्यूचुअल फंड एजेंट','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',71,970,'Nurse / नर्स','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',72,971,'Office Help / Peon / कार्यालय सहायता / चपरासी','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',73,972,'Operations / संचालन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',74,973,'Pack house / पैक हाउस','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',75,974,'Painter / पेंटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',76,975,'Pharmacist / फार्मेसिस्ट','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',77,976,'Plumber / प्लंबर/ नलकार','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',78,977,'Poultry Farm / मुर्गीपालन फार्म','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',79,978,'Receptionist / Front Office Desk / रिसेप्शनिस्ट / फ्रंट ऑफिस डेस्क','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',80,979,'Refrigerator Technician / रेफ्रिजरेटर तकनीशियन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',81,980,'Retail / खुदरा','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',82,981,'Sales (Field Work) / बिक्री (क्षेत्रीय कार्य)','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',83,982,'Scaffolder / मचान','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',84,983,'Security Guard / सुरक्षा गार्ड','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',85,984,'Software / Web Developer / सॉफ्टवेयर / वेब डेवलपर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',86,985,'Solar Engineer / सौर अभियंता','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',87,986,'Spa therapist / स्पा थेरेपिस्ट','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',88,987,'Storekeeper / दुकानदार','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',89,988,'Supervisor / पर्यवेक्षक','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',90,989,'Tailor / Cutting Master / दर्जी / कटिंग मास्टर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',91,990,'Teacher / अध्यापक','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',92,991,'Technician / तकनीशियन','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',93,992,'Telecaller / BPO / टेलीकॉलर / बीपीओ','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',94,993,'Tool and Die Maker / टूल एंड डाई मेकर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',95,994,'Turner-Fitter / टर्नर-फिटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',96,995,'Video Editor / वीडियो संपादक/ वीडियो एडीटर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',97,996,'Ward Helper / वार्ड हेल्पर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',98,997,'Warehouse / गोदाम','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',99,998,'Welder / वेल्डर','BOTH','PROFESSION','2021-09-05 19:49:30'),('2021-09-05 19:49:30',100,999,'Yoga trainer / योगा ट्रेनर','BOTH','PROFESSION','2021-09-05 19:49:30');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploads` (
  `context` enum('AVATAR','ID_PROOF') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `uploads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES ('AVATAR','2021-09-05 20:13:09',2,'2021-09-05 20:13:09','https://merarozgaarapp.s3.ap-south-1.amazonaws.com/2/avatar',2),('AVATAR','2021-09-05 20:28:36',3,'2021-09-05 20:28:36','https://merarozgaarapp.s3.ap-south-1.amazonaws.com/3/avatar',3),('AVATAR','2021-09-05 20:48:22',4,'2021-09-05 20:48:22','https://merarozgaarapp.s3.ap-south-1.amazonaws.com/4/avatar',4);
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dial_code` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fcm_token` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `mobile_number` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `notification_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `otp` int DEFAULT NULL,
  `role` enum('ADMIN','EMPLOYEE','EMPLOYER') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `setup_completed` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_number` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2021-09-05 20:12:43','+91','','fIjTPz8aSweXyCgJAicP-E:APA91bEKH7c88-bZABT0ynheC-WDbWfyw9Mp6lJJD3pWujylESKysS7lmSDkMNcVtIBzQRACWmDE8Ufvh5Z6h4oP30QbonadrhKMLPOMdDJV7bjFVmN9cKmsVAZHhwVrlgYkED-J3xj3',2,'9008007001','Delta',1,NULL,'EMPLOYER',0,'2021-09-05 21:50:39',1),(1,'2021-09-05 20:23:32','+91','','fIjTPz8aSweXyCgJAicP-E:APA91bEKH7c88-bZABT0ynheC-WDbWfyw9Mp6lJJD3pWujylESKysS7lmSDkMNcVtIBzQRACWmDE8Ufvh5Z6h4oP30QbonadrhKMLPOMdDJV7bjFVmN9cKmsVAZHhwVrlgYkED-J3xj3',3,'9008007002','Tango',1,NULL,'EMPLOYEE',0,'2021-09-05 21:37:14',1),(1,'2021-09-05 20:47:34','+91','','fIjTPz8aSweXyCgJAicP-E:APA91bEKH7c88-bZABT0ynheC-WDbWfyw9Mp6lJJD3pWujylESKysS7lmSDkMNcVtIBzQRACWmDE8Ufvh5Z6h4oP30QbonadrhKMLPOMdDJV7bjFVmN9cKmsVAZHhwVrlgYkED-J3xj3',4,'9008007003','Mike',1,NULL,'EMPLOYER',0,'2021-09-05 21:33:44',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-05 21:54:54
