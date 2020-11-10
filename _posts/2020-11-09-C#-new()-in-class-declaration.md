---
layout: post



title: C# new() in Class Declaration



date: 2020-11-09 15:41:31 -0700



description: You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)



img: # Add image post (optional)



tags:  # add tag




---



# C# new() in Class Declaration



C#으로 프로그래밍을 하다 보니, new() 라는 Generic type constraint 키워드가 있다. 



```C#
class ItemFactory<T> where T : new()
{
    public T GetNewItem()
    {
        return new T();
    }
}
```

이런 식으로 클래스 정의 마지막 부분에 new() 라고 붙거나, 아니면 



```c#
public class ItemFactory2<T>
    where T : IComparable, new()
{  }
```



위와 같이 new()를 contraints 중의 하나로 붙일 수도 있는 모양이다. 



Microsoft 의 .NET Documentation에 따르면, 

> `new` 제약 조건은 제네릭 클래스 선언의 형식 인수에 공용 매개 변수가 없는 생성자가 있어야 함을 지정합니다. `new` 제약 조건을 사용하기 위해 유형을 추상화할 수 없습니다.

라고 적혀있다. 



조금 풀어서 설명하자면,  제너릭 클래스, 즉 여기서 T 클래스는 파라미터가 없는 constructor, 즉 `T()` 로 표현되는 생성자가 있어야 한다는 말이다. 



예를 들어 실제로 ItemFactory가 Cat이라는 클래스를 Generic 대신에 실제로 받았다고 가정 할 때, 아래와 같은 코드가 될 텐데, 

```C#
class ItemFactory<Cat> where Cat : new()
{
    public Cat GetNewItem()
    {
        return new Cat();
    }
}
```



Cat 클래스는 

```c#
class Cat {
    public Cat(){
        ...
    }
}
```

이런 식으로 아무 parameter가 없는 contructor를 가져야 한다는 말이고,  그러면 `Cat()`이 반드시 존재하게 되므로 예시에서 나온 `return new Cat();`를 안전하게 사용 할 수 있게 된다. 



`new()` 제한조건의 경우에는 만약 다른 제한 조건들과 함께 사용되면 반드시 맨 마지막에 위치해야 한다고 한다. 

```C#
public class ItemFactory2<T>
    where new(), T : IComparable // 불가능
{  }

public class ItemFactory2<T>
    where T : IComparable, new()  // new() 가 마지막으로 오게 할 것. 
{  }
```





[참조]: https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/new-constraint?source=docs	"new constraint (C# Reference)"

