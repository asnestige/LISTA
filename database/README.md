# Database

## Technologies
- [MySQL](https://dev.mysql.com/doc/)

## Development
Setup X-window forwarding with SSH from console using

```
  $ ssh -X -C username@login.stud.ntnu.no
```
Create a mysql user

```
  $ mysql -useradm create username_user
```
set a password for the user

```
  $ mysql -useradm passwd username_user
```

Create a database

```
  $ mysql -dbadm create username_database
```

add users and grant permissions

```
  $ mysql -dbadm editperm username_database
```

add data to the database

```
  $ mysql -A -h mysql.stud.ntnu.no -u username_user -p username_database
```
this command opens a mysql editor, and you can now add data with mysql-syntax
