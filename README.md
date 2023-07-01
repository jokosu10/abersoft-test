# Coding Test Abersoft

This is coding test, when i apply to [Abersoft Technologies AB](https://www.abersoft.se/)

## Prerequisites

Make sure you install this in your workspace.

```
1. NodeJS LTS Version (recommended v18.16.x)
2. NPM (recommended v9.5.x)
3. Git (recommended v2.34.x)
4. PostgresSQL (recommended v15.3)
```

## Installing

Step by step running this project in environment development.

1. Open your terminal and run this command 
   ```
   git clone git@github.com:jokosu10/abersoft-test.git
   ```
2. Enter your folder, using this command
   ```
   cd abersoft-test
   ```
3. Install dependency using NPM
   ```
   npm install
   ```
4. Copy example env to env, using this command
   ```
   cp .env.example .env
   ```
5. Set variable in .env
6. Running this command for initial database and data
   ```
   npm run db_create_development
   ```
   ```
   npm run migrate:development
   ```
7. import collection via link 
   https://www.postman.com/blue-space-9704/workspace/for-public/collection/1684235-c9d1f4de-3726-4cf1-97cd-1fd63ef0eb5f?action=share&creator=1684235


## Running the apps
Run this apps with command in terminal
```
npm run dev
```

## Running the tests
Step by step running unit testing on this project in environment testing.

1. Running this command for initial database and data
   ```
   npm run db_create_testing
   ```
   ```
   npm run migrate:testing
   ```
2. Run the automated tests for this system with command
   ```
   npm run testing
   ```
## Built With

* [Express JS](https://expressjs.com/) - The web framework
* [NPM](https://www.npmjs.com/) - Dependency Management
