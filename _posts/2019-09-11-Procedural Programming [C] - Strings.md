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

```c
1) length of string

size_t str_length(const char s[]) {
	size_t i;
	for (i = 0 ; s[i] != '\0'; i++)
		;	
	return i;
}

2) Changing a string to all uppercase

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



