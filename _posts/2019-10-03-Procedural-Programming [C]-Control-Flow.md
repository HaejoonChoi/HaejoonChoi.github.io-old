---
layout: post



title: Procedural Programming [C] - Flow Control



date: 2019-10-03 14:14:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag




---



# Flow Control

### 1) if / else if / else

```c
if(argc == 1){
	...
} else if (argc == 2){
	...
} else {
    ...
}
```



### 2) switch / case

```c
char choice = get_choice();
switch(choice){ /* must be a integer type */
	case 'y' : case 'Y':
		...
		break;
	case 'n' : case 'N':
		...
		break;
	default:
		...
}
```



-   ##### Ask yourself:

    1.  how many times is the loop run?

    2.  what is printed the first time?

        

### 3) For Loop

```c
for (initialization; test to continue; update) {
	body
} 

/*ex. */
for (i = 0; i < 10; i++) {
    printf("%d", i*i);
}

/************  VS  ************/

i = 0;
while(i < 10){
    printf("%d", i*i);
	i++;
}
```



### 4) while (4 types)

```c
1) 
int n = 1;
while(n++ < 5)
	printf("%d", n);
>> 2345

2) 
int n = 1;
while(++n < 5)
    printf("%d", n);
>> 234

3) 
int n = 1;
while (n < 5)
    printf("%d", ++n);
>> 2345

4) 
int n = 1;
while (n < 5)
    printf("%d", n++);
>> 1234
    

/* 
|||||||||||++n vs n++|||||||||||
 ++n : value AFTER incrementing
 n++ : value BEFORE incrementing
||||||||||||||||||||||||||||||||
*/
```



### 5) Do while

```c
do {
	... /* exe. at least once */
} while (...);
```



### 6) goto

If you use goto a lot, you will jump around a lot. This will lead to "spaghetti code". Must be in the same function. 

```c
/* code */
	goto label;
label: /*code */
```



```c
Standard way to use goto - for code cleanup
if(...)
	goto cleanup;

cleanup:
...
```



### 7) break / continue 

-   `Continue` must be used inside a loop
-   `break`, except for switch statements, must also be inside a loop

```c
while(...) {
	if(...) break;		// the break statement will send you to outside of the while loop. Stops loop.
		/*code*/
	if(...) continue;	//continue will send you to the end of the loop.
		/* code */
}
```

### Example

```c
int n = 3;
while(n < 10) {
	if(n % 2 == 0)
		continue;		
/* sends you to after the printf statement. This is an infinite loop */
	printf("%d", ++n);	
/* because n is never updated */
}
```

```c
Same as above but in a for-loop

for (n = 3; n < 10; n++) {	
/* This is not an infinite loop */
	if( n % 2 == 0)
		continue;
	printf("%d", n);
}
```

*Prefer for-loops over while-loops



### Standard idiom to process an array backwards

```c
T a[N]; /* T: type, N: some positive integer */
size_t i;
for (i = N; i > 0; i--) {
    /* process a[i-1] */
}
```



##### Example: to check if two strings are palindromes

```c
int is_palindrome(const char[]){
	size_t i;
    for (i = 0, j = strlen(s); i<j; i++, j--){
        if (s[i] != s[j-1]){
            return 0;
        }
    }
    return 1;
}
```

