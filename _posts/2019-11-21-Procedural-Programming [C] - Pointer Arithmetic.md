---
layout: post



title: Procedural Programming [C] - Pointer Arithmetic



date: 2019-11-21 00:09:15 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag

---

### 

#Pointer Arithmetic



### example

```c

#include <stdio.h>
int main(void) {
  /*
  char a[] = “hello”;
  char *p = a;
  */
  int a[] = {3, 2, 7, 6, 8};
  int *p = a;
  printf(“%p %p\n”, (void *)a, (void *) (a+1));
  /* +1 adds the number of size of the type  (int = 4, char = 1) */
  printf(“%p %p\n”, (void *)p, (void *) (p+1));
  return 0;
}
```



`ex. char a[] = "hello";`

-   a is the starting address of the array & is the address of the first character

-   a+1 is the addresss of the 2nd character; we can define a+2, a+3, ....



We can do the same thing for p  where `char *p = a;`

-   There are other addresses & pointer operations: p, q pointers or addresses

    ​	`ex. p < q,  p <= q, p > q, p >= q, p == q, p !=q`

    ```c
    if ("hello" == "world") .... 
    /* comparing addresses; usually not what we want */
    /* use strcmp to compare strings */ 
      
    
    ```



### "New" operations 

`p + 1, p + 2, ..., p++, ++p`

`p - 1, p - 2, ..., p--, --p`

-   p+1 or p+2 can be used for address or pointers
-   p++, ++p, p--, --p can only be used for pointers



### Subtraction of pointers / addresses

### ![pointer arithmetic](/Users/haejoonchoi/SynologyDrive/BCIT/COMP 2510 - Proced. Prog/COMP 2510 - Nov 21 - Pointer Arithmetic.assets/pointer arithmetic.svg)





## Standard idiom to process a string (pointer version)

-   Assume <u>s</u> is the string we want to process

```c
(const) char *p;
for (p = s; *p != '\0'; p++)
	/* process *p */
```



### Example

#### 1) length of string

```cc
size_t str_length(const char *s) {
  const char *p;
  for (p = s; p != '\0'; p++) {
    ;
  }
  return p - s;
}
```



![hello string](/Users/haejoonchoi/SynologyDrive/BCIT/COMP 2510 - Proced. Prog/COMP 2510 - Nov 21 - Pointer Arithmetic.assets/hello string.svg)



#### 2) looking for a char in a string 

-   `strchr` - version in standard library

```c
char* str_find(const char *s, int *) {
  const char *p;
  for(p = s; *p != '\0' (*p also works but not as readable); p++)
    if(*p == x) 
      return (char *) p;
  return 0;
}
```



#### 3) copying a string 

``` c
/* version 1 */
void str_copy(char * dest, const char * src) {
  char * d;
	const char * s;
  for(s = src, d = dest; *s != '\0'; s++, d++){
    *d = *s; 
  }
  *d = *s; 
  /* or, *d = '\0'; */
}

/* version 2 */
void str_copy(char * dest, const char * src) {
  for(; *src != '\0'; src++, dest++){
    *dest = *src; 
  }
  *dest = *src; 
  /* or, *dest = '\0'; */
}

/* version 3 */
void str_copy(char * dest, const char * src) {
  for(; *src != '\0';){
    *dest++ = *src++; 
  }
  *dest = *src; 
  /* or, *dest = '\0'; */
}

/* version 4 */
void str_copy(char * dest, const char * src) {
	while((*dest++ = *src++) != '\0')
    ;
}

/* version 5.1 */
void str_copy(char * dest, const char * src) {
	while(*dest++ = *src++)
    ;
}

/* ususally it's a common mistake to put assignment (=) in the 
condition statement of while() 
ex. if(x=2)...
So compiler would warn you */

/* version 5.2 */
void str_copy(char * dest, const char * src) {
	while((*dest++ = *src++)) 
    /* this one more parenthesis suppress the warning */
    ;
}
```



### What does `*p++` do??

-   Actually, there are 4 versions: `*p++`, `++*p`, `*++p`, `(*p)++`

    ```c
    1) *p++ - the most difficult case, but most common.
    /* Is this (*p)++ or *(p++)?? */
    /* By looking at the precedence table, we see that
    	 *p++ ≣ *(p++) */
      
    
    2) ++*p
    /* ++(*p) or (++*)p */
    /* answer: ++(*p)*/
      
    3) *++p
    /* *(++p) or (*++)p */
    /* answer: *(++p)*/
    
    
    ```

-   `*p++` is the most useful; 

    1.  process `*p`
    2.    increment `p` to point to the following element.

-   Recalll that if <u>a</u> is the address of an element in an array, then <u>a + 1</u> is the address of the following element.

-   Similarly, if <u>p</u> points to an element in an array, <u>p + 1</u> points to the following element. 



### Example

```c
1) 
int a[] = {1, 3, 5};
int *p = a + 1;
printf("%d", *p++); // 3 
printf("%d", *p); // 5

2) 
int a[] = {1, 3, 5};
int *p = a + 1;
printf("%d", ++*p); // 4
printf("%d", *p); // 4

3) 
int a[] = {1, 3, 5};
int *p = a + 1;
printf("%d", *++p); // 5 
printf("%d", *p); // 5

4) 
int a[] = {1, 3, 5};
int *p = a + 1;
printf("%d", (*p)++); // 3 
printf("%d", *p); // 4
```

-   Similarly, we have `*p--`, `--*p`, `*--p`, `(*p)--`



### Example. looking for a char in a string (recursive version)

```c
char * str_find(const char *s, int x) {
  if(*s == '\0')
    reutrn 0;
  
  if(*s == x)
    return (char *)s;
  return str_find(s + 1, x);
  /* using ternary operator */
  /* or return (*s == x) ? (char *)s : str_find(s + 1, x); */
}
```



## Standard idiom to process an array (pointer version)



```c
T a[N]; /* T: some type, N: some positive integer */
(const) T *p;
for (p = a; p < a + N; p++)
  /* process *p */
```

```c
int a[] = {1, 3, 5};
```



![pointers](/Users/haejoonchoi/SynologyDrive/BCIT/COMP 2510 - Proced. Prog/COMP 2510 - Nov 21 - Pointer Arithmetic.assets/pointers.svg)

### Example

#### 1) Maximum of an integer array

```c
int arr_max (const int *a, size_t n) {
  /* precondition : n > 0 */
  const int *p;
  int 			max = *a;
  for (p = a; p < a + n; p++) 
    if (*p > max)
      max = *p;
  return max;
}
```



#### 2) Looking for an integer in an integer array

```c
int * arr_find (const int * a, size_t n, int *) {
  const int *p;
	for (p = a; p < a + n; p++) 
    if(*p == x)
      return (int *)p;
  return 0;
}
```

-   