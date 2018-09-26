/*
Navicat MySQL Data Transfer

Source Server         : 123
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : h5

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-09-25 19:40:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `send` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `star` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('G001', '北京平谷仙桃1.2kg150g以上/个', '甜甜润润水灵�?', 'fruit', 'img/1.jpg', '北京平谷', '广州', '39.9', '4.9', '24');
INSERT INTO `goodslist` VALUES ('G002', '山东白金蜜瓜2个600g以上/个', '甜甜润润水灵�?', 'fruit', 'img/2.jpg', '山东烟台', '广州', '32.8', '4.7', '23');
INSERT INTO `goodslist` VALUES ('G003', '山东白金蜜瓜2个600g以上/个', '甜甜润润水灵�?', 'fruit', 'img/2.jpg', '山东烟台', '广州', '32.8', '4.7', '23');
INSERT INTO `goodslist` VALUES ('G004', '新疆夏黑葡萄1kg', '甜甜润润水灵�?', 'fruit', 'img/4.jpg', '新疆', '广州', '21.8', '5', '157');
INSERT INTO `goodslist` VALUES ('G005', '山东丰水梨8个约300g/个', '甜甜润润水灵�?', 'fruit', 'img/5.jpg', '山东烟台', '广州', '28.8', '5', '194');
INSERT INTO `goodslist` VALUES ('G006', '海南小青柠500g(GD)', '迷你小清新，酸爽够劲', 'fruit', 'img/6.jpg', '海南三亚', '广州', '16.9', '5', '64');
INSERT INTO `goodslist` VALUES ('G007', '广东潮汕杨桃1盒(2个)', '可爱星星果，时令小清�?', 'fruit', 'img/7.jpg', '广东潮州', '广州', '12.9', '4.9', '70');
INSERT INTO `goodslist` VALUES ('G008', '福建琯溪白心蜜柚2个约1kg/个', '柔软细嫩 满满维C', 'fruit', 'img/8.jpg', '福建琯溪', '广州', '29.9', '4.8', '83');
INSERT INTO `goodslist` VALUES ('G009', '新疆库尔勒精选红香酥梨1kg约120g/个', '西域“小公主�?', 'fruit', 'img/5.jpg', '新疆', '广州', '14.8', '5', '1811');
INSERT INTO `goodslist` VALUES ('G010', '新疆西梅2盒(500g以上/盒)', '西域小美�?', 'fruit', 'img/10.jpg', '新疆伊犁', '广州', '78', '5', '46');
INSERT INTO `goodslist` VALUES ('G011', '四川凯特芒果(青皮)1个约600g/个', '硕大个头 啃食更过�?', 'fruit', 'img/11.jpg', '四川攀枝花', '广州', '20.9', '5', '1950');
INSERT INTO `goodslist` VALUES ('G012', '四川凯特芒果(黄皮)4个约600g/个', '甜甜润润水灵�?', 'fruit', 'img/12.jpg', '四川攀枝花', '广州', '79.9', '4.9', '30');
INSERT INTO `goodslist` VALUES ('G013', '新疆薄皮脆甜西州蜜瓜1个1.3kg以上/个', '脆甜西州�?瓜中实力�?', 'fruit', 'img/8.jpg', '新疆吐鲁�?', '广州', '36.8', '5', '83');
INSERT INTO `goodslist` VALUES ('G014', '福建琯溪三红柚2个约1kg/个', '脆嫩细滑 柚香清新', 'fruit', 'img/14.jpg', '福建琯溪', '广州', '75.8', '4.8', '231');
INSERT INTO `goodslist` VALUES ('G015', '云南蒙自石榴6个约225g/个', '果粒爆汁 清甜不酸�?', 'fruit', 'img/15.jpg', '云南红河', '广州', '35.8', '5', '5032');
INSERT INTO `goodslist` VALUES ('G016', '黑龙江地雷西瓜1个5kg以上/个', '个头�?水分�?', 'fruit', 'img/16.jpg', '黑龙江哈尔滨', '广州', '29.9', '5', '5');
INSERT INTO `goodslist` VALUES ('G017', '国产红心猕猴桃1.9kg原箱(20-24个)', '糯滑多汁 满满维c', 'fruit', 'img/17.jpg', '中国', '广州', '89', '4.9', '271');
INSERT INTO `goodslist` VALUES ('G018', '海南蜜宝红心火龙果8个(中果)250-350g/个', '满满花青�?细滑水润', 'fruit', 'img/18.jpg', '海南东方', '广州', '76.9', '5', '210');
INSERT INTO `goodslist` VALUES ('G019', '广西珍珠李500g13g以上/个', '酸甜适中 脆嫩爽口', 'fruit', 'img/19.jpg', '广西河池', '广州', '19.9', '5', '10');
INSERT INTO `goodslist` VALUES ('G020', '新疆无核白葡萄1kg', '脆甜无籽 一口一�?', 'fruit', 'img/20.jpg', '新疆伊犁', '广州', '19.9', '4.9', '2177');
INSERT INTO `goodslist` VALUES ('G021', '云南人参果 1kg', '西域小美�?', 'fruit', 'img/21.jpg', '新疆伊犁', '广州', '25.8', '4.9', '403');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(16) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `avatar` tinyint(1) unsigned DEFAULT '1',
  `login_key` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'aaa', 'e10adc3949ba59abbe56e057f20f883e', '1', null);
INSERT INTO `users` VALUES ('2', 'aaaa', 'e10adc3949ba59abbe56e057f20f883e', '1', null);
INSERT INTO `users` VALUES ('3', 'aaaaa', 'e10adc3949ba59abbe56e057f20f883e', '1', null);
INSERT INTO `users` VALUES ('4', 'aaaaaa', 'e10adc3949ba59abbe56e057f20f883e', '1', null);
SET FOREIGN_KEY_CHECKS=1;
