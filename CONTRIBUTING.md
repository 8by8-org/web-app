# Contributing

## Notice

This and all the other documentation are written with the assumption that you have some experience in Linux (using the command-line) and GitHub. If there is any part of this or other documentation that you do not understand, please PM me on slack or raise the question during our weekly Saturday meeting.

## Pull request collaboration method

Instead of the usual "all members get write access to the repo," we will be, instead, doing pull-request collaboration. All members will not have direct write access to the repo, but will, instead, have fork permissions.

The following is a run-through of completing a sample task "[FE0] Create page X":
- Fork repository if you have not already (button is on top right corner)
- Make sure to update your fork to the current version of this repository by running `git pull`
- Look through the Engineering team planner Google Docs and pick a task. Assume you picked "[FE0] Create page X."
- Add your name next to the task so other people know it is taken. Also, go to the trello board and add your name to the task.
- Make changes to any necessary files and commit with a meaningful message in the format "[FE0] \*insert descriptive commit message here\*"
- `git push` to your fork and create a pull request titled "[FE0] Create page X"
- Wait for me to review. I will resolve any merge conflicts if it occurs. If there is something that needs to be fixed, either I will fix it directly or you will be requested to fix it. If everything looks good, I will merge it.
- After I merge it, I will check off the task in the Engineering team planner and move the trello card to done.

## Engineering team planner

Link to the Google Docs planner: [Engineering team planner](https://docs.google.com/document/d/1_WZn11hIymzSd0zRWT1iZlIP8ILUxasaGWlsEAtsG30/edit)

How we structure our tasks will be done by the above document. When you take on a task, add your name next to the task and onto the corresponding trello card. Marking the task as done will be done by me. There are two main categories of tasks. In short:

- FE is for frontend, and it mainly involves working with react
- UE is for user events, and it mainly involves working with firebase

## Setting up the development environment

Have the following installed before you proceed:

- VSCode (or an ide of your choice)
- NodeJS, preferably v12 and above
  - Ensure you can run `node --version` and `npm --version` in a terminal without a problem
- `firebase-cli`
  - install by running `npm install -g firebase-cli`

After you have satisfied the above installation requirements, run `firebase login` and login with the Google account that I added to the firebase project.

## Working on FE tasks

Run `npm start` to start the react development server. Any changes you save will be instantly reflected in your browser. I suggest refreshing the browser if any quirky behavior occurs.

When you are done working with this type of task, commit to your fork repo, and then make a pull request.

## Working on UE tasks

Note: This section assumes you've already ran `cd functions/`

There are two approaches to programming and debugging on serverless functions.

First approach involves directly calling the serverless function. Run `npm run shell` then type in the name of your serverless function. If you typed `exports.yourFunctionName = ...` in `index.js`, you run `yourFunctionName()` in the shell. Caveats to this approach is you will not be able to provide 

Second approach involves separating your code and running it separately as a JS file. For example, if you were writing a serverless functions that checks and then writes to a database, you need to first make sure that function can be executed flawlessly by putting the code in `temp.js` and then running `node temp.js`. An advantage to this method is that you can easily use your IDE's debugging tools to step-through your code.

When you are done working with this type of task, run `npm run deploy` and make a pull request. I will also run `npm run deploy` to make sure the new changes are updated with firebase's serverless functions.
