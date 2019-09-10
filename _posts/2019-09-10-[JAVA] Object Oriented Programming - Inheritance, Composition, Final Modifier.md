---

layout: post

title: [JAVA] Object Oriented Programming -  Inheritance, Composition, Final Modifier

date: 2019-09-10 14:53:00 -0700

description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)

img: haroopad.png # Add image post (optional)

tags:  # add tag

---





## 2019-09-10 Object Oriented Programming Inheritance



## Composition

- Composition = When you compose a new class using other class objects



## Inheritance

- All classes inherit from the class Object explicitly or implicitly

- To inherit from a class you use the keyword "extends" as in "class B extends A"

- All members of the class you extend are inherited, including private members

- `Dog extends Animal`

  - All dogs are animals, all dogs will inherit all the attributes from Animal

  - ```java
    Dog d = new Dog();
    Animal a = new Animal();
    a = d;
    d = (Dog)a;	
    ```

  - d (Dog) is certainly included in a (Animal), so you can assign it 

  - a (Animal) is not guaranteed to be d (Dog), so you should cast it 

- Even though you use more general reference for the object, the object possess its own properties. 

  ```java
  class Animal {
  	public void draw(){
  		System.out.println("animal");
  	}
  }
  class Dog extends Animal {
  	public void draw(){
  		System.out.println("dog");
  	}
    public void bark(){
      System.out.println("bark");
    }
  }
  public class Casting {
  	public static void main(String[] args){
  		Dog d = new Dog();
  		Animal a = d;
  		a.draw();
      a.bark(); // X can't be done because Animal doesn't have a method "bark"
      ((Dog)a).bark(); // O this will work because it will specify 'a' is a Dog among Animal. 
  	}
  }
  
  >> dog
  ```



- Abstract classes 

  ```java
  abstract class Animal { 
    	// It's possible to declare and also define methods in an abstract class
  	public abstract void draw();
    public void move(){
      System.out.println("move animal");
    }
  }
  public class Casting {
    public static void main(String[] args){
  		Animal a = new Animal(); // impossible, because Animal is abstract class and that means it's impossible to make an object from it.
      Animal a = new Dog(); // possible, because Dog is an instantiable class
      Animal a; // possible, because it's only assigning a pointer (address) to an abstract class.
    }
  }
  ```

  

## Composition  vs. Inheritance

- Use composition when you need objects from other classes but not their interfaces
- Use inheritance when you wish to create a specialized version of something



## Using Final modifier

```java
public class Final {
	public static void swap(final Object a, final Object b){ 
    // final is used to prevent the problem that you try to do something that cannot be done.
		Object temp = a;
		a = b;
		b = temp;
	}
	public static void main(String[] args){
		String x = "Hello";
		String y = "Goodbye";
		swap(x,y);
		System.out.println(x);
	}
}

>> Hello
```

- this is very hard to find because it compiles, it runs, but it doesn't do what you want. 



## What if I actually want to do that?

```java
public class Final_that_works {
	public static void swap(Object[] values, int a, int b){ 
		Object temp = values[a];
		values[a] = values[b];
		values[b] = temp;
	}
	public static void main(String[] args){
		String[] test = new String[2];
		test[0] = "hello";
		test[1] = "goodbye";
		swap(test, 0, 1);
		System.out.println(test[0]);
	}
}

>> goodbye
```

- Put objects into an array and changing the order of object in the array

  

## Final methods

- Prevents subclasses (those that inherit the method) from changing it's meaning
- Final methods are more efficient because it doesn't allow overwriting the method by subclasses
