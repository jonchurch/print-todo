#!/usr/bin/env node

/**
 * Adapted by Jon Church from:
 *
 * Author: Julian Burr <https://github.com/julianburr>
 * License: https://creativecommons.org/publicdomain/zero/1.0/
 *
 */
var fs = require('fs-extra');
var program = require('commander');
// Just needed to make it look nicer :D
var chalk = require('chalk');


var todoCnt = 0;
var searchRegEx = /TODO(.*)/g;

program.on('--help', function() {
	console.log('')
	console.log('  Defaults to current working directory without a path as input') 
	console.log('  Recurses through dirs under the starting point')
	console.log('  Excludes node_modules and .git')
	console.log('')
	console.log('   Examples: ')
	console.log('')
	console.log('   $ printTodo ./routes')
	console.log('   $ printTodo')
})
try {

program
	.version('0.1.0')
	.arguments('<dir>')
	.action(dir => {
		// readDir()
		if (fs.existsSync(dir)) {
			program.dir = dir
		} else {
			throw new Error(`Error: ${dir} is not a directory or doesn't exist`)
		}
	})
	.parse(process.argv);

} catch (err) {
	console.log(chalk.red(err.message))
	process.exit(1)
}
var dir = program.dir || './'
readDir(dir)

if (todoCnt > 0) {
	console.log(chalk.red(chalk.bold('\n' + todoCnt + ' todos found in code\n')));
} else {
	console.log(chalk.green(chalk.bold('\nGreat, seems you are todo-free\n')));
}

/**
 * Create a function that reads a directory so we can call it recursively
 * beginning from the projects source root
 */
function readDir(dirPath){
  var list = fs.readdirSync(dirPath);
  list.forEach(function(fileName){
	  // skip node_modules and .git folder
	  if (fileName === 'node_modules') {
		  return
	  } if (fileName === '.git') {
		  return
	  }
	  var relPathRegEx = /^\.\/$/
    var fullPath = dirPath.match(relPathRegEx) ? `./${fileName}` : `${dirPath}/${fileName}`;
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

