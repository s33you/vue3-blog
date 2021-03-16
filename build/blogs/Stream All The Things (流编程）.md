::: title Stream All The Things (流编程）
### 缓冲和流

#### 等待输入完毕程序再做处理
```
sequenceDiagram 
participant program as 程序
participant buffer  as 缓冲区
participant customer as 消费者

program->>buffer:接受h e l l o 
Note left of program:t1
program->>buffer:接受 ,nodej
Note left of program:t2
program->>customer:组合完毕 ,发给消费者
```

#### 流处理
```
sequenceDiagram 
participant program as 程序
participant buffer  as 缓冲区
participant customer as 消费者

program->>buffer:接受h e l l o 
program->>customer:发给消费者
Note left of program:t1
program->>buffer:接受 ,nodej
program->>customer:发给消费者
Note left of program:t2

```
这样的处理方式的优点，可以从两个维度来分析

1.空间维度  
2.时间

#### 空间效率

首先显而易见的是，如果当所有信息接受完，我们再让程序做处理，那么会发生这样的情况，当数据足够大时，我们的buffer 空间开销是不可估量的，而且node 的限制，缓存区最大不能超过 0x3FFFFFFFbytes,约等于1GB。内存溢出等问题接踵而来

**实例:实现GZIP**



