---
title: python
tags:
  - python
cover: https://t.alcy.cc/ycy
date: 2025-02-09 13:10:24
---

-  
# python 基础知识点





### 标识符规则


1字母数字下划线汉字不能开头


2不能是保留字

### 变量

### input()输入

```python
a=input()
print(type(a))	//class

a=eval(input())	
print(type(a))	//int

```


### print()输出/打印

```plaintext
a=1
b=2
print(a)
print(b)	//a
			  b
			  
a=1
b=2
print(a,end=&#x27;&#x27;)
print(b)		// a b

```


# 数字类型

### 整数	int

### 浮点数	float

```plaintext
a = 1.0
b = 2.0
c = a+b
print(c)
>>>0.3

a = 0.1
b = 0.2
c = a+b
print(c)
>>>0.30000000001
#浮点数的计算不一定准确可能会产生很小的误差

```


### 复数

```python
c = 3+4j
print(c.real)
print( c.imag)
>>>3.0 4.0		//复数值都为浮点型

```


### 运算符

> 


加减乘除 + - * /




```plaintext
a = 4/2
print(a)
>>>2.0 	使用/后会得到浮点数

```


> 


取整	//


取余	%


复合赋值运算+=，-=

```plaintext
a += 1 等价于 a = a +1
a -= 1 等价于 a = a -1

```



**相关函数**


abs	取绝对值

```plaintext
a = 3 + 4i		复数结果为浮点数类型
print(abs(a))	
>>>5.0

```



round(a,n)	浮点数取精度位

```plaintext
a = 3.1414141
print(round(a))		##精确到整数位
>>> 3

a = 3.1414141
print(round(a,3))		##保留位数
>>> 3.141

```





max/min()	求最大/小值

```plaintext
a = ( 43,545,54,46,02)
print(max(a))		
>>>545

a = ( 43,545,54,46,02)
print(min(a))		
>>>2

```





### 序列类型

### 字符串S

> 


s = “恭喜发财”




### 元组t

> 


t = (‘恭’，‘喜’，‘发’，‘财’)




### 列表ls

> 


ls = [‘恭’，‘喜’，‘发’，‘财’]





| 


| -4 
| -3 
| -2 
| -1 




| 恭 
| 喜 
| 发 
| 财 



| 0 
| 1 
| 2 
| 3 




#### 索引

> 

```plaintext
print(s[1])
print(s[-3])		##索引
>>> 喜
	喜

```



#### 切片

> 


切出一段内容


[起始位置(**包含**)：终止位置(**不包含**):步长]

```plaintext
print(s[1:4])
print(t[1:4])
print(ls[1:4])
>>>
喜发财 f
(&#x27;喜&#x27;,&#x27;发&#x27;,&#x27;财&#x27;)
[&#x27;喜&#x27;,&#x27;发&#x27;,&#x27;财&#x27;]

```



**步长**

```plaintext
print(s[0:3:2])
>>>恭发
print(s[0:3:2])

```



#### 集合与字典

> 


#**集合**
s = {1,2,3,4,5}


1.不允许存在重复内容

```python
s = &#123;1,2,3,4,5,7,7,7&#125;
print(s)
>>> &#123;1,2,3,4,5,7&#125;

```



2.添加-**add**

```plaintext
s = &#123;1,2,3,4,5&#125;
s.add(8)
print(s)
>>>&#123;1,2,3,4,5,8&#125;

```



3移除-remov

```plaintext
s = &#123;1,2,3,4,5&#125;
s.remov(5)
print(s)
>>>&#123;1,2,3,4&#125;

```



4清空-clear

```python
s = &#123;1,2,3,4,5&#125;
s.clear
print(s)
>>> set&#123;&#125;	特指空集合

```



#**字典**


key : value


d = {“名字”:“张三”，”年龄”:23,”分数”:60}

```python
d = &#123;"名字":“张三”，"名字":“张三”，”年龄":23,"分数":60&#125;
print(d)
>>>"名字":“张三”，”年龄":23,"分数":60

```



1.添加键值对

```plaintext
d = &#123;"名字":“张三”，”年龄":23,"分数":60&#125;
d[&#x27;性别&#x27;] = ‘男’

```



2.查找

```plaintext
#索引
print(d[&#x27;分数&#x27;]) 

```



3.修改

```plaintext
d [&#x27;年龄&#x27;] = 18

```



4.删除

```plaintext
del d[&#x27;名字&#x27;]

```


```plaintext
d.pop(&#x27;名字&#x27;)

```



## 分支与循环结构

#### 运算符

> 


比较运算符 

> 

> 








l逻辑运算符

> 


| 


| and 
| 全真 




| or 
| 真假 



| not 
| 全假 










### 分支结构

#### 分支结构

> 


**if	单分支**

```py
n = eval(input)
if n%2==0:
	print("偶数")

```



**if	else	双分支**

```py
n = eval(input)
if n%2==0:
	print("偶数")
else：
	print("奇数")

```



if	elif	else	多分支

```py
n = eval(input())
if	n > 90:
	print("优秀")
elif n > 70:
	print("良好")
elif n > 60:
	print("及格")
else：
	print("不合格")

```



#### 循环结构

> 


for	遍历循环

> 

```py
#循环字符串
s = &#x27;恭喜发财&#x27;
for b in s:
 print(b)
>>> 恭
	喜
	发
	财	

```



#range函数(左边包括，右边不包括)

```py
#数字循环
for i in range(1,6):
	print(i)
>>>	1
	2
 3
 4
 5

```




while	条件循环

> 

```plaintext
n = 1
while n < 5:
 n+=1
 print(n)	#注意条件变量，不要写死循环

```








### 函数

> 

##### 定义

```py
def add (x,y=3):	#默认参数，必须在后面
	s = x + y
	print(S)

```


##### 调用

```py
add(3,5)	#位置参数
add(x = 3,y = 5)	#关键字参数
>>>8

```


##### return

```py
返回函数
def add (x,y):
	s = x + y
	return s	

n = add (3,7)
print(n)

```


##### global

```plaintext
s = 0	
def add (x,y):
	globla s	局部变量>全局变量
	s = x + y	
	print(S)
add(3,7)
print(s)

```





### 文件

> 

##### open  函数

##### 指定编码参数

> 

##### enconding = ‘uef-8’




```py
f = open("文件名","r","w")

```


###### read()	读取

```plaintext
print(f.read)		全部读取
print(f.readlines)	按行读取

```



**写入**

```py
f = open("文件名","w")		
print(f.write("恭喜发财"))	#覆盖写入文件文件，并非追加
f.close()	#关闭文件

```



## 标准库

### tuetlr库

> 

#### 导入方式

```plaintext
import turtle
turtle.fd(200)

```


```plaintext
import turtle as t
t.fd(200)

```


```plaintext
import turtle import *
fd(200)

```


#### 常用函数

> 

##### 前进

```plaintext
import turtle
turtle.fd(200)

```


##### 后退

```plaintext
import turtle
turtle.fd(—200)

```


```plaintext
left()	#左旋转
right()	#右旋转
Seth()	#朝向

```



##### pensize() 	#设置画笔粗细

```plaintext
pensize(10)		

```


```plaintext
import turtle
#设置填充色
turtle.color(&#x27;bule&#x27;,&#x27;red&#x27;)
#三角形
turtle.begin_fill()
for i in range (3):
	turtle.fd(200)
	turtle.left(120)
turtle.end_fill()	#结束填充色

```


##### goto	#移动到

```py
import turtle
turtle,fd(100)
turtle.goto(192,242)


```