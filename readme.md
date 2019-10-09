# Strike
Strike is the client-side software that controls the data flow of sensors. It watches a folder for .txt files, when one is created it parses it into JSON and sends it to the lightning flash server. Carry on reading this readme for instructions for install and testing.

## Installation Instructions
1. Install NodeJS from https://nodejs.org/en/
2. Install git from https://www.git-scm.com
3. Navigate to a chosen directory in the command line, then use git to clone this repo:
    cd ./chosenFolder
    git clone https://jakewwilki@bitbucket.org/jakewwilki/strike.git
    
> Note this is using HTTPS, if you would prefer SSH your details must be added to the repository, contact the author
4. Navigate into the strike directory and install the node modules:
    cd ./strike
    npm install
5. Configurate the hidden .env file with a text editor, a detailed description is provided below
6. Run strike, you can simply type into the console:
    npm start
7. (Optional) Test strike is running by configuring the .env to look at the test folder and drag and drop the test file outside the folder and back in again
8. (Optional) Run strike using PM2 for better error managemet and logging capabilities
    npm install pm2 -g
    pm2 start index.js
> Strike is an imperfect piece of software, written as an MVP there are many bugs that can occur, therefore using PM2 you can configure strike to automatically restart as well as manage error logs to fix the issues in the future.

## .env Configuration
    