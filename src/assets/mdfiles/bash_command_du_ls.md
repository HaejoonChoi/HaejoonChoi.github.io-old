# How to Show the Size of Directories in Bash

When working with the command line, it is often necessary to check the size of directories. In this blog post, we'll explore different ways to do this using the bash shell.

## Using the `du` Command

The `du` (disk usage) command is a useful tool for checking the size of a directory. To show the size of the current directory, use the following command:

```bash
du -sh .
```

The `-s` option tells `du` to display only a summary of the total size, while the `-h` option makes the output human-readable (i.e., in units like KB, MB, GB, etc.). The `.` at the end specifies the current directory. To check the size of a specific directory, replace the `.` with the path to that directory.

However, `du` also shows the size of subdirectories, which may not be desired. To show only the size of the unhidden directories (excluding subdirectories), use the following command:

```bash
du -sh $(ls -d */ | grep -v /)
```

Here, `ls -d */` shows only the unhidden directories (excluding subdirectories), and the `grep -v /` filters out the subdirectories. Finally, `du -sh` displays the size of each directory and the `-sh` options make the output human-readable (i.e., in units like KB, MB, GB, etc.) and summarize the total size.

## Using the `ls` Command

Another option is to use the `ls` command to show the size of each directory. Use the following command:

```bash
ls -lh | awk '/^d/ {print $9, $5}'
```

The `-l` option tells `ls` to display the output in long format, which includes the size of each directory. The `-h` option makes the output human-readable (i.e., in units like KB, MB, GB, etc.).

The `awk` command filters the output to show only the directories (i.e., those with `d` in the first column) and the name and size of each directory.

To show the size of the directories in a specific directory, replace `.` with the path to that directory.

## Conclusion

In this blog post, we've discussed two ways to show the size of directories in bash: using the `du` command and using the `ls` command. Choose the method that works best for your specific needs.
