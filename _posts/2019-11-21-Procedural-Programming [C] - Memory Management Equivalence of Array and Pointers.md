

---
layout: post



title: Procedural Programming [C] - Equivalence of Pointer & Array Notations



date: 2019-11-21 00:09:15 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag

---



# Equivalence of Pointer & Array Notations

-   We can use pointer notation with arrays 

```c 
int a[] = {1, 2, 3};
*(a + 1) = 4; /* changes a[1] to 4 */
```



-   We can use array notation with pointers

```c
char *p = "hello";
printf("%c", p[1]); /* e */
```



-   but we know that array are not the same as pointers

`X - Array name of a pointer` 
	x[n] === *(x+n)

​	&x[n] === x + n 



```c
int a[2][3] = {{1, 2, 3}, {4, 5, 6}};

a[1][2]    // 6
  is the same as (*(a + 1))[2] 
  is the same as *(*(a + 1) + 2)
  is the same as *(a[1] + 2)
```

IT WILL BE ON THE FINAL

## 