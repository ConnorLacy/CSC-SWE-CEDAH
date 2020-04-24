# CSC-SWE-CEDAH
Software Engineering (CTW) Group Project: Scheduling Engine

# How to run this project locally
***
## Meetup-API
#### Dependencies
- MySQL
- (Optional) MySQL Workbench
- Java
### Setup
- Download & Install MySQL on your machine
  - Mac: 
    <pre><code>$ brew install mysql
    $ mysql.server start
    $ mysqladmin -u root password ‘&lt;YOUR_PASSWORD&gt;’
    </code></pre>
    > &lt;YOUR_PASSWORD&gt; is the password you wish to set for the root user.
    > Leave blank for no password
    <pre><code>
    $ mysql -u root -p
    $ Enter your password
    $ CREATE USER ‘&lt;YOUR_USERNAME&gt;’@‘localhost’ IDENTIFIED BY ‘&lt;YOUR_PASSWORD&gt;’;
    $ GRANT ALL PRIVILEGES ON *.* TO ‘&lt;YOUR_USERNAME&gt;’@‘localhost’;
    </code></pre>
  - Windows: //TODO
  - Ubuntu: Installation Documentation [Here](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)
  - Download: [Here](https://www.mysql.com/downloads/)
- Create a local Database<pre><code>$ mysql -u &lt;YOUR_USERNAME&gt; -p
  $ &lt;YOUR_PASSWORD&gt;
  $ CREATE DATABASE &lt;YOUR_DATABASE&gt;
  </code></pre>
- Add SpringBoot __application.properties__
  - create folder 'resources' in /meetup-api/src/main/
  - create file 'application.properties'
  - Enter the following:<pre><code>server.port = 8080
spring.jpa.hibernate.ddl-auto=create
spring.datasource.url=jdbc:mysql://localhost:3306/&lt;YOUR_DB&gt;?useJDBCCompliantTimezoneShift=true&serverTimezone=UTC
spring.datasource.username=&lt;YOUR_USERNAME&gt;
spring.datasource.password=&lt;YOUR_PASSWORD&gt;</code></pre> 
  - Verify server = 8080
  - Enter your Database Name you created into this url string
    - <pre><code>spring.datasource.url=jdbc:mysql://localhost:3306/&lt;YOUR_DATABASE&gt;?useJDBCCompliantTimezoneShift=true&serverTimezone=UTC</code></pre>
  - Set your username you created during 'CREATE USER...' mysql script
    - <pre><code>spring.datasource.username=&lt;YOUR_USERNAME&gt;</code></pre>
  - Set your password you created during 'IDENTIFIED BY...' mysql script
    - <pre><code>spring.datasource.password=&lt;YOUR_PASSWORD&gt;</code></pre>
- Start API 
  - Navigate to /CSC-SWE-CEDAH/
  - Start API
    - <pre><code> CSC-SWE-CEDAH connor$ mvn appengine:run </code></pre>
***
***
## App (React-Frontend)
#### Dependencies
- yarn

- Install yarn or npm 
  - If you chose npm, you must convert the yarn statements to npm
- Navigate to: /CSC-SWE-CEDAH/app/
- Install yarn dependencies: <pre><code>yarn install</pre></code>
- Run Front end: <pre><code>yarn start</pre></code>

***
