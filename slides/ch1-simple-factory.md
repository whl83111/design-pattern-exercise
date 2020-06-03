---
title: 簡單工廠模式
description: 大話設計模式 Chapter.1
---
<style>
.reveal h1 {
  font-size: 68px;
  color: #31d6f7;
}

strong {
  color: #31d6f7;
}

.reveal pre code {
    max-height: 90%;
}
</style>

# 簡單工廠模式

---

# 範例: 計算機

----

```csharp=
public class Operation
{
    private double _numberA = 0;
    private double _numberB = 0;
    
    public double NumberA
    {
        get { return _numberA; }
        set { _numberA = value; }
    }
    
    public double NumberB
    {
        get { return _numberB; }
        set { _numberB = value; }
    }
    
    public virtual double GetResult()
    {
        double result = 0;
        return result;
    }
}
```

----

```csharp=
public class OperationAdd : Operation
{   
    public override double GetResult()
    {
        double result = 0;
        result = NumberA + NumberB;
        return result;
    }
}

public class OperationSub : Operation
{   
    public override double GetResult()
    {
        double result = 0;
        result = NumberA - NumberB;
        return result;
    }
}
```

Note:
乘法和除法相同寫法不詳述

----

```csharp=
public class OperationFactory
{   
    public static Operation createOperate(string operate)
    {
        Operation oper = null;
        switch (operate)
        {
            case "+":
                oper = new OperationAdd();
                break;
            case "-":
                oper = new OperationMinus();
                break;
            case "*":
                oper = new OperationMul();
                break;
            case "/":
                oper = new OperationDiv();
                break;
        }
        return oper;
    }
}
```

----

```csharp=
// client

Operation oper;
oper = OperationFactory.createOperate("+");
oper.NumberA = 1;
oper.NumberB = 2;
double result = oper.GetResult();
```

Note:
- 需要修改加法功能: 單獨修改 `OperationAdd` 即可
- 增加功能: 增加 `Operation` 子類別 & `OperationFactory.createOperate` swtich 新增分支

---

# UML

![](https://i.imgur.com/iu8DpeO.jpg)

Note:
簡單工廠：用一個單獨的類別來做創造實體的過程

---