# Open files in editor with url

This idea was inspired by IntelliJ IDEA way of opening files with url

When using IntelliJ, when you visit http://localhost:63342/api/file/?file=path-to-file&line=line-number that file will be opened in IntelliJ.
Note that file path needs to be absolute.

I've expanded on this idea to work with sublime, atom, vscode, vim... with a little help of nodeJs

# Install and setup
`git clone git@github.com:ljubadr/editor-web-open.git`
`cd editor-web-open`
`npm install`

## config file
Copy `config.sample.json` into `config.json`
Edit `config.json`

## start server
`npm run start`

# Editor setup
## Ubuntu
### Sublime
Check if you can start Sublime with `subl` from terminal
If yes, in `config.json` change line
"editor": "subl",
If not, use https://stackoverflow.com/a/17647422 to set that up

### Vscode
Check if you can start vscode with `code` from terminal
If yes, in `config.json` change line
"editor": "code",
If not, use https://stackoverflow.com/a/40129135 or https://askubuntu.com/a/742977 to set that up

### Atom
Check if you can start vscode with `atom` from terminal
If yes, in `config.json` change line
"editor": "atom",
I don't use atom, so do a quick search how to open files from terminal with atom

# windows
I don't currently use windows so I can't test this...
You need to have your editor available on the PATH, with setting below.

## sublime, vscode, atom
Make sure that you can open editor from command prompt (cmd)
`subl`, `code`, `atom`
If yes, in `config.json` change line
"editor": "<editor>",
If not, google out how to open files from command prompt with those editors...

# Finnal notes
If you find a bug, have a suggestion, idea how to expand or update, let me know.
Pull request are more than welcome.
