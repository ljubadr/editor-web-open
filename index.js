var express = require('express')
var app     = express()
var exec    = require('child_process').exec;
var config  = require('./config.json');

/*
  vm to host file path mappings - config.json
 */
var pathReplace = config.pathReplace;
var editor      = config.editor;
var terminal    = config.terminal;
var PORT        = config.port;

app.get('/api/file', function(req, res) {
  if ( ! req.query.file ) {
    res.send('Missing file param');
    return;
  }

  var file = req.query.file;
  var line = ! req.query.line ? 1 : req.query.line;

  // We can have multiple mappings, check which one this is
  if ( pathReplace.length > 0 ) {
    pathReplace.forEach(function(element) {
      if ( element.vm && element.host && file.indexOf(element.vm) === 0 ) {
        file = file.replace(element.vm, element.host);
      }
    });
  }

  var runCommand = editor+' '+file+':'+line;

  switch(editor) {
    // vscode docs to open from terminal
    // https://code.visualstudio.com/docs/editor/command-line
    case 'code':
      runCommand = editor+' -g '+file+':'+line;
    break;
    // vi/vim
    // https://www.cyberciti.biz/faq/linux-unix-command-open-file-linenumber-function/
    case 'vi':
    case 'vim':
      runCommand = terminal+' -e "'+editor+' +'+line+' '+file+'"';
    break;
    // atom - I don't use this, but it should be same as sublime
    case 'atom':
    // sublime
    case 'subl':
    default:
      runCommand = editor+' '+file+':'+line;
    break;
  }

  console.log(runCommand);

  exec(runCommand, function(error, stdout, stderr) {
    if (error) {
      res.send("Can't open file "+file);
      return;
    }

    // close tab
    var backURL = req.header('Referer') || '/';

    res.send('<script>window.close();</script>');
  });

});

/*
  When specified as localhost, it will work only on localhost (no external connection)
 */
app.listen(PORT, 'localhost', function () {
  console.log('http://localhost:'+PORT);
});
