### Installation

Node version 15.5.1 was used to build this project. If you have nvm, you can run `nvm use` in the project to set it.
Add the api key to the env file to REACT_APP_GB_ACCESS_TOKEN

Then run:
`npm install`

`npm start`

### Design
- Simple form that adds new shortened url to list
- Form displays errors when validation for url or slug fails
- Submit is valid once url input is filled
- Save shortened urls are added to list
- You can copy the short links using the copy icon
- You can remove saved links by clicking on the trash icon - would have been better to have a popup to confirm the remove instead of just removing it immediately when button is clicked

### Tests
To run tests, run `npm test -- --watchAll=false`.