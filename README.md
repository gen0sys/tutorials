# Eggs Donation Frontend

**Technologies Used**
---------------------

-   TypeScript
-   React
-   Nextjs
-   TanStack Query
-   Tailwind
-   Shadcn
-   GSAP
-   Auth.js

**Overview**
------------

This is an application that allows listeners to interact with their favorite artists at events by giving them donations and one time comments

**Functionality**
-----------------
- Authentication 
- View events
- View artists
- Donation submission
- Comment submission
- Comment reply
- Gift submission
- View past gifts
- View event and artist revenue

### Prerequisites

**Node version 18.x.x+**

### Cloning the repository

```shell
git clone https://github.com/scs-yasu/eggs-donation-frontend
```

### Install packages

```shell
npm i
```

### Setup .env file

Auth.js libraries require you to set an AUTH_SECRET environment variable. This is used to encrypt cookies and tokens. It should be a random string of at least 32 characters. On UNIX based systems you can use this command:

```shell
npm exec auth secret
```
You can use the following openssl command, which should be available on all Linux / Mac OS X systems.
```shell
openssl rand -base64 33
```
.env file

```js
AUTH_SECRET=
API_KEY=
NEXT_PUBLIC_API_KEY=
```


### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command          | description                                                                            |
| :--------------- | :------------------------------------------------------------------------------------- |
| `dev`            | Starts a development instance of the app                                               |
| `build`          | Builds the application for production usage                                            |
| `start`          | Starts a  Next.js production server.                                                   |
| `lint`           | Checks the project for ESLint warnings or errors based on Next.js ESLint configuration |
| `lint:fix`       | Lints the project based on the ESLint configuration                                    |
| `prettier`       | Checks the project for prettier warnings or errors based on the prettier configuration |
| `prettier:write` | Formats the project based on the prettier configuration                                |
| `test`           | Lints the project and starts a production instance of the app                          |
| `type-check`     | Checks the project for type errors                                                     |
## Project Structure

Pages are organized into route groups with private folders to manage route-specific components.\
Route groups are the folders in parenthesis: `(folderName)`.\
Private folders are folders prefxied with an underscore: `\_folderName.`\
The folder name in parentheses is excluded from the route URL. For example, `(platform)/(protected)/dashboard` is represented as `/dashboard in the URL`.\
Private folders are also excluded from routing.

```sh
src
|
+-- api               # Defines API routes that implement server-side logic.
|
+-- app               # Stores application-specific logic, state management, platform-specific settings, and routes.
|   |
|   +-- (platform)    # Manages platform-specific pages and components.
|   |   |
        +-- (auth)      # Manages authentication related pages and functions.
        +-- (protected)     # Manages pages and components that require authentication.
|   |   |   | 
            +-- (pages)     # Contains various functional pages.
|   |   |   |    |     
                 +-- dashboard      # Manages artist and livehouse user dashboard related pages and components.
                 +-- event          # Manages event related pages and components.
                 +-- gift           # Manages livehouse donation function.
                 +-- mypage         # Manages components related to the user's Page.
                 +-- scanner        # Manages livehouse QR scanner functionality.
    +-- actions       # Manages application actions (e.g. user authentication, data fetching).
|
+-- assets            # Assets folder that contain all the static files such as images, fonts, etc.
|
+-- components        # Shared components used across the entire application.
|
+-- lib               # Reusable functions preconfigured for the application.
|
+-- styles            # Manages styling related files.
|
+-- auth.ts           # Handles that authentication for the app.
|
+-- middleware.ts     # Handles protected routes and redirects depending on user role.
|
+-- types.ts          # Shared types used across the application.
|
```