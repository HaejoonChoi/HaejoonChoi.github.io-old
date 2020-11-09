---
layout: post



title: Procedural Programming [C] - Input, Output (IO)



date: 2019-09-18 14:16:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag


---

# Input / Output (I/O)

-   ###### I / O is performed via streams.

-   ###### 3 streams are available when our program starts:

    1.  `stdin` (standard input): associated with keyboard input by default

    2.  `stdout` (standard output): associated with console output by default

    3.  `stderr` (standard error): associated with console output by default

        (Type: FILE *)

    -   **Convention**: Regular messages should be printed to stdout,

        ​						error messages should be printed to stderr. 

-   We can redirect the I/O to go to different places (I/O redirection)

-   The default associations of stdin, stdout and stderr can be changed using I/O redirection

-   I/O redirection is provided by the shell and is not specific to C.

    ```shell
    $ ./a <input >output 2>errors
    $: shell prompt
    <: redirects stdin
    >: redirects stdout
    2> redirects dtderr
    input, output, errors: file names
    ```

    

## Output (printf / fprintf / sprintf)

-   printf: always prints to stdout
-   fprintf: can specify the stream (FILE *) to print to via the first argument (extra one argument: where to print)
-   sprintf: prints to a "string" specified by the first argument



-   Example

    ```c
    1) 	int m = 1, n = 2;
    		printf("The sum of %d and %d is %d\n", m, n, m+n);
    		// first argument: format string, %d: conversion specification (from bit pattern to text)
    		>> The sum of 1 and 2 is 3
    ```

-   output: data item -> text, input: text -> data item (internally)

-   In the general case, there can be 5 components in the conversion specification. 

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

-   `%d`: int in base 10
-   `%x, %X`: unsigned int in base 16
-   `%o`: unsigned int in base 8
-   `%s`: string
-   `%ld`: long in base 10
-   `%u`: unsigned int in base 10
-   `%lu`: unsigned long in base 10
-   `%f`: float / double



```c
fprintf int n=12;
	ef. fprintf(stdrr, "%05d", n);

sprintf:
	int n = 12;
	char s[32];
	sprintf(s, "%05d", n); /* s contains "00012" */
```

-   Note: the caller n responsible for ensuring that the array of chars is large enough to store the string.



## Input

⭐️ Always check the return value of an input function immediately after calling it ⭐️

### Reading a character (getchars)

Example.

-   ```c
    int c;
    while ((c = getchar()) != EOF) // EOF: End-of-file
    	putchar(c);
    ```

-   `getchar()` needs a character from `stdin` and returns it.

-   However, it may fail (ef. there is no more input); in this case, it returns a value denoted by EOF.

-   EOF must have a value different from all possible characters. Hence c is an `int`.

-   Technically, `getchar()` returns an `unsigned char` cast as an `int`.

    Note: the `char` type in C can be `signed` or `unsigned`. 

    ##### Assuming an 8-bit char type, 

    -   -128 ~ 127 `signed char`
    -   0 ~ 255 `unsigned char`

-   `((c = getchar()) != EOF)` 

    -   brackets for `c = getchar()` are necessary 

    -   `c = getchar() != EOF` is equivalent to `c = (getchar() != EOF)`

    -   `!=` has higher precednece than `=`

        

### What is end-of-file?	

-   It is a **condition**. For a physical file, it becomes true when we try to **read past the last byte in the file**. 

-   For Keyboard input, we can generate the end-of-file condition **by pressing certain keys. (Ctl-d)**

-   redirection of input `(<)`

    `./a.out < input`

-   Keyboard input is line-buffered: our program does not get the input until the user presses the 'Enter' key.



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

1.  Displaying a file in all uppercase

    ```c
    while((c = getchar()) != EOF) 
    	putchar(toupper(c));
    ```

    

2.  Counting the number of line in a file

    Basically, no. of lines = no. of newline characters

    ```c
    size_t nlines = 0;
    while((c = getchar()) != EOF) 
    	if(c == '\n')
        ++nlines;
    	/* print nlines */
    ```

    -   **Minor problem**: the last line in the file may not have a newline character.
    -   **Solution**: Don't count the end of a line. Count the beginning of a line



## Reading a line (fgets)

​			`fgets(buffer, bufsize, stream)`

-   Keeps reading characters from `stream` & storing them into `buffer` until either
    1.  End-of-file becomes true, or
    2.  `bufsize - 1` characters have been stored into `buffer`, or
    3.  a newline character has been stored into `buffer`.
-   In all 3 cases, `fgets` appends a null character.
-   `fgets` returns the null pointer on end-of-file with no charaters read. 
-   The null pointer can be denoted by `NULL` or simply by `0`.



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

-   **Lesson**: use a large buffer !! 

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

-   `scanf`: reads from stdin
-   `fscanf`: reads from a file that we can specify via the 1st argument
-   `sscanf`: reads from a string that we specify via the 1st argument



**Examples**

```c
int n;
scanf("%d", &n); // &: address-of operator
// compare with: printf("%d", n);
// for output, using the copy of a variable is okay 
// for input, the original address of n should be used, which is &n
```

-   Need to check return value of `scanf`!!



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



```c
#include <stdio.h>
#define LINESIZE 1024

int main(void) {
	char line[LINESIZE];
	int n, sum = 0;
  
	while (1) {
		printf("Enter an integer: ");
		if(!fgets(line, LINESIZE, stdin)) { // if you can't get a line, just stop
			clearerr(stdin); 
      // clear the error condition to get back to the normal behavior again
      break;
    }
    if (sscanf(line, "%d", &n)) {
      sum += n;
    }
  } 
  printf("The sum is "%d\n", sum);
	return 0;
}
```

For interactive input, always use `fgets` possibly followed by `sscanf`.



### Example: Summating integers from user

```c
#define LINESIZE 1024

char line[LINESIZE];
int n, sum = 0;
while (1) {
	printf("Enter an integer: ");
  if (!fgets(line, LINESIZE, stdin)) {
    clearerr(stdin);
    break;
  }
  if (sscanf(line, "%d", &n) == 1)
    /* if there's no "== 1" part, EOF can be read (EOF 			has value (-1)), then the previous n value will be 			added again */
    sum += n;
}
printf("%d\n", sum);
```



## File I/O (fopen, fclose, fprintf, fscanf, etc.)

3 steps:

1.  Open the file
2.  Perform I/O (on the stream returned by opening the file)
3.  Close the file (close the stream, actually)



### Opening a file

This associates a stream (`type: FILE *`) with the file.

#### Standard idiom to open a file 

```c
FILE *fp; /* fp = file pointer */     
	if ( fp = fopen(filename, mode) == 0) {
    /* 0 means null pointer = fopen failed */ 
    perror("fopen");
    /* additional error-handling if needed */
  }
```

`perror` is used to print a system error message to stderr.

-   It only works if a call to a library function fails & that function sets `errno` (you can think of `errno` as  a global intger variable, when certain function fail, they store an error number into it.)

`filename` is just a string. Need to careful when using Windows:

if. `"C:\newfile.txt"`    `"C:\\\newfile.txt"`

-   `\n` can be interpreted as newline.

`mode` is the open mode. 

-   12 different modes divided into 2 groups of 6: 

    6 text modes & 6 binary modes.

Note: No difference between text &  binary modes in UNIX (ef. Linux, MacOS)

-   Text modes:

    `"r"`    open for reading (file must exist)

    `"r+"`  open for both reading & writing (file must exist)

    `"w"`	create or truncate file for writing

    `"w+"`  create or truncate file for both reading & writing

    `"a"`    create or open file for writing, always writing at the end.

    `"a+"`  create or open file for reading & writing, always writing at the end.

-   Corresponding binary modes: 

    `"rb"`, `"rb+" === "r+b"`, `"wb"`, `"wb+" === "w+b"`, `"ab"`, `"ab+" === "a+b"`

-   *text* vs *binary* mode in Windows:

    ​                     **file content**                **C Program**

    Text mode: `'\r'` `'\n'`    <----->  `'\n'`

    ​	                                  x     <----->  x    (all other characters)

    -   Special handling of newline character in text mode in Windows.



### Closing a file

This disassociate the stream with the file.

#### Standard idiom to close a file 

```c
if (fclose(fp) != 0) { /* fclose failed */ 
	perror("fclose");
	/* additional error-handling if needed */
}
```



### Reading & Writing to a file

-   `fprintf`, `fputc`
-   `fscanf`, `fgets`, `fgetc`

```c
ef.
int c;
while((c = fgets(ifp)) != EOF) /* ifp: input stream */ 
	fputc(c, ofp);
   /* ofp: output stream */ 
```

```c
ef. Summating integers read from a file.
int n, sum = 0; /* content of file: 123 456 -13 .... */
while((fscanf(fp, "%d", &n)) == 1 ){ /* fp: input stream */
	sum += n;
}

    
  
```



#### Reading and summating integers from a file

##### Ver1.

```c
#include <stdio.h>

int main(void) {
	FILE *fp;
	int n, sum = 0;
	
	if((fp = fopen("integers.txt", "r")) == 0){
		perror("fopen");
		return 1;
  }
  while(fscanf(fp, "%d", &n) ==1)
    sum += n;

  printf("%d\n", sum);

  if(fclose(fp) != 0){
    perror("fclose");
    return 2;
  }
  return 0;
}
```



##### Ver2.

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
	FILE *fp;
	int n, sum = 0;
	
	if((fp = fopen(argv[1], "r")) == 0){
		perror("fopen");
		return 1;
  }
  while(fscanf(fp, "%d", &n) ==1)
    sum += n;

  printf("%d\n", sum);

  if(fclose(fp) != 0){
    perror("fclose");
    return 2;
  }
  return 0;
}
```



##### Ver3. 

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
	FILE *fp;
	int n, sum = 0;

  if (argc != 2){
    fprintf(stderr, "usage: %s {filename}\n", argv[0]);
    return 1;
  }
  
	if((fp = fopen(argv[1], "r")) == 0){
		perror("fopen");
		return 1;
  }
  while(fscanf(fp, "%d", &n) ==1)
    sum += n;

  printf("%d\n", sum);

  if(fclose(fp) != 0){
    perror("fclose");
    return 2;
  }
  return 0;
}
```





#### Program to copy a file

```c
#include <stdio.h>

int main(int argc, char *argv[]){
	FILE *ifp, *ofp; /* note: * is repeated */
    int c;
    
    if(argc != 3){
        fprintf(stderr, "usage: %s {source} {destination}\n", argv[0]);
        return 1;
    }
    if((ifp = fopen(argv[1], "rb"))==0){
        perror("fopen");
        return 2;
    }
    if((ofp = fopen(argv[2], "wb")) == 0){
        perror("fopen");
        return 3;
    }
    while ((c = fgetc(ifp)) != EOF){
        fputc(c, ofp);
    }
    if(fclose(ifp) != 0) {
        perror("fclose");
        return 4;
    }
    if(fclose(ofp) != 0){
        perror("fclose");
        return 5;
    }
    return 0;
}
```



-   The first thing a program should do is check whether if it's invoked correctly *ef. correct number of arguments & arguments are valid*
-   Handle failure cases first to reduce resting



##### There are 3 indicators associated with a stream

1.  end-of-file indicator

2.  error indicator 

    ###### /* the `clearerr` function clears these 2 indicators */

3.  file position indicator*

    ###### /* indicates our current location */



### 3 functions that use the file position indicator: 

-   `ftell` - returns our current location
-   `rewind`, `fseek` - change our current location



#### ftell 

​	`long ftell(FILE *);`

-   returns the number of bytes from the beginning of the file

-   ```c
    ef.
    long pos;
    if((pos = ftell(fp)) == -1) { /* ftell failed */ }
    	perror("ftell");
    	/* additional error-handling if needed */
    }
    ef. calling ftell(stdin) with stdin associated with keyboard input will fail.
    ```

    

#### rewind, fseek 

```c
void rewind(FILE *); /* go back to beginning of the file */
int fseek(FILE *, long, int); 
/* long: offset, 
** int: whense
** - 3 possible values
**		SEEK_SET: relative to beginning
**		SEEK_CUR: relative to current location
** 		SEEK_END: relative to end
*/

ep. 
    fseek(fp, 10, SEEK_SET); /* move to 10 bytes from the beginning of the file */
	fseek(fp, 10, SEEK_CUR); /* move forward 10 bytes from the current position */
    fseek(fp, -10, SEEK_CUR); /* move backward 10 bytes from the current position */
```

-   Can we move past the end of a file? It depeneds on the operating system. It's fine on MacOS & Linux.
-   We cannot move past the beginning of a file.
-   Note that fseek can file; if. `fseek(stdin)` fails when stdin is keyboard input

```c
if(fseek(fp, offset, whence) != 0) { /* fseek failed */
	perror("fseek");
	/* additional error-handling if needed */
}
```



### `fflush`: used to flush output

​	`fflush(fp);`

Note: stdout is typically line-buffered; a message printed to the console via stdout may not show immediately on the screen if there is no newline character. 



