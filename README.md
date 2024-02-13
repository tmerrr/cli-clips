# CLI Clips

The `cli-clips` package provides a handy way to quickly access CLI commands (or any one liner commands) that are tricky to remember.  Commands can be accessed and easily copied straight to the clipboard; just simply paste the chosen command straight back into your terminal window!

There are 2 simple concepts: commands and topics.  A command is a one line snippet you want to remember and easily reference.  Commands are then grouped by topics, so you can organise commands by a topic. For example:

```
topic: npm

commands:
- npm audit --omit=dev
- npm config get loglevel
- npm config set loglevel=silly
```

## Install

Install the package globally to have access to the clips commands in any terminal window:

```sh
npm i -g cli-slips
```

## Usage

Before creating any commands, we need to make sure we have a topic:

```sh
clip topic add
```

Then follow the prompt to enter your desired topic name.  Topics can then be managed using the following commands

```sh
clip topic ls # lists all topics
clip topic edit # select a topic to edit the name
clip topic rm # select a topic to permanently remove, along with all associated commands (use with caution!)
```

Now we can create and manage commands:

```sh
clip cmd add # select a topic to add the command, then follow the prompt to enter the desired text
clip cmd ls # select a topic to view all commands under this topic
clip cmd edit # select the topic where the command is stored, then select the command to change the text
clip cmd rm # select a topic, then select a command to permanently remove
```
