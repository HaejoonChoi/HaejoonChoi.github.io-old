---



layout: post



title: Procedural Programming [C] - Input / Output (I/O)



date: 2019-09-18 14:16:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag



---

# Input / Output (I/O)

- ###### I / O is performed via streams.

- ###### 3 streams are available when our program starts:

  1. `stdin` (standard input): associated with keyboard input by default
  
  2. `stdout` (standard output): associated with console output by default

  3. `stderr` (standard error): associated with console output by default

     (Type: FILE *)
  
  - **Convention**: Regular messages should be printed to stdout,
  
    ​						error messages should be printed to stderr. 

- We can redirect the I/O to go to different places (I/O redirection)

- The default associations of stdin, stdout and stderr can be changed using I/O redirection

- I/O redirection is provided by the shell and is not specific to C.

  ```shell
  $ ./a <input >output 2>errors
  $: shell prompt
  <: redirects stdin
  >: redirects stdout
  2> redirects dtderr
  input, output, errors: file names
  ```

  

## Output (printf / fprintf / sprintf)

- printf: always prints to stdout
- fprintf: can specify the stream (FILE *) to print to via the first argument (extra one argument: where to print)
- sprintf: prints to a "string" specified by the first argument



- Example

  ```c
  1) 	int m = 1, n = 2;
  		printf("The sum of %d and %d is %d\n", m, n, m+n);
  		// first argument: format string, %d: conversion specification (from bit pattern to text)
  		>> The sum of 1 and 2 is 3
  ```

- output: data item -> text, input: text -> data item (internally)

- In the general case, there can be 5 components in the conversion specification. 

  ```c
  2) 	long double x = 12.345;
  		printf("%-8.2Lf", x);
  		// '-'	: flag (left adjusted)	(optional)
  		// '8'	: minimum field width 	(optional)
  		// '.2'	: precision 						(optional)
  		// 'L'	: modifier 							(optional)
  		// 'f'	: specifier 						(the only maindatory parameter)
  
  		>> 12.35### (# is space)
        
      int n = 12;
  		printf("%05d", n);		
  		>> 00012
  ```

  

### Some common specifications

- `%d`: int in base 10
- `%x, %X`: unsigned int in base 16
- `%o`: unsigned int in base 8
- `%s`: string
- `%ld`: long in base 10
- `%u`: unsigned int in base 10
- `%lu`: unsigned long in base 10
- `%f`: float / double



```c
fprintf int n=12;
	ef. fprintf(stdrr, "%05d", n);

sprintf:
	int n = 12;
	char s[32];
	sprintf(s, "%05d", n); /* s contains "00012" */
```

- Note: the caller n responsible for ensuring that the array of chars is large enough to store the string.



## Input

⭐️ Always check the return value of an input function immediately after calling it ⭐️

### Reading a character

Example.

- ```c
  int c;
  while ((c = getchar()) != EOF)
  	putchar(c);
  ```

  

​	

