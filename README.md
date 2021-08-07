# Sootds Server

## What's this repo for?

This repo is the back-end server of Sootds' platform where user actions and transactions of buying, selling and renting clothes from other users (registered vendors) will be processed, verified and logged.

## Setup Guide

This README will guide you how to clone this repo and have it running locally on your machine. This assumes that your machine has no development environment setup at all and is operating system agnostic so there are no pre-requisites that you need to install.

### Setting Up The Development Environment

#### VSCode

1. Go to [VSCode](https://code.visualstudio.com/) and download the latest version for your OS.

2. After the installation is complete, that's it! You now have a code editor on your machine!

#### Git

1. Go to [git](https://git-scm.com/downloads) and download the latest version for your OS.

2. After the installation is complete, open a terminal.

    - If you're using Windows, open Powershell or Command Prompt.
    - If you're using OSX, open Terminal.
    - If you're on Linux, open Terminal (sometimes it's called Console or Konsole).

4. Type in the following commands to verify that Git is installed installed:

    - `git --version`

5. If you see `git version x.xx.your-os.x` in the output, you've successfully installed Git!

#### Node and NPM

1. Go to [nodejs.org](https://nodejs.org/) and download the latest LTS version for your OS.

2. Install Node on your machine.

3. After installation is complete, open a terminal.

    - If you're using Windows, open Powershell or Command Prompt.
    - If you're using OSX, open Terminal.
    - If you're on Linux, open Terminal (sometimes it's called Console or Konsole).

4. Type in the following commands to verify that Node and NPM are installed:

    - `node -v`
    - `npm -v`

5. If you see `vXX.XX.XX` in the output, you've successfully installed Node and NPM!

### Cloning the repo

1. Create a personal access token by following this [guide](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token). Give yourself as much access as you can and save the generated token.

2. Make sure that you've deleted any previous folders named `sootds-server` in the current directory and type the following command in your terminal:

    - `git clone https://username:password@github.com/Sootds/sootds-server.git`
    - `username` is your GitHub username
    - `password` is your personal access token generated from step 1

3. This clones the repo locally on your machine. Type the following command in your terminal to navigate in to it:

    - `cd sootds-server`

4. Once you're in the directory, set your GitHub name and email by typing the following commands in your terminal:

    - `git config user.name "firstName lastName"`
    - `git config user.email "firstName.lastName@sootds.com"`

5. Verify that you've set your GitHub name and email in this directory by typing the following commands in your terminal:

    - `git config user.name`
    - `git config user.email`

6. Once you've done these steps, you've successfully cloned this repo!

### Running the client locally

1. Install the required libraries, packages and dependencies by typing this command in your terminal:

    - `npm i`

2. Install the required developer dependencies by typing this command in your terminal:

    - `npm i -D` or `npm i --save-dev`

3. Run the client locally by typing this command in your terminal:

    - `npm run start`

4. After running that command, an output will provide a URL link that you can copy and paste in to your browser. The link should look something like:

    - `Server listening at http://localhost:XXXX`

5. If you see something on your browser when visiting the provided URL link, you've successfully ran the client locally!

6. If you want to stop running the client locally, go to your terminal and press the following key combinations:

    - `Ctrl + C`

### Running the automated testing suite

1. Type the following command in your terminal:

    - `npm run test`

2. If you see something running in your terminal with some ✔ or ❌, then the automated testing suite is working!

### Pushing code changes to the repo

1. Add your name and email in the list below using VSCode and save your changes:

    - AJ Clemente <aj.clemente@sootds.com>
    - *add yours here*
    - *so on*
    - *and so on*

2. Check if Git can see your changes. Go to your terminal and type the following:

    - `git status`

3. It should output `README.md` because you've made changes to this file. Type the following command in your terminal:

    - `git add README.md`

4. You are now ready to commit your changes. Type the following in your terminal:

    - `git commit -m "Add name and email to README.md"`
    - what you type in the quotes, `git commit -m "..."`, is the commit message so say whatever you want to say; note that everyone can see this online and yes, you can use emojis 😂

5. You are now ready to push your commit to the remote repo. Type the following in your terminal:

    - `git push`

6. Visit the repo on GitHub and you should see your commit in the commit history. That's it! You've successfully pushed code changes to the repo!

---

## Glossary

- **repo**: short for **repository**
- **operating-system agnostic**: if your machine is using Windows, OSX or Linux as its operating system, it doesn't matter
- **OS**: operating system
- **LTS**: long term support
- **directory**: another term for a folder or sub-folder on your machine
- **automated testing suite**: a test runner that automatically tests all the tests you've created for a specific piece of code
- **VSCode**: short for **Visual Studio Code**
