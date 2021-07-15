[TOC]

# java.lang

> wrapper, Object, String, StringBuffer, StringBuilder, System, Math

## Wrapper

> 기본형 타입들을 객체 형태로 변형 시켜주는 클래스

```java
public class WrapperExam {

	public static void main(String[] args) {
		int i = 5;
		Integer i2 = new Integer(5);
		
		Integer i3 = 5; // 자동으로 Integer로 변환해서 넣어준다. 오토박싱
        
        int i4 = i3.intValue(); // java5 이전에는 이렇게 해야했다.
		
		int i5 = i3; // 오토 언박싱, 객체 타입의 데이터를 기본형 타입 데이터로 자동 형변환
	}

}

public class WrapperExam {
    public static void main(String[] args) {
        int i = 5; 
        Integer i2 = new Integer(5);
        Integer i3 = 5;                      //오토박싱
        int i4 = i2;                         //오토언박싱
        long i2_long = i2.longValue();
        long i4_long = i4.longValue();       // 오류 발생! 
        // i2는 Integer형이므로 longValue() 메소드 사용 가능, i4는 int형이라 메소드 사용 불가능
    }
}
```



## StringBuffer

```java
public class StringBufferExam {

	public static void main(String[] args) {
        // 메소드 체이닝 : 자기자신을 계속 리턴하여 자신의 메소드를 호출하는 방식
		StringBuffer sb = new StringBuffer();
		
		sb.append("hello");
		sb.append(" ");
		sb.append("world");
		
		String str = sb.toString();
		System.out.println(str); //hello world
		
		StringBuffer sb2 = new StringBuffer();
		StringBuffer sb3 = sb2.append("hello");
		if(sb2 == sb3)
			System.out.println("sb2==sb3"); // sb2 == sb3
		String str2 = new StringBuffer().append("hello").append(" ").append("world").toString();
		System.out.println(str2); // hello world
	}

}
```



## String 클래스의 문제점

> str을 그냥 더하면 StringBuffer를 new로 생성해서 성능이 떨어진다.

```java
public class StringExam2 {

	public static void main(String[] args) {
		String str1 = "hello world";
		String str2 = str1.substring(5);
		System.out.println(str1); // hello world
		System.out.println(str2); // world
		
		String str3 = str1 + str2;
		System.out.println(str3); // hello world world
		
		String str4 = new StringBuffer().append(str1).append(str2).toString();
		// str3 = str1 + str2을 하면 내부적으로 다음과 같이 StringBuffer가 새로 생성된다.
		System.out.println(str4);
		
		String str5="";
		for(int i = 0; i<100; i++) {
			str5 = str5 + "*"; // 100번동안 String Buffer를 생성한다.
		}
		System.out.println(str5);
		
		StringBuffer sb = new StringBuffer();
		for(int i = 0; i<100; i++) {
			sb.append("*");
		}
		String str6 = sb.toString();
		System.out.println(str6);// 성능면에서 스트링 버퍼가 좋다.
		
	}

}
```



## Math

```java
public class MathExam {

	public static void main(String[] args) {
		int value1 = Math.max(5, 30); 
		System.out.println(value1); // 30
		int value2 = Math.min(5, 30); 
		System.out.println(value2); // 5
		System.out.println(Math.abs(-10)); // 10
		
		System.out.println(Math.random()); // double type으로 return 0.0~1.0
		System.out.println(Math.sqrt(25)); // 5.0
        System.out.println("2의 10승 = " + Math.pow(2, 10)); // 2의 10승 = 1024.0
        System.out.println("16의 1/2승 = : " + Math.pow(16, 0.5)); // 16의 1/2승 = : 4.0
        System.out.println("log200 = " + Math.log10(200)); // log200 = 2.3010299956639813
	}

}
```

