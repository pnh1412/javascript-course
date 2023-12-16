# Git cmd

```bash
cmd              working space          staging          origin/master
                 function.html      
$ git add .      function.html  
$ git commit -m  "add function.html"    function.html  
$ git push                                              function.html 

```

```bash
# add file

## add all files changed, removed, updated, added ...
$ git add .

## add file
$ git add {name file}

# check status file (add, modified, deleted ...)
$ git status

# commit message
$ git commit -m "{message}"

# push to remote

##  push files to current branch
$ git push 

### push set upstream
$ git push --set-upstream origin {name branch}

# check all branches
$ git branch -all

## check current branch
$ git branch --show-current

# pull latest code from current branch
$ git pull

# create branch from current branch
$ git checkout -b {name branch}

# switch branch
$ git checkout {name branch}

# merge branch
$ git merge {name branch}

# clone project from remote
$ git clone {url project}

```


# Git flow

```bash
# 1. clone project from remote
$ git clone {url project}

# 1.1  check current branch
$ git branch --show-current

# 2. create branch from main branch
$ git checkout -b feature/{name branch}

# 3. add file
$ git add .

# 4. commit message
$ git commit -m "{message}"

# 5. push to remote
$ git push --set-upstream origin feature/{name branch}

# 6. merge branch
$ git checkout main
$ git merge feature/{name branch}

```

## Step to step git flow when implement feature

```bash
# 1. create branch from main branch
- before create branch
$ git pull
$ git checkout -b feature/{name branch}

# 2. check status
$ git status

# 3. add file
$ git add .

# 4. commit message
$ git commit -m "{message}"

# 5. push to remote
$ git push

# 6. create a pull request (PR) to merge feature branch to main branch
1. go to source code on git
2. click "Pull Request" button -> click "New Pull Request" button
3. Comparing changes
  - base: xx  -> ý là nhánh sẽ dc merge
  - compare: xx -> ý là nhánh muốn merge 
4. click "Create pull request" button

# 7. merge branch
- reviewed by other member
- click "Merge pull request" button
```

## Step to step to release to production

```bash
# 1. create branch releas/x.x.x from main branch
- before create branch
$ git pull
$ git checkout -b release/1.0.2

# 2. merge feature branch into release
$ git merge feature/a
$ git merge feature/b

# 3. merge release into main branch
$ git checkout main
$ git merge relase /1.0.2
```

## How to get latest code into your branch

```bash```
# 1. checkout to main branch
$ git checkout main

# 2. pull latest code
$ git pull

# 3. checkout to your branch
$ git checkout feature/{name branch}

# 4. merge main branch to your branch
$ git merge main
```


feature/array-truong
  
- git checkout main
- git pull
- git checkout feature/array-truong
- git merge main