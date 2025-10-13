---
title: Linux Basics - The Core OS for Cloud and DevOps
description: A practical guide to essential Linux commands, file permissions, and system navigation—the fundamental skills needed to manage servers and containers.
---

# 3. Linux Basics: The Core OS for Cloud and DevOps

If cloud computing is the stadium, **Linux** is the turf. Nearly every major cloud provider (Azure, AWS, GCP) runs their services on Linux under the hood, and virtually all containers and Kubernetes nodes are based on a Linux distribution. As a DevOps engineer, you'll be spending a lot of time in the **Terminal**, so getting comfortable with Bash is a non-negotiable skill.

It's all about control. Unlike a desktop OS, learning Linux gives you the tools to efficiently manage infrastructure, deploy code, and perform crucial diagnostics—skills that are necessary whether you're debugging your **Ona Vision** container or managing a high-traffic server.

## 🐧 The Terminal: Your New Home

The Terminal (or Command Line Interface, CLI) is how you interact with a Linux machine. Forget GUIs; everything is done with text commands, which is much faster and easier to automate.

### Essential Navigation Commands

| Command | Purpose | Example |
| :--- | :--- | :--- |
| `pwd` | **P**rint **W**orking **D**irectory. Shows your current location. | `/home/josiah/projects` |
| `ls` | **L**i**s**t directory contents. | `ls -l` (for long format, showing details) |
| `cd` | **C**hange **D**irectory. | `cd ..` (move up one directory) or `cd /etc/` |
| `mkdir` | **M**a**k**e **Dir**ectory. | `mkdir my-new-project` |
| `touch` | Creates an empty file. | `touch README.md` |
| `rm` | **R**e**m**ove files or directories. **⚠️ Be careful with this one!** | `rm my-file.txt` or `rm -rf my-dir` (force recursive delete) |
| `man` | Access the **man**ual pages for any command. | `man ls` (teaches you everything about `ls`) |

### Viewing and Manipulating Files

When deploying an app, you often need to check log files or configuration files.

| Command | Purpose | Example |
| :--- | :--- | :--- |
| `cat` | Concatenate and display the entire file content. | `cat /etc/os-release` |
| `less` / `more` | View file content one page/screen at a time (better for large log files). | `less /var/log/syslog` |
| `grep` | Search (filter) text using patterns inside files. **Indispensable for debugging.** | `grep ERROR deployment.log` (finds all lines with "ERROR") |
| `chmod` | **Ch**ange file **mod**e (permissions). | `chmod +x run.sh` (makes a script executable) |
| `chown` | **Ch**ange file **own**er. | `chown www-data:www-data index.html` |

---

## 🔒 Understanding File Permissions

File permissions are critical for security and system stability. Linux uses a simple system to define who can do what to a file or directory.

Permissions are read in sets of three: **Owner**, **Group**, and **Others** (the world).

| Letter | Permission | Octal Value |
| :--- | :--- | :--- |
| **r** | **R**ead | 4 |
| **w** | **W**rite | 2 |
| **x** | E**x**ecute | 1 |

When you run `ls -l`, you see output like this: `-rw-r--r--`.

| Position | Meaning | Permissions |
| :--- | :--- | :--- |
| **1** | File Type (`-` for file, `d` for directory) | - |
| **2-4** | Owner Permissions | `rw-` (Read, Write, No Execute) $\rightarrow$ $4+2+0 = 6$ |
| **5-7** | Group Permissions | `r--` (Read Only) $\rightarrow$ $4+0+0 = 4$ |
| **8-10** | Other Permissions | `r--` (Read Only) $\rightarrow$ $4+0+0 = 4$ |

The file permission is often referred to by its octal value: **`644`**.

### Practical Example: Making a Script Executable

If you write a deployment script (`deploy.sh`), you must give it the **execute** permission (`x`) for the current user:

```bash
# Add execute permission for the owner
$ chmod u+x deploy.sh

# The octal equivalent (rwx for owner, r- for group, r- for others)
$ chmod 744 deploy.sh
