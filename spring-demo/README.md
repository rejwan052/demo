# Spring Demo

用 spring Boot 與 ReactJS 實作簡易庫存系統。前端使用 Core UI 修改而成。

[影片](https://youtu.be/01mFXafiWX0)

相關技術：

* [spring-boot]
* [spring-security]
* [hibernate]
* [hibernate-search]
* [reactjs]
* [typescript]


# 執行

## Create Database

```
drop database testdb; create database testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Start Server

```
$ cd server-admin
$ gradle bootRun
```

## Start Client

```
$ cd client-app
$ yarn start
```

## Open Browser

http://localhost:3000


[spring-boot]: https://projects.spring.io/spring-boot/ "Spring Boot"
[spring-security]: https://projects.spring.io/spring-security/ "Spring Security"
[hibernate]: http://hibernate.org/ "Hibernate"
[hibernate-search]: http://hibernate.org/search/
[reactjs]: https://reactjs.org/
[typescript]: https://www.typescriptlang.org/

