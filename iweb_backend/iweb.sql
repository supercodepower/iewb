SET NAMES UTF8;
DROP DATABASE IF EXISTS iweb;
CREATE DATABASE iweb CHARSET=UTF8;
USE iweb;

/*0.网站基本信息类*/
CREATE TABLE basicInfo(
    logoUrl VARCHAR(128),  /*logo图片路径*/
    siteName VARCHAR(32),   /*网站名称*/
    adminMail VARCHAR(64),  /*管理员邮箱*/
    adminPhone VARCHAR(19), /*管理员电话*/
    copyright VARCHAR(128), /*版权声明*/
    companyName VARCHAR(64),    /*公司名称*/
    icp VARCHAR(64) /*ICP备案号*/
);

INSERT INTO basicInfo VALUES('C:\Users\wt\Desktop\niu.png','iweb在线课堂', 'iweb@126.com',' 4008-200-200','Copyright  2016-2020 tedu.com，All Rights Reserved版权所有','北京达内教育集团','京ICP备123456号-1京公网安备110180201608号');

CREATE TABLE carousel(
    cid INT PRIMARY KEY AUTO_Increment, /*广告编号*/
    picUrl VARCHAR(128),    /*图片地址*/
    herf VARCHAR(128),  /*引用地址*/
    title VARCHAR(128) /*说明文字*/
);

INSERT INTO carousel VALUES
    (1,'images/banner_01.jpg','craousel_detail.html?cid=1','01_linux系统管理'),
    (2,'images/banner_02.jpg','craousel_detail.html?cid=2','02_linux系统管理'),
    (3,'images/banner_03.jpg','craousel_detail.html?cid=3','03_linux系统管理'),
    (4,'images/banner_04.jpg','craousel_detail.html?cid=4','04_linux系统管理')
;

CREATE TABLE school( 
    sid INT PRIMARY KEY auto_increment, /*校区编号*/
    sname VARCHAR(32), /*校区名称*/
    address VARCHAR(128), /*地址*/
    phone VARCHAR(16), /*电话*/
    postcode VARCHAR(6) /*邮编*/
);

INSERT INTO school VALUES
(1,'北京中关村中心','北京市海淀区北三环西路甲18号(大钟寺附近）中鼎大厦B座7层', '010-62130989','124578'),
(2, '北京天坛中心','北京市崇文区珠市口东大街6号珍贝大厦西侧3层达内科技', '010-67028668', '104578'),
(3,'北京广渠门中心','北京市东城区广渠门东广渠家园25号楼启达大厦一层','15321130620','100010'),
(4, '北京清华园中心','北京市海淀区花园路小关街120号万盛商务会馆A区三层','010-82676916','458745'),
(5, '北京万寿路中心', '北京市海淀区万寿路西街2号文博大厦二层达内科技','010-82761288', '100088');


CREATE TABLE teacher (
    tid INT PRIMARY KEY auto_increment, /*讲师编号*/
    tname VARCHAR(32),  /*讲师名称*/
    mainCourse VARCHAR(32), /*主讲课程*/
    tpic VARCHAR(64),   /*照片*/
    experience VARCHAR(1024),   /*授课经验*/
    style VARCHAR(1024)    /*授课风格*/
);

INSERT INTO teacher VALUES
(1,'小红','简单编程','img-teacher/01.jpg','<p>拥有丰富的授课经验，拥有丰富的授课经验，拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验。</p><p>拥有丰富的授课经验，拥有丰富的授课经验，拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验。</p><p>拥有丰富的授课经验，拥有丰富的授课经验，拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验拥有丰富的授课经验。</p>','幽默风趣'),
(2,'小百','中级编程','img-teacher/02.jpg','中','诙谐幽默'),
(3,'小灰','高级编程','img-teacher/03.jpg','多','见多识广'),
(4,'小王','vue.js高级','img-teacher/04.jpg','多','深入浅出'),
(5,'小亮','react高级','img-teacher/05.jpg','多','循循善诱');



/*4.课程类别表*/
CREATE TABLE type (
    tpid INT PRIMARY KEY AUTO_INCREMENT,/*类别编号*/
    tpname VARCHAR (32) /*类别名称*/
) ;

INSERT INTO type VALUES
(1,'基础课程'),
(2,'核心课程'),
(3,'进阶课程');

/*5.课程表*/
CREATE TABLE course (
    cid INT PRIMARY KEY AUTO_INCREMENT,/*课程编号*/
    typeId INT,/*课程类别*/
    title VARCHAR(32),/*课程名称*/
    teacherId INT,/*主讲老师*/
    cLength VARCHAR (32) ,/*课时*/
    startTime VARCHAR(32),/*开课时间*/
    address VARCHAR (32),/*授课地址*/
    pic VARCHAR(32),/*主图片*/
    price FLOAT (8,2),/*价格*/
    details VARCHAR(2048),/*详情*/
    buyCount INT/*购买次数*/
);

INSERT INTO course VALUES
(1,1,'简单编程','1','3天','20-07-01','北京','img-course/01.png',255,'asd',1),
(2,1,'简单编程','1','3天','20-08-01','北京','img-course/02.png',255,'asd',2),
(3,2,'中级编程','2','3天','20-09-01','上海','img-course/03.png',255,'asd',5),
(4,3,'高级编程','3','7天','20-10-01','广州','img-course/04.png',255,'asd',3),
(5,3,'购物商城网站开发','3','6天','20-11-01','广州','img-course/05.png',599,'asd',6),
(6,1,'音乐网站开发','1','5天','20-07-01','北京','img-course/01.png',250,'asd',9),
(7,1,'简单编程','1','3天','20-08-01','北京','img-course/01.png',255,'asd',2),
(8,2,'中级编程','2','3天','20-09-01','上海','img-course/01.png',255,'asd',3),
(9,3,'高级编程','3','7天','20-10-01','广州','img-course/01.png',255,'asd',4),
(10,3,'高级编程','3','7天','20-11-01','广州','img-course/01.png',255,'asd',1),
(11,1,'简单编程','1','3天','20-07-01','北京','img-course/01.png',255,'asd',2),
(12,1,'竞技游戏网站开发','1','12天','20-08-01','北京','img-course/06.png',450,'asd',7),
(13,2,'中级编程','2','3天','20-09-01','上海','img-course/01.png',255,'asd',5),
(14,3,'素材网站开发','3','3天','20-10-01','广州','img-course/03.png',299,'asd',6),
(15,3,'高级编程','3','7天','20-11-01','广州','img-course/01.png',255,'asd',3),
(16,2,'vue.js高级','4','5天','20-07-01','北京','img-course/01.png',255,'asd',4),
(17,2,'vue.js高级','4','5天','20-08-01','北京','img-course/01.png',255,'asd',3),
(18,2,'租房网站开发','2','5天','20-09-01','上海','img-course/04.png',399,'asd',6),
(19,3,'react高级','5','7天','20-10-01','广州','img-course/01.png',255,'asd',1),
(20,3,'react高级','5','7天','20-11-01','广州','img-course/01.png',255,'asd',2),
(21,2,'vue.js高级','4','5天','20-07-01','北京','img-course/01.png',255,'asd',1),
(22,2,'vue.js高级','4','5天','20-08-01','北京','img-course/01.png',255,'asd',1),
(23,2,'中级编程','2','3天','20-09-01','上海','img-course/01.png',255,'asd',1),
(24,3,'高级编程','3','7天','20-10-01','广州','img-course/01.png',255,'asd',1),
(25,3,'react高级','5','7天','20-11-01','广州','img-course/01.png',255,'asd',4),
(26,2,'竞技游戏网站开发','1','12天','20-07-01','北京','img-course/06.png',450,'asd',1),
(27,1,'购物商城网站开发','5','6天','20-08-01','北京','img-course/05.png',599,'asd',1),
(28,2,'租房网站开发','2','5天','20-09-01','上海','img-course/04.png',399,'asd',2),
(29,3,'素材网站开发','5','3天','20-10-01','广州','img-course/03.png',299,'asd',1),
(30,3,'音乐网站开发','5','5天','20-11-01','广州','img-course/01.png',250,'asd',3),
(31,3,'手把手教你开发经典象的棋游戏','5','7天','20-11-01','广州','img-course/02.png',199,'<p>本课程详细讲解了HTML5的各个方面，课程从环境搭建开始，依次讲述了HTML5新元素、Canvas、SVG、Audio、GPS定位、拖拽效果、WEB存储、AppCache、HTML5 多线程和HTML5消息推送等内容。本课程详细讲解了HTML5的各个方面，课程从环境搭建开始，依次讲述了HTML5新元素、Canvas、SVG、Audio、GPS定位、拖拽效果、WEB存储、App Cache、HTML5多线程和HTML5消息推送等内容。</p><p>本课程详细讲解了HTML5的各个方面，课程从环境搭建开始，依次讲述了HTML5新元素、Canvas、SVG、Audio、GPS定位、拖拽效果、WEB存储、App Cache、HTML5多线程和HTML5消息推送等内容。本课程详细讲解了HTML5的各个方面，课程从环境搭建开始，依次讲述了HTML5新元素、Canvas、SVG、Audio、GPS定位、拖拽效果、WEB存储、App Cache、HTML5多线程和HTML5消息推送等内容。',8);

/*6.校区开课表*/
CREATE TABLE schoolCourse(
    scId INT PRIMARY KEY AUTO_INCREMENT,
    schoolId INT,   /*校区编号*/
    courseId INT    /*课程 编号*/
);

INSERT INTO schoolCourse VALUES
(NULL,1,1),
(NULL,1,2),
(NULL,1,3),
(NULL,1,27),
(NULL,1,11),
(NULL,1,12),
(NULL,1,30),
(NULL,1,20),
(NULL,2,24),
(NULL,2,8),
(NULL,2,6),
(NULL,2,22),
(NULL,2,31),
(NULL,2,26),
(NULL,3,3),
(NULL,3,4),
(NULL,3,5),
(NULL,3,31),
(NULL,3,14),
(NULL,3,15),
(NULL,4,23),
(NULL,4,29),
(NULL,4,9),
(NULL,4,10),
(NULL,4,31),
(NULL,4,21),
(NULL,4,19),
(NULL,4,25),
(NULL,5,12),
(NULL,5,13),
(NULL,5,17),
(NULL,5,7),
(NULL,5,16),
(NULL,5,18);


/*7.用户表*/
CREATE TABLE user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32),
    phone VARCHAR(11),
    upwd VARCHAR(32),
    nickName VARCHAR(32) NOT NULL DEFAULT '',
    sex VARCHAR(1) NOT NULL DEFAULT '',
    age VARCHAR(3) NOT NULL DEFAULT '',
    edu VARCHAR(16) NOT NULL DEFAULT '',
    job VARCHAR(16) NOT NULL DEFAULT '',
	avatar VARCHAR(128) NOT NULL DEFAULT 'imagescarouselcidpicUrlherf/user.png'
);

INSERT INTO `user` (`uid`,`uname`,`phone`,  `upwd`,`nickname`,`sex`,`age`,`edu`) VALUES
(1,'wang@qq.com','12341234123','wt123456','xiaowang','男','35','本科'),
(2,'zhang@qq.com','12341234123','wt123456basicinfo','xiaozhang','女','35','本科');

/*8.收藏夹*/
CREATE TABLE favorite (
    fid INT PRIMARY KEY AUTO_INCREMENT,/*收藏记录id*/
    userId INT, /*用户id*/
    courseId INT,/*课程id*/
    fTime VARCHAR(16)/*收藏时间*/
);

/*9.购物车表*/
CREATE TABLE cart(
    ctId INT PRIMARY KEY AUTO_INCREMENT,/*购物车编号*/
	ctTime VARCHAR(16),/*加入购物车时间*/
    userId INT,/*用户编号*/
    courseId INT,/*产品编号*/
    count INT/*数量*/
	
);

INSERT INTO `cart`( `ctid`,`ctTime`, `userId`, `courseId`,`count`) VALUES
(1,122222,2,10,3),
(2,222222,2,7,1),
(3,322222,2,5,4);

/*收货地址表*/
CREATE TABLE orderAddress(
    oaId INT PRIMARY KEY auto_increment,
    province VARCHAR(32),
    city VARCHAR(32),
    country VARCHAR(32),
    details VARCHAR(128),
    phone VARCHAR(11),
    receiverName VARCHAR(32)
);

/**10.订单表*/
CREATE TABLE orders (
    oid INT PRIMARY KEY AUTO_INCREMENT,/*订单id*/
    userid INT/*用户id*/
);

INSERT INTO `orders` ( `oid`, `userId`) VALUES
(1,2),
(2,2),
(3,1);

/**11.订单详情表**/
CREATE TABLE ordersDetail(
    odid INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT, /*订单编号*/
    courseId INT, /*课程编号*/
    count INT/*购买数量*/
);
INSERT INTO `ordersDetail`( `odid`, `orderId`, `courseId`,`count`) VALUES 
(1,1,8,2),
(2,1,10,1),
(3,2,3,1),
(4,3, 4,5),
(5,3,9,1) ,
(6,3,11,3);




