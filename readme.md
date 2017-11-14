## Print TODO

Simple script for formatting and outputting all TODO comments left in your code.

Currently the search string is `TODO`, taking the entire line after TODO

**`node_modules` and `.git` folders are currently ignored!**

![console output example](https://i.imgur.com/ncmiSx2.png)

### Usage

**In your code, leave TODO comments like this:**
```javascript
//TODO: Remove hardcoded api root before going into prod
var api_root = 'https://example.com'

function halfBaked() {} //TODO: flesh out halfBaked function
```

Install globally from NPM:

`npm i -g print`

To use from the directory you would like to see all Todos in:

```
$ cd project-folder
$ printTodo
```

To see todos starting from a specific folder, or any folder on your system, pass a folderpath as the last argument:

```
printTodo ~/Projects/project-folder
```

### Credit
This is based off of a project by [Julian Burr](https://github.com/julianburr). Thank you Julian!


