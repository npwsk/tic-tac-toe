# Tic-tac-toe

<!--
*** This readme is inspired by https://github.com/othneildrew/Best-README-Template
-->

<!--
*** I'm using reference-style links: https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

This is a web tic-tac-toe game.

Deployed game can be found here: https://npwsk.github.io/tic-tac-toe/tic-tac-toe/

## Table of Contents

- [About the project](#about-the-project)
- [Install](#install)
- [Usage](#usage)
- [Built with](#built-with)

## About the project

![preview screenshot][preview-screenshot]

This is a web tic-tac-toe game with two modes: playing against a human player or a computer.

## Install

This project uses [node][node-url] and [npm][npm-url]

```
git clone https://github.com/npwsk/tic-tac-toe

cd tic-tac-toe

npm ci
```

### Run

```
npm start
```

### Build

```
npm run build
```

## Usage

- The default mode is "computer".
- The last chosen mode is saved to `localStorage`.

### Computer mode

![demo for computer mode][demo-computer-mode]

### Human mode

![demo for human mode][demo-human-mode]

### Changing game mode

1. click on the settings button
2. toggle the first switch button

## Built with

- ![HTML][html]
- [![SASS][sass]][sass-url]
- ![JavaScript][javascript]

### Build tools

- [![Parcel][parcel]][parcel-url]

### Linting and formatting tools

- [![ESLint][eslint]][eslint-url]
- [![StyleLint][stylelint]][stylelint-url]
- [![Prettier][prettier]][prettier-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[standard-readme]: https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square
[standard-readme-url]: https://github.com/RichardLitt/standard-readme
[preview-screenshot]: docs/images/preview.png
[demo-human-mode]: docs/images/human-mode.gif
[demo-computer-mode]: docs/images/computer-mode.gif
[node-url]: http://nodejs.org/
[npm-url]: https://npmjs.com/
[html]: https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white
[sass]: https://img.shields.io/badge/SASS-CC6699?style=flat-square&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com/
[javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black
[parcel]: https://img.shields.io/badge/Parcel-black?style=flat-square
[parcel-url]: https://parceljs.org/
[eslint]: https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white
[eslint-url]: https://eslint.org/
[stylelint]: https://img.shields.io/badge/StyleLint-263238?style=flat-square&logo=stylelint&logoColor=white
[stylelint-url]: https://stylelint.io/
[prettier]: https://img.shields.io/badge/Prettier-1A2B34?style=flat-square&logo=prettier&logoColor=F7B93E
[prettier-url]: https://prettier.io/
