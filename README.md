# A job application task

## Live site: [mapon-task.netlify.app](https://mapon-task.netlify.app)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

For styling CSS modules with SASS are used.

---

### Description

Users are able to select a car from the list of available cars and the time
period (days).
Using the Mapon API and the Google Maps API, the map shows the route taken
by the selected car.

### Design

[Figma](https://www.figma.com/file/TBfw8jRll5bId68KXeqXL6/front-end-task?node-id=0%3A2)

### TODO

- Style input fields (~~select~~, datepickers)
- Fix form validation (dateTill > dateFrom, period <= 31 day)
- Display "To" date as "Today" by default and if today's date is selected
- ~~Fix map design (show full width map in the same Card)~~
- ~~On "Generate" button press fetch the data necessary to display the route~~
- ~~Display car's route on the map~~
- Show third stat (time spent on road including stops?)
- Use loading states to display spinners etc.
- Don't make an api call if inputs have not changed
-
- Make the app mobile friendly
- Unit tests
- Improve accessibility (make inputs keyboard tab-able, check color contrasts etc.)

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

However, the app does not contain any tests currently.

### `npm run build`

Builds the app for production to the `build` folder.<br />
