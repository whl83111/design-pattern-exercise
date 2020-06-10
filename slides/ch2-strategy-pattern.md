---
title: 策略模式 Strategy
description: 大話設計模式 Chapter.2
slideLink: https://hackmd.io/@tommy1994111/SJMdpNrnU#/
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

# 策略模式 Strategy

---

# 定義

它定義了演算法家族，分別封裝起來，讓它們之間可以**互相替換**，此模式讓演算法的變化，不會影響到使用演算法的客戶。

---

# UML

![](https://i.imgur.com/1UZXK8W.jpg)


策略模式的 Strategy 類別層次為 Context 定義了一系列的**可供複用的演算法或行為**。繼承**有助於析取出這些演算法中的公共功能**。

Note:
Context 上下文，用一個 ConcreteStrategy 來配置，維護一個對 Strategy 物件的引用。
Strategy 介面，定義所有支援之演算法的公共介面。
ConcreteStrategy 具體策略類別，包裝了具體的演算法或行為，繼承於 Strategy。

---

# 範例: Strategy 實作

```csharp=
abstract class Strategy
{
    publice abstract void AlgorithmInterface();
}

class Context
{
    Strategy strategy;
    publice Context(Strategy strategy)
    {
        this.strategy = strategy;
    }
    
    publice void ContextInterface()
    {
        strategy.AlgorithmInterface();
    }
}
```

----

```csharp=
class ConcreteStrategyA: Strategy
{
    publice override void AlgorithmInterface()
    {
        Console.WriteLine("演算法A實現")
    }
}

// ConcreteStrategyB, ConcreteStrategyC 類似實作不詳述
```

----

```csharp=
// client

static void Main(string[] args)
{
    Context context;
    
    context = newContext(new ConcreteStrategyA());
    context.ContextInterface();
    
    context = newContext(new ConcreteStrategyB());
    context.ContextInterface();
    
    context = newContext(new ConcreteStrategyC());
    context.ContextInterface();
    
    Console.Read();
}
```

Note: 由於實體化不同的策略，所以最終在調用 `context.ContextInterface()` 時，所獲得的結果就不盡相同。

---

# 範例: 收銀機

----

![](https://i.imgur.com/0u2q1AH.jpg)

----

```csharp=
class CashContext
{
    private CashSuper cs;
    
    public CashContext(CashSuper csuper)
    {
        this.cs = csuper
    }
    
    public double GetResult(double money)
    {
        return cs.acceptCash(money)
    }
}
```

----

```csharp=
// client

double total = 0.0d;
private void btnOK_Click(object sender, EventAtgs e)
{
    CastContext cc = null;
    switch (cbtType.SelectItem.ToString())
    {
        case "正常收費":
            cc = new CashContext(new CashNormal());
            break;
        case "滿 300 送 100":
            cc = new CashContext(new CashReturn("300", "100"));
            break;
        case "打 8 折":
            cc = new CashContext(new CashRebate("0.8"));
            break;
    }
    
    double totalPrice = 0d;
    totalPrice = cc.GetResult(Convent.ToDouble(txtPrice.Text)) * Convert.ToDouble(txtNum.Text);
    total = total + totalPrice;
    // ...
}

```

Note:
透落 Context 的 GetResult 方法，可以得到收取費用的結果，讓具體演算法與客戶進行了隔離。

---

# 策略與簡單工廠結合

```csharp=
class CashContext
{   

    private CashSuper cs;
    
    // 注意參數不是具體的收費策略物件，而是一個字串，表示收費類型
    public CashContext(string type)
    {
        switch (type)
        {
            case "正常收費":
                // 將實體化具體策略的過程
                // 由用戶端轉移到 Context 類別中。
                CashNormal cs0 = new CashNormal();
                cs = cs0;
                break;
            case "滿 300 送 100":
                CashReturn cr1 = new CashReturn("300", "100");
                cs = cr1;
                break;
            case "打 8 折":
                CashRebate cr2 = new CashRebate("0.8");
                cs = cr2;
                break;
        }
    }
    
    public double GetResult(double money)
    {
        return cs.acceptCash(money)
    }
}
```

----

# 用戶端程式碼比較

```csharp=
// 簡單工廠模式
CashSuper csuper = CashFactory.createCashAccept(cbtType.SelectedItem.ToString());

result = csuper.GetResult(...)

// 策略模式與簡單工廠結合
CashContext csuper = new CashContext(cbtType.SelectedItem.ToString());

result = csuper.GetResult(...)
```

簡單工廠模式需要讓用戶端認識 `CashSuper` 及 `CashFactory` 兩個類別，
策略模式與簡單工廠結合用法只需要認識 `CashContext` 一個類別，代表**耦合度降低**。

---

# 解析

策略模式是一種**定義一系列演算法**的方法，從概念上來看，所有演算法完成的都是**相同的工作**，只是**實現的不同**，他可以**以相同的方法調用所有的演算法**，減少了各種演算法類別與使用演算法類別之間的耦合。

----

策略模式的優點是**簡化了單元測試**，因為每個演算法都有自己的類別，可以透過自己的介面單獨測試。

----

當不同的行為堆砌在一個類別中時，就很難避免使用條件敘述來選擇合適的行為。將這些行為封裝在一個個獨立的 Strategy 類別中，可以在使用這些行為的類別中**消除條件敘述**。

----

策略模式就是用來**封裝演算法**的，但在實踐中，我們發現可以用它來**封裝幾乎任何類型的規則**，只要在分析的過程中聽到**需要在不同時間應用的業務規則**，就可以考慮使用策略模式處理這種變化的可能性。