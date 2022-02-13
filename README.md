<p align="center">
  <a href="https://shareby.herokuapp.com">
    <img alt="Shareby" src="./client/src/assets/main_banner.png" width="240"/>
  </a>
  <h3 align="center">
  Write code, notes and share with others!
  </h3>
</p>

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/05c5dd3a23eb42dc9906ab7a8fc22f77)](https://www.codacy.com/gh/rohitbakoliya/shareby/dashboard?utm_source=github.com&utm_medium=referral&utm_content=rohitbakoliya/shareby&utm_campaign=Badge_Grade)
![license](https://img.shields.io/github/license/rohitbakoliya/shareby)

## Features

- **Awesome Reponsive UI**

- **Vs Code like Editor**

  - Dark Mode
  - Options to use custom editor configuration
  - Generate images of codes right from the editor
  - Markdown preview
  - Allow to export codes

- **Text editor**

  - With WYSIWYG Editor options
  - Youtube, Codepen can be embeded
  - Export as HTML or Markdown

- **Generates a unique link to share code/text**

- **Protect shares by adding password**

- **Options to decide when to expire links**

- **Recent shares by others**

## Technical aspects

- Used _cryptographically-secure_ PRGN(CSPRGN) to generate unique urls.
  [benchmark tests](./server/test/uid.benchmark.txt) 
  
  *`3 * 10^5` URIs per second with avg
  collision rate of ~ `0.0001%`*

- Used in memory caching at application level for different HTTP requests

- Introduced HTTP caching for static resources and shared codes

- Used Puppeteer API to generate images using carbon [ref: [carbon.now.sh](https://carbon.now.sh)]

> You can find a helper repository for generating code images over
> [here](https://github.com/rohitbakoliya/carbon-ss-heroku)

## Technologies used

- Node.js
- Express.js
- React.js
- MongoDB
- Ant Design
- Styled Components
- Puppeteer API

## Quick Start

```sh
git clone git@github.com:rohitbakoliya/shareby.git
cd shareby
yarn install
cd client & yarn install
yarn dev
```

**NOTE:** Dont' forget to create `.env` by copying the content of `.env.example` and updating with
valid keys

## Author

Rohit Bakoliya - [rohitbakoliya](https://github.com/rohitbakoliya)
