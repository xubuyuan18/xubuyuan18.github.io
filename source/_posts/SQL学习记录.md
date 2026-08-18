---
title: SQL 学习记录
abbrlink: 35093
date: 2026-08-18 12:23:15
tags:
  - SQL
  - MySQL
  - Database
categories:
  - 数据库

---

# 第一章：认识 SQL

> 本章目标：理解 SQL、RDBMS、表/行/列等基本概念，并掌握最常见的 SQL 语句结构。

## 1. SQL 是什么？

SQL（Structured Query Language，结构化查询语言）是一种用于管理和操作关系型数据库的标准语言。

SQL 主要可以完成以下操作：

- 查询数据
- 插入数据
- 更新数据
- 删除数据
- 创建或修改数据库结构
- 创建表、视图、索引等数据库对象
- 设置部分数据库对象的访问权限

SQL 使用大量接近英语的关键字，因此语句通常具有较好的可读性。

---

## 2. SQL 能做什么？

常见能力包括：

- 使用 `SELECT` 从数据库中查询数据
- 使用 `INSERT INTO` 插入新数据
- 使用 `UPDATE` 修改已有数据
- 使用 `DELETE` 删除数据
- 使用 `CREATE DATABASE` 创建数据库
- 使用 `CREATE TABLE` 创建数据表
- 使用 `ALTER TABLE` 修改表结构
- 使用 `DROP TABLE` 删除表
- 创建视图（View）
- 创建索引（Index）
- 创建存储过程（Stored Procedure）
- 管理部分数据库对象的权限

---

## 3. RDBMS

RDBMS（Relational Database Management System）指**关系型数据库管理系统**。

常见的关系型数据库包括：

- MySQL
- PostgreSQL
- Oracle Database
- Microsoft SQL Server
- IBM Db2
- SQLite

### 3.1 表、行、列

关系型数据库通常使用“表（Table）”保存数据。

一个表由以下两部分组成：

- **行（Row / Record）**：一条完整的数据记录
- **列（Column / Field）**：数据的某一种属性

例如：

|   id | name     | url                       | alexa | country |
| ---: | -------- | ------------------------- | ----: | ------- |
|    1 | Google   | https://www.google.com/   |     1 | USA     |
|    2 | 淘宝     | https://www.taobao.com/   |    13 | CN      |
|    3 | 菜鸟教程 | https://www.runoob.com/   |  4689 | CN      |
|    4 | 微博     | https://weibo.com/        |    20 | CN      |
|    5 | Facebook | https://www.facebook.com/ |     3 | USA     |

可以把它理解为：

- 表名：`Websites`
- 每一行：一个网站
- `name`、`url`、`country`：不同字段

---

# 第二章：SQL 基础语法

## 1. 选择数据库

MySQL 中可以使用：

```sql
USE RUNOOB;
```

作用：选择接下来要操作的数据库。

---

## 2. 设置字符集

旧版 MySQL 示例中经常看到：

```sql
SET NAMES utf8;
```

它表示设置当前客户端连接使用的字符集。

> 实际项目中通常建议统一使用 `utf8mb4`，以获得更完整的 Unicode 支持。

---

## 3. 查询整张表

```sql
SELECT *
FROM Websites;
```

说明：

- `SELECT`：查询
- `*`：所有列
- `FROM`：指定数据来源
- `Websites`：表名

---

## 4. SQL 是否区分大小写？

SQL **关键字通常不区分大小写**，所以下面两种写法通常都可以执行：

```sql
SELECT * FROM Websites;
```

```sql
select * from Websites;
```

为了提高可读性，建议：

- SQL 关键字使用大写
- 数据库名、表名、字段名根据团队规范书写

例如：

```sql
SELECT name, country
FROM Websites;
```

> 注意：不同操作系统和数据库配置下，数据库名、表名是否区分大小写可能存在差异。

---

## 5. SQL 语句末尾的分号

SQL 通常使用分号 `;` 表示一条语句结束。

```sql
SELECT *
FROM Websites;
```

在命令行、SQL 脚本或一次执行多条 SQL 时，养成写分号的习惯会更稳妥。

---

# 第三章：常见 SQL 命令速查

| SQL 命令          | 作用       |
| ----------------- | ---------- |
| `SELECT`          | 查询数据   |
| `INSERT INTO`     | 插入数据   |
| `UPDATE`          | 更新数据   |
| `DELETE`          | 删除数据   |
| `CREATE DATABASE` | 创建数据库 |
| `ALTER DATABASE`  | 修改数据库 |
| `CREATE TABLE`    | 创建数据表 |
| `ALTER TABLE`     | 修改表结构 |
| `DROP TABLE`      | 删除数据表 |
| `CREATE INDEX`    | 创建索引   |
| `DROP INDEX`      | 删除索引   |

可以简单记成四大数据操作：

> **增：INSERT　删：DELETE　改：UPDATE　查：SELECT**

---

# 第四章：CRUD 基础语法

CRUD 是数据库最常见的四类操作：

- Create：新增
- Read：查询
- Update：修改
- Delete：删除

## 1. SELECT：查询数据

基本语法：

```sql
SELECT column_name
FROM table_name;
```

查询多个字段：

```sql
SELECT column1, column2
FROM table_name;
```

查询所有字段：

```sql
SELECT *
FROM table_name;
```

带条件查询：

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

排序：

```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column_name ASC;
```

其中：

- `ASC`：升序
- `DESC`：降序

---

## 2. INSERT INTO：插入数据

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

例如：

```sql
INSERT INTO Websites (name, url, country)
VALUES ('OpenAI', 'https://openai.com/', 'USA');
```

> 字段和值必须按照对应顺序填写。

---

## 3. UPDATE：更新数据

```sql
UPDATE table_name
SET column_name = value
WHERE condition;
```

例如：

```sql
UPDATE Websites
SET country = 'US'
WHERE id = 1;
```

### ⚠️ 易错点

如果忘记 `WHERE`：

```sql
UPDATE Websites
SET country = 'US';
```

可能会修改表中的**所有记录**。

---

## 4. DELETE：删除数据

```sql
DELETE FROM table_name
WHERE condition;
```

例如：

```sql
DELETE FROM Websites
WHERE id = 5;
```

### ⚠️ 易错点

下面的 SQL：

```sql
DELETE FROM Websites;
```

会删除表中的所有数据，但表结构仍然存在。

---

# 第五章：表结构操作

## 1. CREATE TABLE：创建表

标准结构：

```sql
CREATE TABLE table_name (
    column1 data_type constraint,
    column2 data_type constraint
);
```

例如：

```sql
CREATE TABLE Student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT
);
```

其中：

- `id`、`name`、`age`：字段名
- `INT`、`VARCHAR(50)`：数据类型
- `PRIMARY KEY`、`NOT NULL`：约束

---

## 2. ALTER TABLE：修改表结构

添加字段：

```sql
ALTER TABLE table_name
ADD column_name data_type;
```

例如：

```sql
ALTER TABLE Student
ADD email VARCHAR(100);
```

删除字段：

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

例如：

```sql
ALTER TABLE Student
DROP COLUMN email;
```

---

## 3. DROP TABLE：删除表

```sql
DROP TABLE table_name;
```

### ⚠️ 注意

`DROP TABLE` 会同时删除：

- 表中的数据
- 表本身的结构

因此它与 `DELETE FROM table_name;` 不同。

---

# 第六章：查询结果处理

## 1. WHERE：条件筛选

```sql
SELECT column_name
FROM table_name
WHERE condition;
```

例如：

```sql
SELECT name
FROM Websites
WHERE country = 'CN';
```

---

## 2. ORDER BY：结果排序

```sql
SELECT column_name
FROM table_name
ORDER BY column_name ASC;
```

降序：

```sql
SELECT column_name
FROM table_name
ORDER BY column_name DESC;
```

---

## 3. DISTINCT：去除重复值

```sql
SELECT DISTINCT column_name
FROM table_name;
```

例如：

```sql
SELECT DISTINCT country
FROM Websites;
```

如果 `country` 中存在多个 `CN`，结果中只会保留一个。

---

## 4. HAVING：筛选分组后的结果

`HAVING` 一般与 `GROUP BY` 配合使用。

```sql
SELECT country, COUNT(*) AS total
FROM Websites
GROUP BY country
HAVING COUNT(*) > 1;
```

理解：

- `WHERE`：分组前过滤数据
- `HAVING`：分组后过滤结果

---

# 第七章：JOIN 基础

`JOIN` 用于根据关联条件组合多个表的数据。

基本结构：

```sql
SELECT table1.column_name, table2.column_name
FROM table1
JOIN table2
ON table1.id = table2.id;
```

例如：

```sql
SELECT Student.name, Score.score
FROM Student
JOIN Score
ON Student.id = Score.student_id;
```

---

# 第八章：SELECT 语句重点

## 1. 基本语法

```sql
SELECT column1, column2
FROM table_name;
```

注意多个字段之间应该使用**逗号**分隔，而不是点号。

正确：

```sql
SELECT name, country
FROM Websites;
```

错误：

```sql
SELECT name.country
FROM Websites;
```

---

## 2. 查询所有字段

```sql
SELECT *
FROM table_name;
```

`*` 是通配符，表示选择所有字段。

实际开发中，如果只需要部分字段，通常建议明确写出字段名：

```sql
SELECT id, name
FROM Websites;
```

这样可以：

- 让 SQL 的目的更清晰
- 减少不必要的数据读取
- 避免表结构变化后影响代码

---

# 第九章：易错点整理

## 拼写易错

| 错误写法       | 正确写法       |
| -------------- | -------------- |
| `RDNMS`        | `RDBMS`        |
| `INSEERT INTO` | `INSERT INTO`  |
| `ceate index`  | `CREATE INDEX` |
| `colum`        | `column`       |
| `colum_mane`   | `column_name`  |
| `confition`    | `condition`    |
| `vlue`         | `value`        |
| `data_tpe`     | `data_type`    |
| `contraint`    | `constraint`   |

## 语法易错

### 多字段查询

```sql
SELECT column1, column2
FROM table_name;
```

字段之间使用 `,`。

### UPDATE / DELETE 不要随便省略 WHERE

执行修改或删除前，可以先执行：

```sql
SELECT *
FROM table_name
WHERE condition;
```

确认命中的数据没有问题后，再执行 `UPDATE` 或 `DELETE`。

---

# 第十章：一页速查

```sql
-- 查询
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 ASC;

-- 插入
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);

-- 更新
UPDATE table_name
SET column1 = value1
WHERE condition;

-- 删除
DELETE FROM table_name
WHERE condition;

-- 创建表
CREATE TABLE table_name (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- 修改表
ALTER TABLE table_name
ADD column_name data_type;

-- 删除表
DROP TABLE table_name;

-- 去重
SELECT DISTINCT column_name
FROM table_name;

-- 分组
SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name;

-- 分组后筛选
SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name
HAVING COUNT(*) > 1;

-- 排序
SELECT *
FROM table_name
ORDER BY column_name DESC;
```

---

# 本章自测

1. SQL 的四个基本数据操作分别是什么？
2. `DELETE` 和 `DROP TABLE` 有什么区别？
3. `WHERE` 和 `HAVING` 的区别是什么？
4. `SELECT *` 中的 `*` 表示什么？
5. `UPDATE` 不写 `WHERE` 会发生什么？
6. 查询多个字段时，字段之间使用什么符号分隔？
7. `ASC` 和 `DESC` 分别表示什么？
8. RDBMS 的全称和含义是什么？

---

# 第二章：SQL 条件查询与数据筛选

> 本章目标：掌握 SQL 中最常用的数据筛选方式，能够根据条件从数据表中准确查询目标数据。

---

## 1. WHERE 条件查询

`WHERE` 用于指定查询条件，只返回满足条件的数据。

基本语法：

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

例如：

```sql
SELECT name, country
FROM Websites
WHERE country = 'CN';
```

含义：

> 从 `Websites` 表中查询 `country` 等于 `CN` 的记录。

---

## 2. 常见比较运算符

SQL 中常见的比较运算符：

| 运算符 | 含义     |
| ------ | -------- |
| `=`    | 等于     |
| `<>`   | 不等于   |
| `!=`   | 不等于   |
| `>`    | 大于     |
| `<`    | 小于     |
| `>=`   | 大于等于 |
| `<=`   | 小于等于 |

例如：

```sql
SELECT *
FROM Websites
WHERE alexa < 100;
```

表示查询 Alexa 排名小于 100 的网站。

---

## 3. 字符串条件

字符串通常使用单引号包裹：

```sql
SELECT *
FROM Websites
WHERE country = 'CN';
```

数字一般不需要引号：

```sql
SELECT *
FROM Websites
WHERE alexa = 20;
```

推荐养成习惯：

- 字符串：`'CN'`
- 数字：`20`
- 日期：通常也使用字符串形式，例如 `'2026-08-18'`

---

# 4. AND：同时满足多个条件

`AND` 表示多个条件必须**同时成立**。

```sql
SELECT *
FROM Websites
WHERE country = 'CN'
  AND alexa < 100;
```

含义：

> 查询国家为 CN，并且 Alexa 排名小于 100 的网站。

逻辑理解：

```text
条件 A AND 条件 B
```

只有：

```text
A = true
B = true
```

结果才是 `true`。

---

# 5. OR：满足任意一个条件

`OR` 表示只要其中一个条件成立即可。

```sql
SELECT *
FROM Websites
WHERE country = 'CN'
   OR country = 'USA';
```

含义：

> 查询来自中国或美国的网站。

---

# 6. NOT：条件取反

`NOT` 用于对条件进行取反。

```sql
SELECT *
FROM Websites
WHERE NOT country = 'CN';
```

表示：

> 查询 `country` 不等于 `CN` 的数据。

也可以写成：

```sql
SELECT *
FROM Websites
WHERE country <> 'CN';
```

---

# 7. AND 和 OR 混合使用

当 `AND` 和 `OR` 一起出现时，建议使用括号明确逻辑关系。

例如：

```sql
SELECT *
FROM Websites
WHERE country = 'CN'
  AND (alexa < 100 OR alexa > 1000);
```

括号可以让 SQL 更容易阅读，也能避免逻辑优先级造成错误。

### ⚠️ 易错点

下面两条 SQL 的含义可能不同：

```sql
WHERE country = 'CN'
AND alexa < 100
OR alexa > 1000;
```

```sql
WHERE country = 'CN'
AND (alexa < 100 OR alexa > 1000);
```

复杂条件中建议主动写括号。

---

# 8. IN：匹配多个可能值

当同一个字段需要匹配多个值时，可以使用 `IN`。

普通写法：

```sql
SELECT *
FROM Websites
WHERE country = 'CN'
   OR country = 'USA'
   OR country = 'JP';
```

使用 `IN`：

```sql
SELECT *
FROM Websites
WHERE country IN ('CN', 'USA', 'JP');
```

第二种写法更加简洁。

---

## 8.1 NOT IN

排除多个值：

```sql
SELECT *
FROM Websites
WHERE country NOT IN ('CN', 'USA');
```

表示：

> 查询国家既不是 CN，也不是 USA 的数据。

---

# 9. BETWEEN：范围查询

`BETWEEN` 用于查询某个范围内的数据。

```sql
SELECT *
FROM Websites
WHERE alexa BETWEEN 10 AND 100;
```

表示：

> 查询 Alexa 排名在 10 到 100 之间的数据。

`BETWEEN` 默认包含边界值。

也就是：

```sql
alexa >= 10
AND alexa <= 100
```

---

## 9.1 NOT BETWEEN

查询不在范围内的数据：

```sql
SELECT *
FROM Websites
WHERE alexa NOT BETWEEN 10 AND 100;
```

---

# 10. LIKE：模糊查询

`LIKE` 用于字符串模糊匹配。

常见通配符：

| 通配符 | 作用             |
| ------ | ---------------- |
| `%`    | 匹配任意数量字符 |
| `_`    | 匹配单个字符     |

---

## 10.1 查询以某个字符开头

```sql
SELECT *
FROM Websites
WHERE name LIKE 'G%';
```

表示：

> 查询名称以 `G` 开头的网站。

例如可能匹配：

```text
Google
GitHub
GitLab
```

---

## 10.2 查询以某个字符结尾

```sql
SELECT *
FROM Websites
WHERE name LIKE '%e';
```

表示查询名称以 `e` 结尾的数据。

---

## 10.3 查询包含某个字符串

```sql
SELECT *
FROM Websites
WHERE name LIKE '%oo%';
```

例如：

```text
Google
```

可能被匹配到。

---

## 10.4 下划线 `_`

`_` 只匹配一个字符。

例如：

```sql
SELECT *
FROM Websites
WHERE name LIKE 'G_ogle';
```

可以匹配：

```text
Google
```

因为 `_` 正好对应一个字符。

---

# 11. NOT LIKE

排除符合模糊匹配条件的数据：

```sql
SELECT *
FROM Websites
WHERE name NOT LIKE 'G%';
```

表示：

> 查询名称不是以 G 开头的数据。

---

# 12. NULL

`NULL` 表示：

> 当前字段没有值，或者值未知。

它和以下内容不同：

```text
0
''
'NULL'
```

---

## 12.1 查询 NULL

不能这样写：

```sql
WHERE column_name = NULL;
```

正确写法：

```sql
SELECT *
FROM Websites
WHERE url IS NULL;
```

---

## 12.2 查询非 NULL

```sql
SELECT *
FROM Websites
WHERE url IS NOT NULL;
```

### ⚠️ 易错点

错误：

```sql
WHERE url != NULL;
```

正确：

```sql
WHERE url IS NOT NULL;
```

---

# 13. DISTINCT：去除重复值

如果数据中存在重复值，可以使用 `DISTINCT`。

```sql
SELECT DISTINCT country
FROM Websites;
```

例如原数据：

```text
CN
CN
USA
USA
JP
```

查询结果：

```text
CN
USA
JP
```

---

# 14. ORDER BY：排序

`ORDER BY` 用于对结果进行排序。

升序：

```sql
SELECT *
FROM Websites
ORDER BY alexa ASC;
```

降序：

```sql
SELECT *
FROM Websites
ORDER BY alexa DESC;
```

其中：

- `ASC`：Ascending，升序
- `DESC`：Descending，降序

默认情况下通常是升序。

---

## 14.1 多字段排序

```sql
SELECT *
FROM Websites
ORDER BY country ASC, alexa ASC;
```

含义：

1. 先按照 `country` 排序
2. 如果 `country` 相同，再按照 `alexa` 排序

---

# 15. LIMIT：限制查询数量

MySQL 中可以使用 `LIMIT` 限制返回记录数量。

```sql
SELECT *
FROM Websites
LIMIT 3;
```

表示：

> 只返回前 3 条记录。

---

## 15.1 LIMIT + ORDER BY

查询 Alexa 排名最靠前的 3 个网站：

```sql
SELECT *
FROM Websites
ORDER BY alexa ASC
LIMIT 3;
```

这种组合非常常见。

---

# 16. LIMIT 偏移量

MySQL 可以使用：

```sql
LIMIT offset, count;
```

例如：

```sql
SELECT *
FROM Websites
LIMIT 5, 10;
```

表示：

- 跳过前 5 条
- 再取 10 条数据

也可以写成：

```sql
SELECT *
FROM Websites
LIMIT 10 OFFSET 5;
```

这也是分页查询的基础。

---

# 17. 查询语句的基本执行结构

一个稍完整的 SQL 查询：

```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 ASC
LIMIT 10;
```

可以先按照下面的顺序记忆：

```text
SELECT
FROM
WHERE
ORDER BY
LIMIT
```

例如：

```sql
SELECT name, alexa
FROM Websites
WHERE country = 'CN'
ORDER BY alexa ASC
LIMIT 5;
```

含义：

> 从 Websites 表中查询中国网站，只返回 name 和 alexa 字段，根据 alexa 升序排列，最多返回 5 条。

---

# 18. 综合案例

假设存在学生表：

```sql
Student
```

数据：

|   id | name |  age | city | score |
| ---: | ---- | ---: | ---- | ----: |
|    1 | 小明 |   18 | 北京 |    85 |
|    2 | 小红 |   19 | 上海 |    92 |
|    3 | 小刚 |   20 | 北京 |    78 |
|    4 | 小李 |   18 | 广州 |    96 |
|    5 | 小王 |   21 | 上海 |    88 |

---

## 案例 1：查询北京学生

```sql
SELECT *
FROM Student
WHERE city = '北京';
```

---

## 案例 2：查询成绩大于 90 分的学生

```sql
SELECT name, score
FROM Student
WHERE score > 90;
```

---

## 案例 3：查询年龄在 18～20 岁之间的学生

```sql
SELECT *
FROM Student
WHERE age BETWEEN 18 AND 20;
```

---

## 案例 4：查询来自北京或上海的学生

```sql
SELECT *
FROM Student
WHERE city IN ('北京', '上海');
```

---

## 案例 5：查询姓“小”的学生

```sql
SELECT *
FROM Student
WHERE name LIKE '小%';
```

---

## 案例 6：查询成绩最高的 3 名学生

```sql
SELECT name, score
FROM Student
ORDER BY score DESC
LIMIT 3;
```

---

## 案例 7：北京学生中成绩高于 80 分的人

```sql
SELECT name, score
FROM Student
WHERE city = '北京'
  AND score > 80;
```

---

# 19. 易错点总结

## 错误 1：字符串没有加引号

错误：

```sql
WHERE country = CN;
```

正确：

```sql
WHERE country = 'CN';
```

---

## 错误 2：NULL 使用等号比较

错误：

```sql
WHERE url = NULL;
```

正确：

```sql
WHERE url IS NULL;
```

---

## 错误 3：AND / OR 逻辑混乱

推荐：

```sql
WHERE condition1
AND (condition2 OR condition3);
```

---

## 错误 4：LIKE 通配符位置写错

```sql
LIKE 'A%'
```

表示以 A 开头。

```sql
LIKE '%A'
```

表示以 A 结尾。

```sql
LIKE '%A%'
```

表示包含 A。

---

## 错误 5：ORDER BY 方向记反

```sql
ASC
```

升序，小 → 大。

```sql
DESC
```

降序，大 → 小。

---

# 20. 本章速查表

```sql
-- 等于
SELECT *
FROM table_name
WHERE column = value;

-- 不等于
SELECT *
FROM table_name
WHERE column <> value;

-- AND
SELECT *
FROM table_name
WHERE condition1
  AND condition2;

-- OR
SELECT *
FROM table_name
WHERE condition1
   OR condition2;

-- NOT
SELECT *
FROM table_name
WHERE NOT condition;

-- IN
SELECT *
FROM table_name
WHERE column IN (value1, value2);

-- BETWEEN
SELECT *
FROM table_name
WHERE column BETWEEN value1 AND value2;

-- LIKE：开头
SELECT *
FROM table_name
WHERE column LIKE 'abc%';

-- LIKE：结尾
SELECT *
FROM table_name
WHERE column LIKE '%abc';

-- LIKE：包含
SELECT *
FROM table_name
WHERE column LIKE '%abc%';

-- NULL
SELECT *
FROM table_name
WHERE column IS NULL;

-- 非 NULL
SELECT *
FROM table_name
WHERE column IS NOT NULL;

-- 去重
SELECT DISTINCT column
FROM table_name;

-- 升序
SELECT *
FROM table_name
ORDER BY column ASC;

-- 降序
SELECT *
FROM table_name
ORDER BY column DESC;

-- 限制数量
SELECT *
FROM table_name
LIMIT 10;
```

---

# 21. 本章记忆口诀

条件查询可以先记：

> **WHERE 定条件，AND 要同时，OR 选一个，NOT 来取反。**

模糊查询：

> **前 `%` 查结尾，后 `%` 查开头，两边 `%` 查包含。**

空值：

> **NULL 不用等号，用 IS NULL。**

排序：

> **ASC 小到大，DESC 大到小。**

---

# 22. 本章自测

## 基础题

1. `WHERE` 的作用是什么？
2. `AND` 和 `OR` 有什么区别？
3. `IN` 适合解决什么问题？
4. `BETWEEN 10 AND 20` 是否包含 10 和 20？
5. `LIKE '%abc%'` 表示什么？
6. SQL 中应该如何判断 `NULL`？
7. `ASC` 和 `DESC` 分别表示什么？
8. `LIMIT 5` 表示什么？

---

## SQL 编写题

假设存在表：

```text
Student(id, name, age, city, score)
```

### 题目 1

查询年龄大于 18 岁的学生。

```sql
SELECT *
FROM Student
WHERE age > 18;
```

### 题目 2

查询来自北京或上海的学生。

```sql
SELECT *
FROM Student
WHERE city IN ('北京', '上海');
```

### 题目 3

查询成绩在 80～90 分之间的学生。

```sql
SELECT *
FROM Student
WHERE score BETWEEN 80 AND 90;
```

### 题目 4

查询成绩最高的 5 名学生。

```sql
SELECT *
FROM Student
ORDER BY score DESC
LIMIT 5;
```

### 题目 5

查询名字中包含“明”的学生。

```sql
SELECT *
FROM Student
WHERE name LIKE '%明%';
```

---

# 23. 本章重点

学完本章后，至少应该熟练写出：

```sql
SELECT *
FROM table_name
WHERE condition;
```

以及：

```sql
SELECT column1, column2
FROM table_name
WHERE condition1
  AND condition2
ORDER BY column1 DESC
LIMIT 10;
```

如果这两种结构已经可以不看笔记直接写出来，就说明这一章基本掌握了。

---

