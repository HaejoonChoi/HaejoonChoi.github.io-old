---



layout: post



title: Procedural Programming [C] - Command Line Arguments



date: 2019-09-12 13:20:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag



---

# Command-line Arguments

```bash
$ echo hello world
```

- `$`: command prompt

-  `echo hello world`: command-line arguments; passed to the echo program. 

- Command-line arguments passed to our C program via main

- 2 valid versions of main

  1. `int main (void);`

  2. `int main (int argc, char *argv[]);`

     - `argc`: argument count

     - `args`: argument vector 																
     - `char *`:  think of this as the string type for now

  

  ### In our echo hello world example,

  ```shell
  argc is 3 
  argv[0] is basically "echo"
  argv[1] is "hello"
  argv[2] is "world"
  ```



## Standard Idiom to process command-line arguments

```c
int main (int argc, char *argv[]) {
  int i;
  for (i = 1 /* (or 0) */; i < argc; i++) {
    /* process argv[i] */
  }
}
```



### Example: echo program

```c
#include <stdio.h>
int main(int argc, char *argv[]){
  int i;
  for (i = 1; i < argc; i++) 
    printf("%s ", argv[i]);
	printf("\n");
  return 0;
}
```

- There is an extra space before the newline character;

### FIX 1

```c
#include <stdio.h>
int main(int argc, char *argv[]){
  int i;
  for (i = 1; i < argc; i++) 
    if (i == argc -1)
      printf("%s\n", argv[i]);
  	else 
      printf("%s ");
  return 0;
}
```

### FIX 2 : Using the ternary operator:

```c
#include <stdio.h>
int main(int argc, char *argv[]){
  int i;
  for (i = 1; i < argc; i++) {
    printf((i == argc - 1) ? "%s\n" : "%s ", argv[i]);
  }
  return 0;
}
```

