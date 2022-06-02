---
title: Learning tmux as a beginner
slug: learning-tmux-as-a-beginner
description: A beginner notes for the useful software that exists in our terminals
date: 2022-04-30
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Shell
    - Tools
extra:
  keywords: learning tmux, some tmux study, tmux beginner
  image: ./images/cover_image.png
---

Nowadays, Tmux has become into the everyday tool in my workdays. I always wanted to summarize the Tmux usage from long ago when I began to use it.
So this article is pretty much what I have started with as a Tmux beginner.

## What consists of Tmux?

- Session
- Window
- Pane

## What is a Tmux session?

The "dialog" that's been kept by Tmux for running tasks which can be resumed later disconnection.

### 1. Create a session

Creating a session in Tmux is very semantic:

```sh
$ tmux new -s <session_name>

# e.g.
$ tmux new -s helloworld
$ tmux new -s great
```

### 2. Kill a session

The **`-t`** flag here means "target". Put the target session name after it to delete the session from Tmux

```sh
$ tmux kill-session -t <session_name>

# e.g.
$ tmux kill-session -t helloworld
```

### 3. Kill all of the sessions

The command `kill-server` seems a bit confusing. But Tmux does have a server running behind the scenes to be able to keep the located processes when the session is detached. So, killing a Tmux server means deleting all saved sessions.

```sh
$ tmux kill-server
```

### 4. Switch between sessions

It's useful when we are in a particular session but want to transfer to another session we used.

```sh
$ tmux switch -t <session_name>

# e.g.
$ tmux switch -t great
```

### 5. Rename session

Edit the session name after we created it.

```sh
$ tmux switch -t <from> <to>

# e.g.
$ tmux rename -t great hi
```

## What is a Tmux Window?

The "child" under a Tmux Session. A session can have multiple windows ("children") to switch from.

To manipulate the window, we need to use the "Prefix" shortcuts. By default, Tmux uses `Ctrl+b`.

### 1. Create a new window

This will create a new window and leave a number of the window we created to the Tmux bottom status line.

```sh
Ctrl + b + c
```

`0:zsh` is the first window, `1:zsh` is the second window.

### 2. Switch between windows

We could choose the target window by specifying its number.

```sh
Ctrl + b + <window_number>

# e.g.
Ctrl + b + 2
```

### 3. Search the windows

We could look for the windows we created. The Tmux will go search the output / printout in the terminal.

```sh
Ctrl + b + f
```

### 4. List all of the windows in this session

The result screen is actually the same to search but with all of the windows we have.

```sh
Ctrl + b + w
```

### 5. Rename current window

By default, the window we created with `Ctrl+b+c` will have a name like "0:zsh" "1:shell". Sometimes we need special names to distinguish those windows (like naming the sessions) in a rather semantic way.

```sh
Ctrl + b + ,
```

### 6. Close current window

```sh
Ctrl + b + &
```

## What is a Tmux Pane?

Instead of Tmux windows to switch back and forth, a Tmux pane can help split the window into certain smaller blocks within the same screen. So that we could retain the information on the same screen.

### 1. Split pane vertically / horizontally

Tmux makes it very easy to understand about pane splitting. The symbol `%` and `"` vividly explains how we are gonna split our screen.

```sh
# vertical split
Ctrl + b + "

# horizontal split
Ctrl + b + %
```

### 2. Kill a pane

Usually when we run nothing in the terminal, we could close it immediately with `Ctrl+d` for most of the terminals. However if we are under some program like `Vim` or `SSH` and still hope to kill the pane forcefully, this will come into help.

```sh
Ctrl + b + x
```

### 3. Switch between panes

Jump around the panes.

```sh
Ctrl + b + o
```

We also have numbers for each panes. Display the number of each pane and type the number to select the target pane.

```sh
# display pane number
Ctrl + b + q

# e.g.
Ctrl + b + q  & 1
```

### 4. Move the current pane to a new window

Sometimes the pane we created is maybe too small to showcase everything in that terminal. We might need to consider moving the pane to a new window.

```sh
Ctrl + b + !
```

## Summary

I personally think Tmux is a very good looking and helpful tool to allow everyone to control their terminals with only keyboards. Nowadays terminal apps like "iTerm" "cmder" all provided features similar to Tmux's "window" and "pane". Sometimes, these features are even more convenient than Tmux.

Tmux is really a powerful tool. But it needs time for us to digest the shortcut keys which is seemingly a "learning" curve to us all so that we could finally master using this powerful tool.

