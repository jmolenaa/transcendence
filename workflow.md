
Work on branches

on branch you can safeuly add packages
when you add a new package and you know you need it
install it, now package.json and package-lock.json are updated
Add the package.json and package-lock.json to git and commit them
Then merg ethem into main.
This way things in main are always up to date as to what packages you need

You cna run `npm ci` to clean install from package-lock.json
and then test from time to time things like npx depcheck
