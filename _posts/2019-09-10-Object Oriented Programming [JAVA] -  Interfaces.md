---
layout: post

title: Object Oriented Programming [JAVA] -  Interfaces

date: 2019-09-10 15:53:00 -0700

description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)

img: # Add image post (optional)

tags:  # add tag


---



- Java doesn't allow multiple inheritance (can't extend two or more classes)

```java
Class A{
  int x;
	public void foo() {...}
}

Class B{
  double x;
	public void foo() {...}
}

Class C extends A, B{ // this is impossible 
	// Problem.1 You don't know which foo() you're using.
  // Problem.2 You don't know which variable x you're using. 
  A a; // You can reference interfaces
}
```



### We can use intefaces instead!

```java
// interfaces are automatically public. 
// "What use if interfaces are not public when it's just a remote controller?"
interface Car (
	void drive();
)

interface Boat (
	void sail();
)

class Vehicle (
	public void turn() {
		System.out.println("Turning vehicle");
	}
	public void sail() {
		System.out.println("sail on water")
	}
)
  
class Porche extends Vehicle implements Car {
  public void drive() {
    System.out.println("drive very fast - ZOOOM!!");
  }
}
public class Transportation {
  public void testDrive(Car c){
    c.drive();
  }
  public void testSail(Boat b) {
    b.sail();
  }
  public void testTurn(Vehicle v) {
    v.turn();
  }
  public static void main(String[] args){
    
  }
}
```

