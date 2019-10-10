---
layout: post



title: Procedural Programming [C] - Pointers



date: 2019-10-10 14:16:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag


---



# Pointers

#### Definition: A pointer is a variables that stores an address.



### Three things:

1.  ##### How do we declare a pointer variable? 

2.  ##### This needs to store addresses, what are the sources of addresses?

3.  ##### What does an address allow us to do? 



### Sources of addresses

1.  & : address-of operator

```c
int n = 123;
&n /* address of n */
```

2.  array names

```c
int a[10];
a /* can be used as the staring address of the array */
```

​		

### Dereferencing an address or pointers

-   when we **deference** an addresss or pointers, we go to the destination it specifies.

    p - pointer or address

    *p - destination (\*: dereference operator - this means "go to destination")

    ```c
    ex.
    int a[] = {3, 2, 7};
    ```

    -   What is `*a`?
    -   Note: the starting address of an array is the address of its first element.

    ```c
    printf("%d", *a); /* 3 */
    *a = 4; /* changes a[0] to 4 */
    ```



### Declaring a pointer

#### Examples

```c
int n = 123;
int *p = &n;
/* p is a pointer to an int */
printf("%d", *p); /* 123 */
*p = 456; /* changes n to 456 */

float *q; /* float: destination type (target type) */
/* q is a pointer to a float */
```



#### Definition: We say that a pointer *"p points to x"* if p contains the address of x.

##### Examples

##### 1)

```c
int n = 123;
int *p; /* int: target type, destination type  */
p = &n; /* p points to n */
```

-   `int` in front of `*p` - target type, destination type
    -   Needed when we go to the destination (we need to know how many bytes to interpret & how to interpret the bit pattern there)
-   2 ways to "read": `int *p`
    1.  `int *`|`p` : `p` is an `int *`
    2.  `int`|`*p`: `*p` is an `int`



##### 2)

```c
int n = 123;
int   *p = &n;
int  **q = &p; /* "q points to p" == "*q is p" */
int ***r = &q; 

int **q /* "q is a pointer to a pointer to int" == "q is a double pointer to int" */
int ***r /*r is a triple pointer to int */
```

-   4 ways to "read": `int ***r`
    1.  `int ***`|`r` : `r` is an `int ***`
    2.  `int **`|`*r`: `*r` is an `int **`
    3.  `int *`|`**r`: `**r` is an `int *`
    4.  `int `|`***r`: `***r` is an `int`

`***r = 456;`: changes n to 456



-   We can store the starting address of an array of ints in a pointer to int. 

    ```c
    int a[] = {3, 2, 7, 6, 8};
    int *p = a; /* OK; p points to the first in the array */
    			(Note : p is not pointing to the whole array)
    ```

    It turns out that we can index pointers

    `p[0], p[1], p[2], ...`: (We can use the index notation with pointers as well as with arrays)

-   Actually, we have been indexing pointers from the 1st week of class!!

    ##### Recall

    ```c
    int arr_sum(const int a[], size_t n[]){ /* this accepts an address of a[] */
    	size_t i;
    	int sum = 0;
    	for (i = 0; i < n; i++){
    		sum += a[i];
    	}
    	return sum;
    }
    main: 	int a[] = {3, 2, 7, 6, 8};
    		int total = arr.sum(a, 6); /* a is array name: starting address of array */
    
    ```

    As a formal parameter of a function

    ​	`T a[] ≣ T *a`

-   Note: they are NOT equivalent in other cases (pointers are not the SAME as arrays)

-   ex. `size_t strlen(const char s[]);` /* our version */

-   `size_t strlen(const char *s);` /* library */



##### Example: the difference between pointers and arrays

```c
char s[] = "hello"; /* array */
char *p = "world"; /* pointer */
p = s;
s = p;  /* s = array name (address) */
/* Does NOT COMPILE - can't assign to address */

s = {'h', 'e', 'l', 'l', 'o', '\0'};
p = {'w' /* (*p) */, 'o', 'r', 'l', 'd', '\0'}


s[0] = p[0]; /* changes 'h' to 'w' */
p[0] = s[0]; /* invalid! Trying to change STRING CONST */
/* any attempt to change the string will lead to undefined behavior */


```

```c
char s[] = "hello";
char *s = "hello"; /* is it different? yes */
printf("%s", s);

```





## Examples for midterm

```c
1)
int m = 12, n = 34;
int *p = &m, *q = &n;
*p = *q;
m++; n--;
printf("%d, %d", m, n) 
>> 35, 33
    
2)
int m = 12, n = 34;
int *p = &m, *q = &n;
p = q;
++(*p);
m--, n++;
printf("%d, %d", m, n);
>> 11, 36
    
3)
int m = 12, n = 34;
int *p = &m, *q = &n;
int **pp = &p, **qq = &q;
*q = *p; /* same as n = m */
*pp = *qq; /* same as p = q */
++(*q); /* n becomes 13 */ ++(*p); /* n becomes 14 */
m++, n++; /* m becomes 13, n becomes 15 */
printf("%d, %d", m, n);
>> 13, 15

```

