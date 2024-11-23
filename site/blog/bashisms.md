<post-metadata>
  <post-title>Bashisms</post-title>
  <post-date>2024-11-23</post-date>
  <post-tags>bash</post-tags>
</post-metadata>

Some random details on setting up modern `bash` on macOS.

## Setting up Bash on macOS
1. Install a modern version of `bash` with `brew`
```
$ brew install bash
```
2. Add `bash` binary to `/etc/shells`
```
$ echo "$(brew --prefix)/bin/bash" | sudo tee -a /etc/shells
```
3. Change shell
```
$ chsh -s "$(brew --prefix)/bin/bash"
```
4. Update hostname
```
sudo scutil --set HostName "macbook"
```

## Aliases, Functions, Etc.
Some aliases I use regularly

1. write - switch to blog directory, build html, and launch simple python web server
```
alias write='cd ./wcameronbowen.com && soupault && python3 -m http.server --directory build'
```
2. awsl - login to awscli with iam identity center
```
awsl () {
	aws sso login --profile $1
	export AWS_PROFILE=$1
}
```
3. vim - I got used to using `vim` and then switched to `neovim`
```
alias vim='nvim'
```
4. random hex - handy random hex strings
```
alias hexr='hexdump -vn4 -e'\''4/4 "%08X" 1 "\n"'\'' /dev/urandom'
```
5. short dig - dig, but shorter
```
alias digs='dig +short'
```
6. go back - go back to the previous directory
```
alias b='cd -'
```
7. pyvenv - switch to python virtual environment or create one
```
pyvenv () {
    if [ -d ./venv ]; then	
	    source venv/bin/activate
	elif [ -d ./env ]; then
	    source env/bin/activate
	else
	    python3 -m venv venv && source venv/bin/activate
	fi
}
```
8. de - shorter than typing `deactivate` when in python virtual environment
```
alias de='deactivate'
```
9. myip - get my public ip
```
alias myip='curl -4s ipconfig.io'
```
10. bash prompt - `time | hostname | working wirectory | git branch | new line`
```
export PS1='$(exitcode)\e[1m\A \e[0m\h\e[0m [\w]$(__git_ps1 " %s")\e[0m\n\$ '
```

Hope these help you too!
