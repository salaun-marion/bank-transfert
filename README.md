# Bank Transfer application

## Framework versions

- Next.Js : 15
- Redux : 5.0.1
- Jest : 29.2.5
- Next-intl : 3.26.1

## TL;DR

1. `npm i` for installing all the packages inside `src`

Then inside `src` directory :

1. `npm run build` for compiling at the app
2. `npm run start` or`npm run dev` for looking at the app
3. `npm run test` to run unit test
4. `npm run cy:open` to launch the cypress test, select **E2E testing** in the panel configuration, then choose a browser by default, and click on one test

## What to look

Feel free to use Redux DevTools, available as an add-on for [Chrome](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/), inspect the different *state* and *action*.

Additionally, check the console for messages from the stubbed back-end, which will provide insights into the application's behavior.

## Areas for Improvement

- **Mock Back-end**: The mock back-end implementation is incomplete due to time constraints.
- **Redux Smoothness**: I attempted to integrate various implementations (both asynchronous and synchronous logic) for demonstration purposes. As a result, some parts of the code could be cleaner.
- **User Interface**: The UI is quite basic and could benefit from significant improvements, particularly regarding error and alert messages.
- **Testing**: Similar to the UI, testing was also limited by time. I aimed to use Cypress for testing, as Redux documentation recommends testing Redux within the broader context of the application.
