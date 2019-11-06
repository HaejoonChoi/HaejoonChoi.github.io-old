---


layout: post



title: Procedural Programming [C] - Arrays of Pointers



date: 2019-11-06 00:09:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag

---

# Arrays of Pointers

ex.

```c
char *a[] = {"hello", "world"};
printf("%s", a[0]); /* hello */
printf("%s", a[1]); /* world */
printf("%c", a[0][0]); /* c */
printf("%c", a[1][2]); /* r */
```

ex.

```c
int main (int argc, char * argv[]) 
  /* char * argv[] ≣ char ** argv */
	{ ... }
/* Assume program name is a. */
$ ./a hello world

args: 3
argv {
  pointer -> "./a", 
  pointer -> "hello", 
  pointer -> "world", 
  nullpointer}
```



### Standard idiom to process command-line arguments

```c
for (i = 1; i < argc; i++)
	/* process argv[i] */
  
-- alternative --
  
for (i = 1; argv[i] != 0; i++)
  /* process argv[i] */
```

