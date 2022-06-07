---
title: "Git commands: 8 very commonly used magics"
slug: git-commands-8-very-commonly-used-magics
description: "The article is going to cover the following Git commands that will likely make you more efficient on using Git. git show | git rev-parse | git rebase | git cherry | git cherry-pick | git diff | git stash list | git checkout"
date: 2020-06-01
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Git
extra:
  keywords: git stash list,git stash file,git stash pop
  image: ./images/cover_image.png
---

The article is going to cover the following Git commands that will likely make you more efficient on using Git. Hopefully you'd like to put them into your daily practice.

1. git show
2. git rev-parse
3. git rebase
4. git cherry
5. git cherry-pick
6. git diff
7. git stash
8. git checkout

TLDR;


## 1. Get me the given commit message
Sometimes you need the message of one commit. Of course it' possible to trace back the log with `git log` and navigate by button "d". Now here is an easier way to do it.

```sh
# show the first commit message
$ git show HEAD
# show the message of commit 72ee5fae5a
$ git show 72ee5fae5a
commit ****
Author: ****
Date:   ****
Change version
diff --git a/pom.xml b/pom.xml
index 641928aa..ae19a0e0 100644
--- a/pom.xml
+++ b/pom.xml
@@ -5,7 +5,7 @@
<groupId>com.demo.someApp</groupId>
   <artifactId>module-someApp</artifactId>
-  <version>1.0.0</version>
+  <version>1.0.1-SNAPSHOT</version>^M
   <packaging>jar</packaging>
<name>module-someApp</name>
# show the message of tag v1.0.1
$ git show v1.0.1
commit ****
merge 102n9fsl 9eb22873
Author: ****
Date: ****

    Merge pull request #444 in Project/module-someApp from feature/12345 to master
* commit '9eb228733ee22730344353e2179a1c91532f82a6':
      [App-1][module-someApp] feature 1
      [App-2][module-someApp] feature 2
      [App-3][module-someApp] feature 3
```

## 2. Get me the first commit hash string

You know what to do with a commit hash string, don't you.

```sh
# show the head commit hash
$ git rev-parse HEAD
c5b841f343135e7a5fea7c04ba74e595261ae330
# show the head commit hash of master branch
$ git rev-parse master
6b8e232b323724737720c7fa970864c28355e638
# show the head commit hash of tag v1.0.0
$ git rev-parse v1.0.0
d8110b6b396c394bc0c33c6d76c9ab442df19fd6
# this also works but a bit slower than `git rev-parse`
$ git log -n1 --format=format:"%H" v1.0.0
d8110b6b396c394bc0c33c6d76c9ab442df19fd6
```

## 3. Don't always "merge", "rebase" on your own work branch
As we all know that it is very common to keep our work branch up to date by using `git merge master`. But here is the thing, all your commits history for the current changes will be spaced by the "up-to-date" merges.
I believe the following example might be similar to the working branch you have right now.

```sh
$ git log
commit 72ee5fae5a46c39c859f1ab69216556f2c1af0e9
Author: ****
Date:   ****
added some feature
commit addc8b47f03fb51eabde618e46b4cc4dc722b823
Author: ****
Date:   ****
    Merge pull request #123 in Project/module-someApp from hotfix/123 to master
    * commit 'f0286b65d82c43940945da965f0f72d4c9a90a96':
      [feat] some changes ccc
commit aaefad32bcd081bbb45e9fb19b040asdf3ece0ad
Author: ****
Date:   ****
added some logic
commit bd0c1f0c981bc24e29d15f96e80b0f587c8d3508
Author: ****
Date:   ****
    Merge pull request #100 in Project/module-someApp from       feature/666 to master
    * commit '9865d5c666a3b75aaf298353aeaf0dfefd7d7dc2':
      [feat] some changes bbb
Please do use `rebase` instead of `merge`.
# get updates for your work branch
$ git pull --rebase
# rebase interactively to develop
$ git rebase -i develop
# migrate your work branch to develop
$ git rebase --onto develop
```

## 4. Rearrange some commits from the first few commits
The commit logs can be very dirty during development. It may look like this.

```sh
$ git log
commit 72ee5fae5a46c39c859f1ab69216556f2c1af0e9
Author: ****
Date:   ****
fixed previous commit due to typo
commit addc8b47f03fb51eabde618e46b4cc4dc722b823
Author: ****
Date:   ****
add new feature
commit aaefad32bcd081bbb45e9fb19b040asdf3ece0ad
Author: ****
Date:   ****
fixed the previous commit
commit bd0c1f0c981bc24e29d15f96e80b0f587c8d3508
Author: ****
Date:   ****
changed some logic
```

*Note that it is not recommended to use this command when there are merge commits mixed within. But it is a good custom to constantly keep your work branch away from merging other branches.

Simply squashing them together will result in a clean and neat branch which will be loved by your teammates.

```sh
# squash the commits
$ git rebase -i HEAD~4
pick bd0c1f0c changed some logic
pick aaefad32 fixed the previous commit
pick addc8b47 add new feature
pick 72ee5fae fixed previous commit due to typo
# squash the fixed sth. commits into their previous commits
pick bd0c1f0c changed some logic
squash aaefad32 fixed the previous commit
pick addc8b47 add new feature
squash 72ee5fae fixed previous commit due to typo
# After squashing, redundant commits are gone
$ git log
commit addc8b47f03fb51eabde618e46b4cc4dc722b823
Author: ****
Date:   ****
add new feature
commit bd0c1f0c981bc24e29d15f96e80b0f587c8d3508
Author: ****
Date:   ****
changed some logic
```

## 5. Modify the HEAD commit message
What if we typed something wrong in the commit message? We could reset the commit and redo it with the correct message like the following example.

```sh
$ git add -u && git commit -m "a wrong message xP"
[master f917771] a wrong message xP
 2 files changed, 2 insertions(+), 3 deletions(-)
$ git log -1
commit f91777109c6520e207af099407181d2d0fbaac97 (HEAD -> master)
Author: ****
Date:   ****
a wrong message xP
```

Okay. Let's rollback the local commit, and commit it with the correct message

```sh
$ git reset --soft HEAD~ && git status && git commit -m "the right message :D"
On branch master
Your branch is up to date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
modified:   file1.yml
modified:   file2.java
[master 3f04b5e] the right commit message
 2 files changed, 2 insertions(+), 3 deletions(-)
```

There's another simpler way to avoid all of these steps just by using one command.

```sh
$ git commit --amend -m "the right message :D"
[master 71da00b] the right message :D
 Date: ****
 2 files changed, 2 insertions(+), 3 deletions(-)
# If you want to use an editor for the commit message, do it without the "-m"
$ git commit --amend
the right message
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# ...
[master cb5a929] the right message :D
 Date: ****
 2 files changed, 2 insertions(+), 3 deletions(-)
```

## 6. Compare the two branches and get different commits - $ git cherry

You may want to know the commit differences between the two branches. Here is a very simple way to make it.

```sh
$ git status
On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
# show the difference with develop branch verbosely
$ git cherry -v develop
+ ea90ece5b6283f57e96ad1d0839fc82a86c5c821 some small fix
```

## 7. Pick some commits to another branch

There's one commit from another branch which we need in order to resolve some stupid issue that blocks our development progress. Using "git merge" might bring other changes we might not need into our work branch. So this is when the "cherry-pick" should show up.

```sh
$ git status
On branch feature/111
nothing to commit, working tree clean
$ git log -2
commit 2513e31f732794e54f62edaf3fde9fe5ab129dfe (HEAD -> feature/111)
Author: ****
Date:   ****
Merge pull request #551 from picturepan2/0.5.8
0.5.8
commit 807ae1aff5090226d55b0134c48de06bfb8737f9
Author: ****
Date:   ****
some feature resolves a stupid issue
$ git checkout feature/222
# We need the second commit from branch feature/111
$ git cherry-pick 807ae1aff5090226d55b0134c48de06bfb8737f9
[develop 807ae1a] some feature resolves a stupid issue
 Author: ****
 Date: ****
 2 files changed, 1 insertions(+), 5 deletions(-)
 rewrite file1.txt (1%)
 rewrite file2.java (2%)
# Now you have the target commit as your branch's HEAD commit
$ git log -1
commit 807ae1aff5090226d55b0134c48de06bfb8737f9
Author: ****
Date:   ****
some feature resolves a stupid issue
```

## 8. Show me the changed files
I use this command very often. It will help list up all the changed files with their current status (added or deleted or modified).

```sh
$ git diff --name-status
M       CHANGELOG.md
M       README.md
M       file1.txt
A       file2.java
D       file3.java
```

## 9. Stash the changes before going to a different work branch - $ git stash
We might need this command a lot in order to keep the changes during switching or synchronizing our work branch.

```sh
$ git status
On branch develop
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
    modified:   file1.txt
    deleted:    file2.java
no changes added to commit (use "git add" and/or "git commit -a")


# You need to handle the changes first to switch to another branch
$ git checkout master
error: Your local changes to the following files would be overwritten by checkout:
    modified:   file1.txt
    deleted:    file2.java
Please commit your changes or stash them before you switch branches.
Aborting
$ git stash
Saved working directory and index state WIP on develop: 8b2cec0 fixed typo
```

There are some other useful commands based on "git stash".

```sh
# List up the stashes
$ git stash list
stash@{0}: WIP on develop: 8b2cec0 fixed typo
# Recover from your stashes (the HEAD stash)
$ git stash pop
On branch develop
Your branch is up to date with 'origin/develop'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
    modified:   file1.txt
    deleted:    file2.java
no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (0f14acba974e2c11e33880db9bcc7b4012151e6f)
# Clear all the stashes of the current branch
$ git stash clear
# Peek the changes of the HEAD stash
$ git stash show
file1.txt | 1 +-
file2.java | 1 +-
2 file changed, 2 insertion(+), 2 deletion(-)
```

## 10. Get the file from another branch without switching branch -- $ git checkout develop -- file1.txt
It's quite common that we actually need some changes from a different branch. A stupid way to do this is to switch to the target branch and copy the changes. Then switch back to the work branch and paste your code somewhere. With this very common command "git checkout", you can easily achieve it without switching the branch.

```sh
$ git status
On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
# checkout the file from develop
$ git checkout develop -- file1.txt
# the changes are ready to be committed after "checkout"
$ git status
On branch master
Your branch is up to date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
       modified:   file1.txt
```
