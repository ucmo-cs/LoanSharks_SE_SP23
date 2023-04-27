
### npm run start <-- to run the Ui side of the project
### run java complier for backend

### to setup mysql database

for windows, you need to install it from orcale, make sure it is community edition
https://dev.mysql.com/downloads/installer/

for linux, you can run this

sudo apt-get update
sudo apt install mysql-server
sudo apt install mysql-client-core-8.0
sudo apt install mysql #linux may prefer the snap version)

for debian based installs (ubuntu), you can get in via this
sudo mysql --defaults-file=/etc/mysql/debian.cnf

#to set the mysql password, do this and edit username/password. or you can log into mysql shell (Using command above) and create a new user that way.
sudo gedit /etc/mysql/debian.cnf

create user 'spring_admin'@'%' identified by 'change12345678911553'; -- Creates the user


#once you have mysql, ssh into mysql

on windows, after install, you will need to look up mysql command line.

on linux, after install, type `sudo mysql`

in SQL command line, do this
```sql
create database loan_sharks; -- Creates the new database

create user 'spring_admin'@'%' identified by 'change12345678911553'; -- Creates the user

 grant all on loan_sharks.* to 'spring_admin'@'%'; -- Gives all privileges to the new user on the newly created database
```


# how to use Service Function on UI side
implement the service controll via this

import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "<DIRECTORY TO IT>/ApiCallerService";

## to use, we can call it like this

ApiCallerService.<get/post/put/delete>('path-to-backend', '{passed:json-object}')

these functions will handle frontend auth.

#you can extend the function with these

`.then(function(response){#CODE GOES HERE});`
this will becalled on backend successfull

`.catch(function(response){#CODE GOES HERE});`
this will be called on failures

`.finally(function(response){#CODE GOES HERE});`
this will be always called 

with these functions, you can read the response (if any) from the backend with the response object passed. this is just an extended javascript 5 fetch() api https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### for backend, you will need to call this function to get user id securely.
you need to include `HttpServletRequest request` in your api request

you will need to call `int id = LoginInterceptor.getUserId(request);` to get the user id from the header, securely. (since this already prechecked in auth controller)

# how to use Specialized modal
use react components, 

import { Modal } from '<DIRECTORY TO IT>/components/Modal';


\<Modal show={#modal show control, functions should close this} closeCall={#function call to close modal} formFinish={#when the save btn is clicked}\>
                # we can add whatever input we want here
\<\/Modal\>