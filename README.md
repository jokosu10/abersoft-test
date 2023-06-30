# Coding Test Abersoft

## Prerequisites

Make sure you install this in your workspace.

```
1. NodeJS LTS Version (recommended v10.15.x)
2. NPM (recommended v18.16.x)
3. Git (recommended v2.25.x)
4. PostgresSQL
```

## Installing

Step by step for running this project.

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
7. import collection via link https://www.postman.com/blue-space-9704/workspace/for-public/collection/1684235-c9d1f4de-3726-4cf1-97cd-1fd63ef0eb5f?action=share&creator=1684235


## Running the apps
Run this apps with command in terminal
```
npm run dev
```

## Running the tests

Run the automated tests for this system with command
```
npm run test
```

## Built With

* [Express JS](https://expressjs.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management

## License

This project is licensed under the MIT License.
