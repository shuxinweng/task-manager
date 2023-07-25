# task-manager

 Task manager app that creates tasks and organizes tasks.

## Description

This task manager enables users to register and log in to their accounts, facilitating the creation and organization of tasks to suit their requirements. By utilizing the "complete task" button, users can easily mark tasks as finished, which automatically moves them to the completed task array visible on the respective page. Additionally, users have the option to designate certain tasks as daily tasks, appearing on a dedicated page to remind them of these tasks and encouraging daily check-ins for completion.

## Features

- **Home Page**: Displays the current stored recipes in database that are created by users that loged in. Users can save a recipe displayed on home page. The tasks will be displayed in the order of priorties.
- **Login/Register Page**: Register page if not registered, login page after registration. Users must register to perform actions such as create recipes and save recipes.
- **Create Task Page**: A page to create a task by submitting a form of name, descriptions, scheduled time, and priority level.
- **Daily Tasks Page**: This page will display all the tasks that are marked as daily task which can be repeatable tasks such as working out, taking medicine, and reading a book. Users are able to manage the daily task by adding the tasks on home page and delete the daily task tag on both the home page and daily task page.
- **Completed Tasks Page**: This page will display all the tasks that are marked as completed tasks. Users are able to manage the completed task by clicking the complete task button which indicates that the task is completed. The user can also bring back the task to be not completed by using the uncomplete button.

## Built with

- MongoDB
- Express
- React
- Node.js

## Getting Started

**Prerequities**: installed npm, node.js

**Not Deployed Version**
```bash
git clone https://github.com/shuxinweng/task-manager.git
```

```bash
cd client
```

```bash
npm install
```

```bash
npm start
```

open another terminal

```bash
cd server
```

```bash
npm start
```