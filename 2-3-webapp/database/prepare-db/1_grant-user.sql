CREATE USER 'contacts-user'@'%' IDENTIFIED BY '123456';
GRANT ALL ON `contacts_test`.* TO 'contacts-user'@'%';