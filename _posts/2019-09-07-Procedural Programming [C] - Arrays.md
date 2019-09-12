---



layout: post



title: Procedural Programming [C] - Arrays



date: 2019-09-07 13:40:20 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag



---

## 2019-09-04

#  Introduction of C 

- Creater - Dennis Ritchie 1970's

- Java is an Objected-oriented language (class) 
- C is a procedural language - implement functions (procedures)
- We'll be using ANSI C (or C89/90)



## Hello, world program in C

```c
/* hello.c */  /* comment; only 1 style of comment in ANSI C */

#include <stdio.h>
/* "Return type"   "name of function"   "parameter list" */
int main(void) {
puts("hello, world");   /* body of function */
return 0;   /* "string literal" */
}
 
```

- Compiling of the program: **(will be on exam, multiple choice)**

```bash
$ gcc -ansi -pedantic -W -Wall -Werror hello.c
Uppercase W means "turn on warning", lowercase w means "turn off warning"
$ ./a (or ./a.out)
// Cygwin     MacOS/Linux 
```

- Execution starts from the function named `main` of the standard specifies a versions of `main`

  - one of them is `int main(void)` slightly different without `void`

  - the integer returned by `main` is passed to the shell that started it

  - Convention: `main` returns 0 if there are no errors, otherwise, it returns a positive integer value

  - We can print the return value of `main` from the shell via 

  - ```
    echo %errorlevel% (Windows)
    echo $? (bash)
    ```

    

## 2nd Program

```c
# include <stdio.h>

int square(int); /* function prototype: used to declare a function */

int main (void) { 
	int n = 1;
  printf("%d\n", square(n)); /* f stands for formative print */ /* %d means "decimal value" */
  return 0;
}

int square(int n) { 
	return n*n;
}
```



## function declaration vs. function definition

- **function declaration**: tells compiler that there is such a function

- **function definition**: contains the code for the function

  Note: a definition is also a declaration

- A function prototype is used to declare a function and does not contain its code
- `stdio.h` contains the prototype of functions related to I/O
- A function declaration allows the compiler to check whether we are calling the function correctly



## 2019-09-05

# Arrays



## Examples

```c
1. int a[5]; *5 is length of array*

/* array of 5 integers; contains random values if this is a local array; array index starts from 0. valid elements are a[0], a[1], a[2] & a[4] */

2. int b[5] = {3, 2, 7, 6, 8}; /* numbers in {} are initializers */

3. int c[4] = {3, 2, 7, 6, 8}; /* error */

4. int d[5] = {3, 2, 7}; /* rest default to 0 */

5. int e[] = {3, 2, 7, 6, 8}; /* compiler counts the initializers */
```



### Standard way of making a for loop

```c
for (<initialization>; <test-to-continue-loop>; <update>)
  <body>
```



## Standard idioms to process an array (for loop)

```c
T a[N]; /* T = type of the array, a = name of array, N = positive integer */
size_t i; /* size_t = type to store sizes, it is some unsigned integer type */ 

for (i = 0; i < N; i++) {
  /* process a[i] */
}
```

- In ANSI C, all variables must be declared at the beginning of a block ( {…} ). 



## Examples

```c
1) Summary an array of integers
  
  int main(void) {
    int a[] = {3, 2, 7, 6, 8};
    size_t i;
    int sum = 0; /* should be explicitly declared as 0 */
    for (i=0; i<5; i++)
      sum += a[i];
    printf("%d\n", sum);
    return 0;
  }
- All uninitialized local variables have random garbage values


2) Encapsulate the summary in 1) into a function "Pass by reference vs pass by value"
 
  ex.	int n = 1; /* does f get the original n or a copy of n? */ 
			void f(int x) { x++; }

- In C, basically everything is passed by value.
  However, it is impossible to pass a whole array by itself. 
  
  ex.	int a[5] = {3, 2, 7, 6, 8};
			
- The array name "a" becomes the starting address of the array when we pass it into a function.
- Note: the starting address of an array in the address of its first element.
  
int array_sum(const int a[], size_t n) { 
  /* use const if the function is not going to modify the array elements */
  size_t i;
  int sum = 0;
  for (i = 0; i < n; i++) {
    sum += a[i];
  }
  return sum;
}

int main(void) {
  int a[] = {3, 2, 7, 6, 8};
  printf("%d\n", array_sum(a, 5));
  return 0;
}


3) finding the maximum of an array of integers

int array_max(const int a[], size_t n) { /* precondition: n > 0 */ 
	size_t i;
	int max = 
	for (i = 0; i < n; i++)
		if (a[i] > max)
      max = a[i];
	return max;
}

- A precondition of a function is a condition that must be true in order that the function workds correctly. The caller of the function is responsible for ensuring the precondition is met.
  
4) looking for an integer in an integer array

size_t array_find (const int a[], size_t n, int x) {
	size_t i;
	for (i = 0; i < n; i++) {
		if(a[i] == x) /* const is useful to prevent changing the element of the array a[] */
			return i;
  return -1; /* in the context of size_t, -1 means the biggest possible value */
  					 /* another possibility is to return n; */
	}
}
```



## Testing

### Version 1: Print the return value of calls to the function 

#### Problem: The output may look like random values (we need to compare them to the current values)



### Version 2: Print whether the function gives the correct answer

​	`ex. int a[]= {3,2,7,6,8};`

​	`printf("%d\n", array_sum(a,5) == 26);`

- There is no boolean type in ANSI C.
- 0 (or ? equivalents) is false; everything else is true.
- The built-in comparison operators return 0 or 1.

#### Problem: We have hundreds of tests and one of them failed. How do we tell which one?



## 2019-09-11 (continued)

### Version 3: Print the test as well as whether it passes (macro)

```c
#define CHECK(x) printf("%s...%s\n", (x)?"passed":"FAILED", #x) 
// # sign converts int x to a string

CHECK(array_sum(a,5) == 26); 
// possible output: 
// passed...array_sum(a,5) == 26
// FAILED...array_sum(a,5) == 26

CHECK(array_find(a,5,1) == (size_t)-1);
// array_find returns unassigned (size_t). 
// If the righthand side is -1, it's signed (negative) integer -1; 
// it's very dangerous to compare unassigned & assigned value. 
// so you'd want to cast -1 into (size_t) which is used as boolean 'false'
```

