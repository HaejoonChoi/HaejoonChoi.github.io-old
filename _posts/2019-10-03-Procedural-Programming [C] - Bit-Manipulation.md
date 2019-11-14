---
layout: post



title: Procedural Programming [C] - Bit Manipulation



date: 2019-10-03 14:14:00 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag



---



# Bit Manipulation

-   `~`: complement -> flip bits (0 <-> 1)
-   `<<`: left shift
-   `>>`: right shift
-   `&`: AND
-   `|`: OR
-   `^`: XOR



-   123 - decimal
-   `0`123 - octal
-   `0x`123 - hexadecimal



### Typical questions:

-   Assume 16-bit unsigned short:

    -   unsigned short `n = 0xA2B3`
    -   Find `~n` in hexadecimal

    ```c
     n = 0xA2B3 = 1010 0010 1011 0011
    ~n =        = 0101 1101 0100 1100 = 0x5D4C
    ```

    ```c
    unsigned short a = 0x3a6d;
    Find ~a in hexadecimal
     a = 0x3a6d = 0011 1010 0110 1101
    ~a =        = 1100 0101 1001 0010 = 0xc592
    ```

    

-   `<<`: Left Shift (always shifts in 0s) (corresponding to "multiplication by 2")

    ```c
    unsigned short n 
    	 = 0xA2B3;
    	 = 1010 0010 1011 0011
    n<<3 = 0001 0101 1001 1000 = 0x1598
    ```

    ```c
    unsigned short a
    	 = 0x3a6d;
    	 = 0011 1010 0110 1101
    a<<3 = 1101 0011 0110 1(000) = 0xd368
    ```

    

-   `>>`: Right Shift

    -   Shifts in `0`s for unsigned types
    -   "           " for non-neg. values in signed types for negative values (signed types) which may shift in either 0's or 1's

    ```c
    unsigned short n 
    	 = 0xA2B3;
    	 = 1010 0010 1011 0011
    n>>3 = 0001 0100 0101 0110 = 0x1456
    ```

    ```c
    unsigned short a
    	 = 3a6d;
    	 = 0011 1010 0110 1101
    a>>3 = 0000 0111 0100 1101 = 0x074d
    ```



-   `&`: AND – `1` if both bits are `1`; otherwise `0`

-   `|`: OR – `0` if both bits are `0`; otherwise `1`

-   `^`: XOR – `1` if bits are different; otherwise `0` 

    ```c
    unsigned short m, n
    m = 0x9C3F 1001 1100 0011 1111
    n = 0xA2B3 1010 0010 1011 0011
    m&n 	 = 1000 0000 0011 0011 = 0x8033
    m|n      = 1011 1110 1011 1111 = 0xBEBF
    m^n      = 0011 1110 1000 1100 = 0x3E8C
    ```

    ```c
    unsigned short a, b
    a = 0x3a6d = 0011 1010 0110 1101
    b = 0xc7b6 = 1100 0111 1011 0110
    a|b 	   = 1111 1111 1111 1111 = 0xffff
    a&b        = 0000 0010 0010 0100 = 0x0224
    a^b        = 1111 1101 1101 1011 = 0xfddb
    ```

    

### Variants – Assign back to the variable on the left

-   `~=`: complement -> flip bits (0 <-> 1)
-   `<<=`: left shift
-   `>>=`: right shift
-   `&=`: AND
-   `|=`: OR
-   `^=`: XOR



### How do we find the last m bits of n? 

Ex) 

1.  to find the last 3 bits of n: `n & 0000 0000 0000 0111 = n & 0x7`

2.  to find last m bits of n: `n & 0...0 1...1(m)`

    `1...10...0(m) = 1...1 << m = ~0x0 << m `

    ∴ last m bits of n: `n & ~(~0x0 << m)`

