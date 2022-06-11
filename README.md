# Diabetes Recipe Nutrition Calculator

A full-stack web app that takes in metrics such as your height and weight, and then gives you how many calories and carbs you should eat per day. Then you can search for recipes with a specific ingredient that match these ranges. Helps solve the difficulty of finding recipes that match a certain carb goal to keep your blood sugar levels stable.

## Features & Usage

-  Authentication system using express-sessions and bcrypt for password hashing/salting.
-  Calculates recommended total calories and carbohydrates per day after user enters their metrics, which get stored in database
-  Allows user to manually update calorie and carbohydrate range without entering metrics
-  Lists recommended calorie and carbohydrate goal per meal
-  After calorie and carbohydrates are entered, allows user to enter any food and a meal type, and then provides recipes that match calorie and carb range for this specific meal

## Demo

![](diagrams/login-page.gif)
![](diagrams/metrics-page.gif)
![](diagrams/recipes.gif)

## Tech Stack

This project was built using custom webpack.config.js and the following technologies:

<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white" />
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
<img src="https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white" />

## Setup/ Installation

-  Clone this repository and navigate to project directory in the terminal
-  Then, run development server:

```bash
npm run server-dev
```

-Then, have webpack serve your static files:

```bash
npm start
```

## Resources

-  [Edamam API](https://www.edamam.com/?gclid=Cj0KCQjwyMiTBhDKARIsAAJ-9VuwvU8TGmj1rEfWavPwrBSU-tzk-fxHe4yFU5UdpV77PwDeHZWFwYMaAukDEALw_wcB)
