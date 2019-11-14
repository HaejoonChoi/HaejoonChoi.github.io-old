---
layout: post



title: Procedural Programming [C] - Function Pointer



date: 2019-11-07 00:09:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag


---





# Function Pointer

-   A function pointer is a variable that stores the address of a function.



We need to be able to 

1.  Declare a function pointer **(hardest)**
2.  Find the address of a function
3.  Call the function pointed to by a function pointer. 



## 2. Address of a function

```c
f — function

/* we can use &f, or simply f, as its addresss */
```



## 3. Calling a function via function pointer

```c
void f(int);
/* Assume p points to f. */
(*p)(1);
/* calls f via p passing in 1 */

/* or simply, */
p(1); /* it also works */
```



## 1. Declaring a function pointer

### Example 

```c
1) 
  void f(int); 
	void (*p)(int) = f;

2)
  int g(int, int);
	int (*p)(int, int) = g;

3)
  void f1(int);
  void f2(int);

void (*a[2])(int) = {f1, f2}


```



### Right–Left Rule 

![Right-left rule](../assets/img/Right-left rule.png)

### Example

```c
1) void (*p)(int);
// p is (2. a pointer) to (3. a function that takes an int) & (4. returns nothing)

2) void (*a[2])(int);
  1. a[2]
  2. *a[2]
  3. (*a[2])(int)
  4. void (*a[2])(int)
// a is (1. an array of 2) (2. pointers to functions) (3. that take an int) & (4.return nothing)
    
3) char * const * p; 
// p is a pointer to a const pointer to char

4) int * a[3];
	1. a[3]
  2. int * a[3]
// a is (1. an array of 3) (2. pointers to int)
    
5) int (*p)[3];
	1. *p
  2. (*p)[3]
  3. int (*p)[3]
// p is (1. a pointer) to (2. an array of 3) (3. ints)
    
int a[] = {3, 2, 1};
int *p = a;
printf("%d, %d, %d", p[0], p[1], p[2]);
>> 3 2 1

int (*p)[3];
// *p or p[0] is an array of 3 ints
// that means, p[0][0], p[0][1], p[0][2] ints is possible 
// p[1] will also become an array of 3 ints
```



## Example

```c
void(*signal(int, void(*)(int))(int)
    
signal is a function that has 2 parameters & returns a pointer to a function that takes an int & returns nothing
     (signal returns a function pointer!)
     
the 2 parameters:
	- 1st is an int									void(*)(int)
	- 2nd parameter is a pointer		void(*f)(int)
    to a function that takes an int
    & returns nothing
     
The type of the 2nd parameter is the same as the return type of signal!
     
typedef void (*signalhandler_t)(int);
signalhandler_t signal(int, signalhandler_t);
    
// install a new signalhandler that gives back the original handler
// see "signal.c"
```

