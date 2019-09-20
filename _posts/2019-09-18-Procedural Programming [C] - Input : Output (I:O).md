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

### Reading a character (getchars)

Example.

- ```c
  int c;
  while ((c = getchar()) != EOF) // EOF: End-of-file
  	putchar(c);
  ```

- `getchar()` needs a character from `stdin` and returns it.

- However, it may fail (ef. there is no more input); in this case, it returns a value denoted by EOF.

- EOF must have a value different from all possible characters. Hence c is an `int`.

- Technically, `getchar()` returns an `unsigned char` cast as an `int`.

  Note: the `char` type in C can be `signed` or `unsigned`. 

  ##### Assuming an 8-bit char type, 

  - -128 ~ 127 `signed char`
  - 0 ~ 255 `unsigned char`

- `((c = getchar()) != EOF)` 

  - brackets for `c = getchar()` are necessary 

  - `c = getchar() != EOF` is equivalent to `c = (getchar() != EOF)`

  - `!=` has higher precednece than `=`

    

### What is end-of-file?	

- It is a **condition**. For a physical file, it becomes true when we try to **read past the last byte in the file**. 

- For Keyboard input, we can generate the end-of-file condition **by pressing certain keys. (Ctl-d)**

- redirection of input `(<)`

  `./a.out < input`

- Keyboard input is line-buffered: our program does not get the input until the user presses the 'Enter' key.



ex. 

```c
#include <stdio.h>
int main(void) {
  int c;
  while ((cxzxcvzxczxvzv))
}
```



### Standard idiom to process stdin character by character

```c
int c;
while ((c = getchar()) != EOF) 
	/* process C */
```

**Examples**

1. Displaying a file in all uppercase

   ```c
   while((c = getchar()) != EOF) 
   	putchar(toupper(c));
   ```

   

2. Counting the number of line in a file

   Basically, no. of lines = no. of newline characters

   ```c
   size_t nlines = 0;
   while((c = getchar()) != EOF) 
   	if(c == '\n')
       ++nlines;
   	/* print nlines */
   ```

   - **Minor problem**: the last line in the file may not have a newline character.
   - **Solution**: Don't count the end of a line. Count the beginning of a line



## Reading a line (fgets)

​			`fgets(buffer, bufsize, stream)`

- Keeps reading characters from `stream` & storing them into `buffer` until either
  1. End-of-file becomes true, or
  2. `bufsize - 1` characters have been stored into `buffer`, or
  3. a newline character has been stored into `buffer`.
- In all 3 cases, `fgets` appends a null character.
- `fgets` returns the null pointer on end-of-file with no charaters read. 
- The null pointer can be denoted by `NULL` or simply by `0`.



**Example**

```c
char s[10];
// s['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
fgets(s, 10, stdin);
>> user input: hello
// s['h', 'e', 'l', 'l', 'o', '\n', '\0', '?', '?', '?'];
fgets(s, 10, stdin);
>> user input: hi
// s['h', 'i', '\n', '\0', 'o', '\n', '\0', '?', '?', '?'];
fgets(s, 10, stdin);
>> user input: hello world\n
// s['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', '\0'];
fgets(s, 10, stdin);
// (does not wait for user input)
// s['l', 'd', '\n', '\0', 'o', ' ', 'w', 'o', 'r', '\0'];
```

- **Lesson**: use a large buffer !! 

```c
char line[1024];
if(fgets(line, 1024, stdin)/* != 0 */) // drop out double negative
  	/* process line */	
```

 

## Standard idiom to process stdin line by line

```c
#define LINESIZE 24
char line[LINESIZE];
while (fgets(line, LINESIZE,stdin)) /* as long as we can read a line */
  /* process line */
```



## Reading a data item (scanf / fscanf / sscanf)

- `scanf`: reads from stdin
- `fscanf`: reads from a file that we can specify via the 1st argument
- `sscanf`: reads from a string that we specify via the 1st argument



**Examples**

```c
int n;
scanf("%d", &n); // &: address-of operator
// compare with: printf("%d", n);
// for output, using the copy of a variable is okay 
// for input, the original address of n should be used, which is &n
```

- Need to check return value of `scanf`!!



```c
int m, n;
scanf("%d%d", &m, &n);
// scanf / fscanf / sscanf return the number of assignments.
// Never use scanf for interactive user input!!

//Examples
int m = 1, n = 2; double x = 1.2; int a = 5;
char s[100];
1) a = sscanf(" 123hello", "%d", &m);
// skips the leading space, goes through ints (123) the, stops in front of hello
// 123 is assigned to m
// a: 1, m: 123 after this.

2) a = sscanf(" hello", "%d", &m);
// skips the leading space, fails in front of hello
// a: 0, m: unchanged (1)

3) a = sscanf(" 12 34hell", "%d%d", &m, &n);
// skips the first space, 12 is assigned to m, skips the second space, 34 is assigned to n
// scan stops in front of hell
// m: 12, n: 34, a: 2

4) a = sscanf(" 12.34 56", "%d%lf", &m, &x);
// skips the first space, 12 is signed to m, stops in front of . 
// .34 is assigned to x, stops reading in front of the second space
// m: 12, x: 0.34, a: 2

5) a = sscanf(" hello123", "%s%d", s, &m); // array name is already an address (no &)
// skips the leading space, hello123 is assigned to s
// s: "hello123", m: unchanged(1), a: 1

6) a = sscanf("   ", "%d", &m); // special case //
// m: unchanged, a: EOF
```

