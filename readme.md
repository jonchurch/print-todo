## Print TODO

Command line tool for formatting and outputting all TODO comments left in your code.

Currently the search string is `TODO`, taking the entire line after TODO

**`node_modules` and `.git` folders are currently ignored!**

![console output example](https://i.imgur.com/ncmiSx2.png)

### Setup

**In your code, leave TODO comments like this:**
```javascript
//TODO: Remove hardcoded api root before going into prod
var api_root = 'https://example.com'

function halfBaked() {} //TODO: flesh out halfBaked function
```

Install globally from NPM:

`npm i -g print`


### Usage

Run in current working directory without a directory arguement, or specify a folder to search through. Searches through folders recursively under the starting point, ignoring `node_modules` and `.git` folders

```
$ cd project-folder
$ printTodo

$ printTodo ~/Projects/project-folder

```

### Credit
This is based off of a [gist](https://gist.github.com/julianburr/5fa7d4e3e22773f035ee7a62e97f1d59) by [Julian Burr](https://github.com/julianburr). Thank you Julian!


