/**
 * Author: Julian Burr <https://github.com/julianburr>
 * License: https://creativecommons.org/publicdomain/zero/1.0/
 * 
 * This script basically just runs through all source files and
 * prints out a list of files and lines where it found the TODO
 * keyword
 *
 * If you want to look for other keywords, just changed the
 * searchRegEx to your needs :)
 *
 * If placed in your projects you can set it up as a script in your
 * package json and run it like this:
 * npm run todos
 */
var fs = require('fs-extra');
// Just needed to make it look nicer :D
var chalk = require('chalk');

var base = null;
var todoCnt = 0;
var searchRegEx = /TODO(.*)/g;

/**
 * Create a function that reads a directory so we can call it recursively
 * beginning from the projects source root
 */
function readDir(dirPath){
  var list = fs.readdirSync(dirPath);
  list.forEach(function(fileName){
	  if (fileName === 'node_modules') {
		  console.log('skipping node modules')
		  return
	  }
    var fullPath = dirPath + '/' + fileName;
    var stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      readDir(fullPath);
    } else if (stats.isFile()) {
      var data = fs.readFileSync(fullPath, "utf-8");
      var matchFile = data.match(searchRegEx);
      if (matchFile && matchFile.length > 0) {
        console.log('\n' + chalk.underline(fullPath + ': '))
        data.split('\n').forEach(function(lineContent, line){
          var matchLine = lineContent.match(searchRegEx);
          if (matchLine && matchLine.length > 0) {
            matchLine.forEach(function(match){
              todoCnt++;
              console.log(chalk.green(' *:' + (line + '      ').substring(0, 6)) + match)
            });
          }
        });
      }
    }
  })
}

readDir('./');
if (todoCnt > 0) {
  console.log(chalk.red(chalk.bold('\n' + todoCnt + ' todos found in code\n')));
} else {
  console.log(chalk.green(chalk.bold('\nGreat, seems you are todo-free\n')));
}
