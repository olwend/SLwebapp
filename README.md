# 💡 SkillsLounge FrontEnd
This repository contains the ReactJS application for the SkillsLounge platform.

To learn React, check out the [React documentation](https://reactjs.org/).

### Links

- [Production Website](https://skillslounge.io)
- [Dev Website](https://dev.skillslounge.io)

# 🧪 Getting started

### Prerequisites
- git
- npm 

### Running Locally

1. Pull this repository from BitBucket using `git clone`
2. `cd` into the project directory
3. Install dependencies using `npm install`
3. In your terminal run `npm run start`
4. Use a browser to navigate to `localhost:3000`

# 👩‍💻 Contibuting

### Running Cypress Tests Locally

1. Follow the above steps for Running Locally the webapp `npm i` and after `npm start`
2. Run and open Cypress tests with different build than localhost 
    `npx cypress open --env BASE_URL=https://dev.skillslounge.io`
   otherwise:
    `npx cypress open` for user interaction with  tests
3. Run all cypress tests `npx cypress run --headed` headed allows cypress to run with browser visible
4. Run a single cypress test file `npx cypress run --headed --spec cypress/integration/user.spec.js` 
5. Run cypress test in background without opening browser `npx cypress run`


### Backlog

The SkillsLounge project has a backlog which is managed and maintained in JIRA. When looking to contibute to the project please assess the items in the backlog which can be found [here](https://foresttechnologies.atlassian.net/jira/software/projects/SL/).

When working on an item please complete the following:

- Assign the task to yourself.
- Make sure you change the status of the task accordingly e.g. in progress, done etc.
- Provide regular updates in the task comments outlining your progress.

### How-to

- Clone the application.
- Create a feature branch from dev using the JIRA issue ID using  `git branch dev <jira-issue-id>`.
- Make changes to the code on this feature branch.
- Open a [pull request](https://bitbucket.org/ecs-group/webapp/pull-requests/new) from your feature branch into `dev`.

### PR Reviews

- PR's will be reviewed by 1 person before they are merged into `dev`.

# 🐛 Bugs

Open a bug issue in [JIRA](https://foresttechnologies.atlassian.net/jira/software/projects/SL/).