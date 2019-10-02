---
layout: post



title: Procedural Programming [C] - Standard Idioms



date: 2019-09-25 14:12:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  C, programming # add tag
---

# Arrays

## Standard idioms to process an array (for loop)

```c
T a[N]; /* T = type of the array, a = name of array, N = positive integer */
size_t i; /* size_t = type to store sizes, it is some unsigned integer type */ 

for (i = 0; i < N; i++) {
  /* process a[i] */
}
```





# Strings

## Standard idiom to precess a string

- Assume `s[]` is the string we want to process

```c
size_t i;
for (i = 0, i != '\0'; i++)
  Process s[i];

/* Note: this does not process the null character */
```





# Command-line Arguments

## Standard Idiom to process command-line arguments

```c
int main (int argc, char *argv[]) {
  int i;
  for (i = 1 /* (or 0) */; i < argc; i++) {
    /* process argv[i] */
  }
}
```





# Input / Output (I/O)

### Standard idiom to process stdin character by character

```c
int c;
while ((c = getchar()) != EOF) 
	/* process C */
```



### Standard idiom to process stdin line by line

```c
#define LINESIZE 24
char line[LINESIZE];
while (fgets(line, LINESIZE,stdin)) /* as long as we can read a line */
  /* process line */
```





# File I/O (fopen, fclose, fprintf, fscanf, etc.)

3 steps:

1. Open the file
2. Perform I/O (on the stream returned by opening the file)
3. Close the file (close the stream, actually)

### Opening a file

#### Standard idiom to open a file 

```c
FILE *fp; /* fp = file pointer */     
	if ( fp = fopen(filename, mode) == 0) {
    /* 0 means null pointer = fopen failed */ 
    perror("fopen");
    /* additional error-handling if needed */
  }
```



### Closing a file

This disassociate the stream with the file.

#### Standard idiom to close a file 

```c
if (fclose(fp) != 0) { /* fclose failed */ 
	perror("fclose");
	/* additional error-handling if needed */
}
```



### functions that use the file position indicator

#### Standard idiom for `fseek`

```c
if(fseek(fp, offset, whence) != 0) { /* fseek failed */
	perror("fseek");
	/* additional error-handling if needed */
}
```

