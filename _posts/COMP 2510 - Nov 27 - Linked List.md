# Singly–Linked Lists

-   A linear data structure consisting of nodes where each node has pointer to the following node. The pointer is null in the last node.
-   The head pointer points to the first node in the list & can be used to represent the list
-   

![Linked List](/Users/haejoonchoi/SynologyDrive/BCIT/COMP 2510 - Proced. Prog/COMP 2510 - Nov 27 - Linked List.assets/Linked List.svg)



### Example: List of integers

```c
typedef struct node node;
struct node { /* type of node in list */
  int data;
  node * next;
};

int main (void) {
	node * head = 0; /* empty list */
} 
```



## Operations on lists

1.  Adding data to a list
2.  Removing data from a list
3.  Traversing a list
4.  Detroying a list