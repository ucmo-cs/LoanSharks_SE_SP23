# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# how to use Service Function
implement the service controll via this

import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "<DIRECTORY TO IT>/ApiCallerService";

## to use, we can call it like this

ApiCallerService.<get/post/put/delete>('path-to-backend', '{passed:json-object}')

these functions will handle frontend auth.

#you can extend the function with these

`.then(function(response){#CODE GOES HERE});`
this will becalled on backend successfull

`.catch(function(response){#CODE GOES HERE});`
this will be called on failures

`.finally(function(response){#CODE GOES HERE});`
this will be always called 

with these functions, you can read the response (if any) from the backend with the response object passed. this is just an extended javascript 5 fetch() api https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### for backend, you will need to call this function to get user id securely.
you need to include `HttpServletRequest request` in your api request

you will need to call `int id = LoginInterceptor.getUserId(request);` to get the user id from the header, securely. (since this already prechecked in auth controller)

# how to use Specialized modal
use react components, 

import { Modal } from '<DIRECTORY TO IT>/components/Modal';


\<Modal show={#modal show control, functions should close this} closeCall={#function call to close modal} formFinish={#when the save btn is clicked}\>
                # we can add whatever input we want here
\<\/Modal\>