---
title: "SQL"
tags: ["SQL"]
date: "4/18/26"
category: "SQL"
---

Writing SQL Queries

Structured Query Language is a language used to query, manipulate, and transform data from a **relational database**. 
	Relational databases are a collection of related two dimensional tables. For instance, the DMV might have tables containing information such as all the known vehicles,  registered drivers, the types of driving licenses, and even driving violations--each table with its own information, of course.
Through SQL, we can answer questions from this data.

Tbh if you know Pandas, SQL should be a breeze.

# Commands
### SELECT 
also known as queries. Gets you columns in a table

Syntax:
```
SELECT column, another_column, ... FROM <name of the table>
```
to quickly get all the columns, use `*` in replacement for column names.

### WHERE ... AND/OR ...
to add further constraints in our search. 

Syntax:
```
SELECT column, another_column, ... 
FROM <name of the table>
WHERE condition
	AND/OR  another_condition
	AND/OR ...;
```

##### Number Conditions

| Operator            |                    Condition                     |                       Example |
| :------------------ | :----------------------------------------------: | ----------------------------: |
| =, !=, <, >, <=, >= |           Standard numerical operators           |                 col_name != 4 |
| BETWEEN … AND …     | Number is within range of two values (inclusive) | col_name BETWEEN 1.5 AND 10.5 |
| NOT BETWEEN … AND … |                                                  | col_name NOT BETWEEN 1 AND 10 |
| IN (...)            |             Number exists in a list              |         col_name IN (2, 4, 6) |
| NOT IN (...)        |          Number doesn't exist in a list          |     col_name NOT IN (1, 3, 5) |
Note that that is one entire query (only one semicolon at the end of it).
##### String Conditions
For text data, we care about case sensitivity

| Operator   |                                               Condition                                               |                                                                 Example |
| :--------- | :---------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------: |
| =          |                  Case sensitive exact string comparison (_notice the single equals_)                  |                                                        col_name = "abc" |
| != or <>   |                           Case sensitive exact string inequality comparison                           |                                                      col_name != "abcd" |
| LIKE       |                               Case insensitive exact string comparison                                |                                                    col_name LIKE "ABCD" |
| NOT LIKE   |                          Case insensitive exact string inequality comparison                          |                                                col_name NOT LIKE "ABCD" |
| %          | Used anywhere in a string to match a sequence of zero or more characters (only with LIKE or NOT LIKE) | col_name LIKE "%AT%"  <br>(matches "AT", "ATTIC", "CAT" or even "BATS") |
| _          |          Used anywhere in a string to match a single character (only with LIKE or NOT LIKE)           |                  col_name LIKE "AN_"  <br>(matches "AND", but not "AN") |
| IN (…)     |                                        String exists in a list                                        |                                             col_name IN ("A", "B", "C") |
| NOT IN (…) |                                    String does not exist in a list                                    |                                         col_name NOT IN ("A", "B", "C") |
Examples:
```
--Find all the Toy Story movies
SELECT * FROM movies WHERE title LIKE "%TOY STORY%"

--Find all the WALL-* movies
SELECT * FROM movies WHERE title LIKE "WALL-_"
```

### DISTINCT, ORDER BY, LIMIT and OFFSET
to filter and sort further.

`DISTINCT` discards duplicate rows:
	`SELECT DISTINCT column, another_column, … FROM mytable WHERE condition(s);`

`ORDER BY` sorts results in `ASC/DESC` order.
	`SELECT column, another_column, … FROM mytable WHERE condition(s) ORDER BY column ASC/DESC;`

`LIMIT` tells us how many rows to return and `OFFSET` tells us where to start counting
	`SELECT column, another_column, … FROM mytable WHERE condition(s) ORDER BY column ASC/DESC LIMIT num_limit OFFSET num_offset;`

```
--List all directors of Pixar movies (alphabetically), without duplicates
SELECT DISTINCT director FROM movies ORDER BY director ASC

--List the first five Pixar movies sorted alphabetically
SELECT * FROM movies 
ORDER BY title 
LIMIT 5 OFFSET 0
```

To summarize, a query looks something like this:
```
SELECT column, another_column, … 
FROM mytable 
WHERE _condition(s)_ 
ORDER BY column ASC/DESC 
LIMIT num_limit OFFSET num_offset;
```

### JOIN
Up until now, we only query a single table. `JOIN` combines row data across two separate tables based `ON` a key
##### INNER JOINs
matches rows from tables with same key, defined by `ON` constraint. Only contains data that belongs in both of the tables.

```
SELECT column, another_table_column, … FROM mytable 
INNER JOIN another_table 
	ON mytable.id = another_table.id
```
...  the other clauses we learned previously are then applied

```
---List all the movies by their ratings in descending order
SELECT * FROM movies
INNER JOIN boxoffice
    ON movies.id = boxoffice.movie_id
ORDER BY rating DESC
```
##### OUTER JOINs
`LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`
```
SELECT column, another_table_column, … FROM mytable 
INNER/LEFT/RIGHT/FULL JOIN another_table 
	ON mytable.id = another_table.id
```
When joining another table, LEFT JOIN includes rows from A regardless of matches found in B. RIGHT JOIN keeps rows from another table. FULL JOIN keeps both tables.

```
--Find the list of all buildings that have employees
SELECT DISTINCT building FROM employees
LEFT JOIN buildings
    ON buildings.building_name = employees.building

--List all buildings and the distinct employee roles in each building (including empty buildings)
SELECT DISTINCT building FROM employees
LEFT JOIN buildings
    ON buildings.building_name = employees.building
```


##### NULL values
are not good, we don't like. Do `WHERE column IS/IS NOT NULL` to filter out.  
```
--Find the names of the buildings that hold no employees
SELECT * FROM buildings
LEFT JOIN employees
    ON building_name = building
WHERE building IS NULL
```


##### Expressions
you can create new columns from existing columns.
```
--Movie title and their combined sales in millions of dollars and named in column called Gross
SELECT title, (domestic_sales+international_sales)/1000000 AS gross FROM movies
INNER JOIN boxoffice
    ON id = movie_id

--List all movies that were released on even number years
SELECT * FROM movies
WHERE year%2 = 0
```

### Aggregates
runs on the whole set of rows and returns a single result. Gives us some metrics

| Function                     |                                                                                           Description                                                                                           |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| COUNT(\*) or COUNT(*column*) | A common function used to counts the number of rows in the group if no column name is specified. Otherwise, count the number of rows in the group with non-NULL values in the specified column. |
| MIN(col)/MAX(col)            |                                                  Finds the smallest/largest numerical value in the specified column for all rows in the group.                                                  |
| AVG(col)                     |                                                      Finds the average numerical value in the specified column for all rows in the group.                                                       |
| SUM(col)                     |                                                    Finds the sum of all numerical values in the specified column for the rows in the group.                                                     |
`GROUP BY` for whichever column you select, it will tell you the aggregate data for each of those unique groups. If you don't include this, it will just tell you the aggregate data for the entirety of the table
```
--Find the longest time that an employee has been at the studio
SELECT MAX(years_employed) from employees --gives us single column of MAX

--For each role, find the average number of years employed by employees in that role
SELECT role, AVG(years_employed) from employees 
GROUP BY role --gives us each role's avg years

--Find the total number of employee years worked in each building
SELECT building, SUM(years_employed) from employees 
GROUP BY building
```

`HAVING` is the same as `WHERE` if you already used WHERE to filter your data before grouping them.

To summarize, a aggregate query would look something like this:
```
SELECT group_by_column, AGG_FUNC(<column_expression>) AS aggregate_result_alias, … FROM mytable 
WHERE condition 
GROUP BY column 
HAVING <group_condition>;
```

```
--Find the number of Artists in the studio
SELECT role, COUNT(*) as Number_of_artists
FROM employees
WHERE role = "Artist";

--Find the total number of years employed by all Engineers
SELECT role, SUM(years_employed) 
FROM employees 
WHERE role = "Engineer" 
GROUP BY role; (my way)

or

SELECT role, SUM(years_employed) FROM employees
GROUP BY role
HAVING role = "Engineer";
```


##### Order of execution
Consider the complete query:
```
SELECT DISTINCT column, AGG_FUNC(<column_or_expression>), … 
FROM mytable 
	JOIN another_table 
		ON mytable.column = another_table.column 
	WHERE constraint_expression
	GROUP BY column 
	HAVING constraint_expression
	ORDER BY column ASC/DESC 
	LIMIT count OFFSET COUNT;
```

1. FROM and JOINs are executed first. Makes sense
2. WHERE is next. Constraints applied to rows before any more filtering.
3. GROUP BY the remaining rows.
4. HAVING are applied to the grouped rows.
5. SELECT. We write this first, but its computed until late after. The expressions are also finally computed.
6. DISTINCT, duplicated are discarded
7. ORDER BY
8. LIMIT/OFFSET

the **`WHERE`** clause is almost always more efficient than `HAVING` because it controls _how much data gets into the group_ in the first place. (Pre-filter)

```
---Find the number of movies each director has directed
SELECT director, COUNT(title) FROM movies
GROUP BY director

--Find the total domestic and international sales that can be attributed to each director

```