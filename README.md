#Backend Service: Project Management app for DevICT Presentation

Quick RESTful API in Node and Express. Uses MongoDB bakcend.

1)You'll need to install Node.JS (if you don't already have it): https://nodejs.org/en/download/

2)Close the repo to your local machine

3)Open a command prompt in the project's root directory

4)Type: npm install This installs the dependencies as defined in the package.json file.

5)Create a sandbox MongoDB environment: 
+ Navigate to https://mlab.com 
+ Create an account and create a new Mongo deployment 
+ Create a user and password 
+ Copy the URL under the text "To connect using a driver via the standard MongoDB URI (what's this?):" 
+ In the angular2_demo directory, Replace <yourConnectionString> in mongoConnectionString.txt with the url you copied and enter your username and password ("mongodb://<dbuser>:<dbpassword>@ds019746.mlab.com:19746/<example>")

5)Type: npm run dev This launches the application with NodeMon. Any changes will be seen and the app will be resareted.

6)navigate to http://localhost:8080/ You should see the message "Demo Service Works!"
