---


layout: post



title: Procedural Programming [C] - Precedence & Associativity



date: 2019-10-10 14:16:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag

---

# Precedence & Associativity

They determine how terms are grouped.

```c
while ((c = getchar()) != EOF) 
    ....
```

-   ​        `c = getchar() != EOF` ≣ `c = (getchar() != EOF)` 

    -    `!=` has higher precedence than `=`

-   `a + b * c ≣ a + (b * c)` 

-   `a + b + c ≣ (a + b) + c`

    

    ## `*p++` Is this `(*p)++` or `*(p++)`??

-   `*` and `++` are on the same precedence level; they associates from right to left.

    ∴ `*p++ ≣ *(p++)`

    -   Note: precedence & associativity have nothing to do with order of evaluation.



## &&, || 

-   They are short-circuit operators

    -   `a && b`
    -   `a || b`
    -   `a` must be evaluated first

    ```c
    Examples 
    1) 
    int a = 1, b = 0, c = 2;
    c = --a && ++b; /* --a == 0, ++b is short-circuited (not evaluated) */
    printf("%d %d %d", a, b, c); /* >> 0 0 0 */
    
    2)
    int a = 1, b = 0, c = 2;
    c = a-- && ++b;
    printf("%d %d %d", a, b, c); /* >> 0 1 1 */
    
    3)
    int a = 1, b = 0, c = 2;
    c = --a || ++b;
    printf("%d %d %d", a, b, c); /* >> 0 1 1 */
    
    4)
    int a = 1, b = 0, c = 2;
    c = a-- || ++b; /* a-- is 1, ++b gets short-circuited */
    printf("%d %d %d", a, b, c); /* >> 0 0 1 */
    ```

    -   `++n` : value of it is value of n **after** incrementing
    -   `n++` : value of it is value of n **before** incrementing



