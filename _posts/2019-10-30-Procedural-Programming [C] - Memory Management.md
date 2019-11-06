---


layout: post



title: Procedural Programming [C] - Memory Management



date: 2019-11-06 00:09:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag

---

# Chapter 12. Memory Management 

-   in the textbook "C Primer Plus", p.511–564 

## Void pointer

```c
int * p; // int: destination type / target type

void *q; /* a void pointer can point to any type of object */
int n = 123;  double x = 1.23;
q = &n; /* OK */
q = &x; /* OK */
*q = 3.14; /* invalid; cannot dereference a void * */
* (double *) q = 3.14; /* OK */
```

-   A void pointer can point to any type of object
-   A void pointer connot be directly dereferenced

```c
int n = 123;
void *p = *n;
int *q = p;
*q = 456 /* changes n to 456 */
```

-   A void pointer is compatible with any other type of pointer to object

    e.g. `p = q; (void * = int *)` `q = p; (int * = void *)` 



## Lifetime of objects

-   Right now, we have 2 kinds of objects - local vs. global (a.k.a external)

```c
example)
int n; /* external object; lifetime is duration of program */
int main(void) {
	int x = 1; /* local to main */
	.....
	if(x == 1) {
		int y = 2; /* local to if */
		.....
		.....
	} /* y destroyed here */
	.....
	return 0;
} /* * destroyed here */
```

-   Lifetime of a local object is the duration of execution of the block in which it is created. 
-   Lifetime of an external(global) object is the duration of the program. 
-   **Uninitialized local variables have random(garbage) values**
-   **However, uninitialized external variables contain 0's.**



## Dynamic Memory

-   Gives us more control over the lifetime of an object (we can create an object at any time and destroy it at any later time)

```c
#include <stdlib.h>
malloc // for allocating dynamic memory
calloc //        (same as above)
realloc // typically used to resize dynamic memory
free // for deallocating dynamic memory
```



### malloc()

Example: allocating dynamic memory for IO ints

```c
int *p;
p = malloc(10 * sizeof(int));
if(p == 0) { /* when malloc() returns null pointer (0) */ 
  fprintf(stderr, "unable to allocate memory \n");
	exit(1); /* error code: 1 */ 
}
/* use the array of 10 ints */
p[0] = p[2] = p[4] = p[6] = p[8] = 0; /* dynamic array */
p[1] = p[3] = p[5] = p[7] = p[9] = 1;
/* deallocate memory when done */
free(p);
```

-   What if we need to allocate a dynamic array of 10 doubles?

```c
double *p = malloc(10 * sizeof(double));
```

-   What is the return type of malloc()? 

```c
// prototype //
void * malloc(size_t){} 
/* this is why we had to talk about void pointer!! */
/* malloc returns object pointer that can be used for any object type */
```

-   **`malloc()` returns the starting addrress of the block memory it allocates or the null pointer of failure**

-   **memory allocated by malloc contains random values** - different than calloc



### calloc() - almost the same as malloc() except

1.  it zeros out the allocated memory (i.e. allocated memory contains 0's)

2.  calloc takes 2 arguments — the no. of objects and the size of each objecct

    `int *p = calloc(10, size(int));`

```c
// prototype //
void * calloc(size_t, size_t){} 
```



### realloc() - change size of the allocated memory

```c
// prototype //
void * realloc(void *p, size_t, newsize);
/* p = pointer to original block */
```



-   2 special cases:

    ```c
    realloc(p, 0) ≣ free(p)
    realloc(0, size) ≣ malloc(size)
    ```

ex. 

```c
int *p, *tmp;
if((p = malloc(10 * sizeof(int))) == 0) {
	fprintf(stderr, "...");
  exit(1);
}
/* use the 10 ints */
/* Assume 10 ints is not enough; resize to 20 ints */
if((tmp = realloc(p, 20 * sizeof(int))) == 0) {
  fprintf(stderr, "unable to resize memory \n");
} else {
  p = tmp; /* p now points to a block of 20 ints with the original 10 ints */
}
/* free memory when done */
free(p);
```



-   Assuming realloc succeeds, there are still 2 possibilities: 

![realloc](../assets/img/realloc.png)



-   Dynamic memory is allocated on the heap



### **figure... add it later**



