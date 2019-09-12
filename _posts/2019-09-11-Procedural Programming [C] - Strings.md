---

layout: post



title: Procedural Programming [C] - Strings



date: 2019-09-11 13:40:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag




---



## 2019-09-11



# Strings

- There is no separate type for strings.
- A string is just an array of characters terminated by the null character (sentinel value).
- The null character can be denoted by `\0` or by `0`. 
  - In ST code, null character has value `0`. that's why it can also be denoted as `0`
  - Number `0` doesn't have ST code `0`.
- Whenever a string is made, there's a hidden `\0` at the end of the string.



## Examples

```c
1) "hello" 
          /* This is a string constant; we cannot modify its characters.
             Note that there is a hidden null character at the end.
             We say that it has length 5 (length does not count the null character).
             But we need an array of at least 6 characters in order to store it (one more 								spot for a null character). */
  
2) char s[6] = {'h', 'e', 'l', 'l', 'o', '\0'};
3) char s[6] = "hello"; 
					/* You can't assign a string.
					   You can only initialize string to a char array. */
4) char s[] = "hello"; 
					/* x compiler counts the characters */

4-1) s[0] = 'H'; /* Changes the 'h' to 'H' */
		 printf("%s", s); /* Hello */
		 s[4] = '\0'; 
		 printf("%s", s); /* Hell */
```



## Standard idiom to precess a string

- Assume `s[]` is the string we want to process

```c
size_t i;
for (i = 0, i != '\0'; i++)
  Process s[i];

/* Note: this does not process the null character */
```

## Examples 

### 1) length of string

```c
size_t str_length(const char s[]) {
	size_t i;
	for (i = 0 ; s[i] != '\0'; i++)
		;	
	return i;
}
```



### 2) Changing a string to all uppercase

```c
#include <ctype.h> /* e.g. tolower, isalpha, isdigit */ 

void str_uppercase(char s[]) {
	size_t i;
	for (i = 0; s[i] != '\0'; i++)
		s[i] = toupper(s[i]);
}

test: 
	i) str_uppercase("hello"); 

    >> segmentation fail
    /* X WRONG; Can't change string constant; Leads to undefined behaviour */

	ii) char s[] = "hello";
			str_uppercase(s);
		
    /* Works fine; */
```



### 3) Looking for a character in a string

```c
size_t str_find(const char s[], int x) {
  size_t i;
  for (i = 0; s[i] != '\0'; i++) {
    if (s[i] == x)
      return i;
  }
  return -1;
}	
```

- Why is x declared as an int? 
- Traditionally, It turns out that e.g. 'a' has type int in C.
- C does not specify the exact size of the types in, long, float, double, ... (it can be different by each machine)
- However, there is a sizeof operator that can be used to find out the sizes of types of objects.
- By definition, sizeof(char) is 1 byte.

```c
#include <stdio.h> 

int main(void) {
    printf("%lu\n", (unsigned long) sizeof(char)); >> 1
    printf("%lu\n", (unsigned long) sizeof('a')); >> 4
}
```

- 'a' is not char type, it is int type. you can check the size



### 4) Copying a string

```c
void str_copy(char dest[], const char src[]){
	size_t i;
  for (i = 0; src[i] != '\0'; i++) 
    dest[i] = stc[i];
  dest[i] = '\0'; /* or: dest[i] = src[i]; */
}
```

- The for loop stops when `src[i] == '\0'` we need to manually assign the last element as `'\0'`.
- This is a dangerous function (Overflow destination might happen).
- The programmer is responsible for ensuring that the `dest[]` is large enough to stroe the `src` string.

```c
ef. 
  char s[10];
	strcpy(s, "hello"); /* OK */
	strcpy(s, "hello world!"); /* NOT OK; compiler doesn't tell you it's WRONG */ 

"!s is not large enough!"
```

- Note: ANSI C does not support variable length array

- ```c
  ef.
  	char s[strlen("hello world!") + 1]; /* is NOT allowed! */
  	size_t n = 100;
    char s[n]; /* NOT allowed */
  ```



## Some string functions in the standard C library 

```c
#include  <string.h>
1) length of string: size_t strlen(const char s[]);

2) string comparison: int strcmp(const char s1[], const char s2[]);
	/* returns 0 if s1 and s2 are equal. */ 
  /* it returns a negative value if s1 is less than s2 in lexicographical order */
  /* it returns a positive value if s1 is greater than s2 in lexicographical order */
ef. strcmp("hello", "world") is < 0
		strcmp("world", "hello") is > 0
  
-- We may need this when we are testing our functions
ef.
	char s[] = "hello";
	str_uppercase(s);
	CHECK(strcmp(s. "HELLO") == 0);

3) copying a string: strcpy(dest, src);
  /* caller is responsible for ensuring dest in large enough. */
  char s[100];
	strcpy(s, "hello");
  /* Overflow destination danger */

-- safer version: strncpy(dest, src, n); /* number of characters to copy */
	char dest[10];
	strncpy(dest, "hello world!", 10); 
/* does not overflow dest but, there's no character at the end of dest */
	dest[9] = '\0'; /* put '\0' at the end manually in case the buffer is not large enough */

-- safe way to call strncpy;
	char s[N]; /* N: some positive integer */
	strncpy(s, src, N-1);
	s[N-1] = '\0';
/* you still have to remember that there's s possibility that only a part of src is copied to s */
```



