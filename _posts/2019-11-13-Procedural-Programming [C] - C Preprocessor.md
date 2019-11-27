---
layout: post



title: Procedural Programming [C] - The C Preprocessor



date: 2019-11-13 00:09:15 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag

---



[TOC]

# The C Preprocessor

 ![C file processing](/Users/haejoonchoi/SynologyDrive/BCIT/COMP 2510 - Proced. Prog/COMP 2510 - Nov 13 - C Preprocessor.assets/C file processing.png)

### Commands

```bash
gcc -E <file> : generates preprocessed output
gcc -S <other switches> <file>: outputs .s file (assembly output)
gcc -c <other switches> <file>: outputs .o file (object file; contains machine code)
```



## The preprocessor handles preproessor directives

### 1) #include 

```c
2 versions:
	#include <stdio.h> (for system header files)
		/* look for this in a system directory e.g. /usr/include */
	#include "sort.h" (for our own header files)
		/* default is to look for this file in the current directory */
	
	e.g. 
    #include "header/sort.h"
    	/* looks for file under the directory "headers"
    						in our current directory (default) */
```



### 2) #define  – used to define macros

```c
e.g. 
#define LINESIZE 1024
 char line[LINESIZE]; /* macro expansion -> char line[1024]; */

/* NOTE: macro expansion works by text replacement */
/* however, it is not going to be applied to a line of string */
  ex. puts("LINESIZE is 1024"); /* not going to be expanded */

e.g.
#define LINESIZE 1024;
	char line[LINESIZE]; /* macro expansion -> char line[1024;]; */
											 /* ERROR */
```



#### function–like macros

-   We can write function–like macros. but it turns out that it may difficult to get them correct. 

```c
#define SQUARE(X) X*X
	int n = SQUARE(2);   /* -> int n = 2*2; */
	int m = SQUARE(1+1); /* -> int m = 1+1*1+1; doesn't work as intended */

#define SQUARE_V2(X) (X)*(X)
	int m = SQUARE_V2(1+1);  /* -> int m = (1+1)*(1+1); works correctly */
	int x = 25/SQUARE_V2(5); /* -> int x = 25/(5)*(5) == 25 */
													 /* we want the result to be 1, doesn't work as intended */

#define SQUARE_V3(X) ((X)*(X))
	int x = 25/SQUARE_V3(5); /* -> int x = 25/((5)*(5)) == 1 */
													 /* works as intended, "Put enough brackets!" */
	int y = SQUARE_V3(n++);  /* -> int y = ((n++)*(n++)); result is UNSPECIFIED!! */
```

-   Learning point

    -   Put enough brackets! 

    -   We don't have problems of function–like macros iff we use a function.   

    
```c
  int square (int x) { return x * x;}
  
int main(void){
    int n = 1;
    int y = square(n++); /* no problem! */
  } 
```



#### Function–like macros vs (actual) functions

-   Macros may be more efficient than functions: no function calls (it's just code expansion)
-   Macros may work with differnt types (as they don't need to specify the type of variables), whereas a function is generally for a specific type



### 3) #undef - used to undefine a macro

```c
#undef LINESIZE
```



### 4) conditional compilation

#### `#if / #elif / #else / #endif` : if condition is met, certain code parts will be activated

-   #### Used for commenting

```c
/*
  ..... /* ... */  WRONG! comments don't nest
	..... /* ... */
*/

#if 0
	..... /* ... */ <- quick way to comment out a block of code
  ..... /* ... */
#endif
```



-   #### Used to compile specific part of a code

```
e.g. to compile specific part of code 
    #if X == 1
    	............ code part #1
    #elif X == 2
    	............ code part #2
    #else
    	............ code part #3
    #endif 
    
$ gcc -DX=1 ... // -D: define // it will compile with the code part #1
```



-   #### Used to compile according to environment (OS)

```c
#define UNIX 1
#define DOS 2

int main(void) {
	#if OS == UNIX
		system("clear");
	#elif OS == DOS
		system("cls");
	#else
		{
			size_t i;
			for(i = 0; i < 128; i++) {
				puts("");
			}
		}
	#endif
		.........
}

$ gcc -DOS = UNIX ...
// NOTE: there's no space after -D
```



#### `#ifdef / #else / #endif`  : if something is defined, certain code parts will be activated

-   may be used for debugging purposes

```c
#ifdef DEBUG /* if the macro DEBUG is defined */
	......
#endif
    
$ gcc -DDEGUG ... /* it will run with the DEBUG code parts activated */ 
```



#### `#ifndef / #else / #endif` : if something is undefined, certain code parts will be activated

-   give the macro LINESIZE a default value of 1024

```c
#ifndef LINESIZE /* if LINESIZE is not defined already, */
	#define LINESIZE 1024
#endif

$ gcc -DLINESIZE=512 .... /* LINESIZE == 512 */
$ gcc ....  							/* LINESIZE == 1024 by the #ifndef part */
```





-   may be used as **Include Guards** : guard against the same header file from being read in more than once in the same file. 

```c
/* file.c */
#include <stdio.h>
........
#include <stdio.h> /* ERROR: the same header shouldn't be read more than once */
```

-   it usually happens when one header file includes another header file (indirect include)

<img src="/Users/haejoonchoi/SynologyDrive/BCIT/COMP 2510 - Proced. Prog/COMP 2510 - Nov 13 - C Preprocessor.assets/indirect_include.png" alt="indirect_include" style="zoom:50%;" />



-   more commonly, a header file may be indirectly included more than once. 

```c
include guard (at the beginning of a header file)
#ifndef SORT_H
#define SORT_H
	/* content of header */
#endif
```





## Makefile example

```makefile
CC = gcc
CFLAGS = -ansi -pedantic -W -Wall
sort_grades: main.o io.o sort.o # dependency line; format - target: prerequisites
	$(CC) $^ -o $@ # command line; $@ = target $^ = all prereqs

main.o: main.c grade.h io.h sort.h
	$(CC) $(CFLAGS) -c  $< # $< = first prerequisite

io.o: io.c grade.h io.h
	$(CC) $(CFLAGS) -c  $< # $< = first prerequisite

sort.o: sort.c grade.h sort.h
	$(CC) $(CFLAGS) -c  $< # $< = first prerequisite

```



## Multiple C source files

-   Type definition function prototypes should go in header files

-   Header file should use include guards 

    -   ex.

        ```c
        #ifndef SORT_H
        #define SORT_H
        	/* everything goes here */
        #endif
        ```

-   Function implementations should go in .c files. Those functions that we don't want to "export" should be declared <u>static</u> & their prototypes should not go in the header file. 
-   We can compile each .c file separately comp

