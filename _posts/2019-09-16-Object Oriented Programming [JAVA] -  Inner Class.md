---
layout: post

title: Object Oriented Programming [JAVA] -  Inner Class

date: 2019-09-16 12:23:00 -0700

description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)

img: # Add image post (optional)

tags:  # add tag


---



```java
public class Egg {
	private int x;
  class Yolk {
  	public void setX(int value) {
  		x= value;
  	}
  }    
}

Egg e = new Egg(); // valid.
Yolk y = new Yolk(); // invalid. You can't instantiate an inner class independently.


```



```java
public class Egg {
	private int x;
  private Yolk yolk = new Yolk();
  class Yolk {
    public int y;
  	public void setX(int value) {
  		x= value;
  	}
  }    
  public void setY(int value){
    yolk.y = value;
  }
  public static void main (String[] args) {
    Egg e = new Egg();
    Yolk y = new Yolk(); // impossible.. it should belong to a certain egg.
    Yolk y = e.new Yolk(); // referencing object e to create a yolk.

    e.setY(5);
  }
}
```

