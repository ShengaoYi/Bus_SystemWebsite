# 禁忌搜索算法

![index](https://i.loli.net/2021/04/26/BH6YKuaQXDSEpoM.png)

禁忌（Tabu Search）算法是一种亚启发式(meta-heuristic)随机搜索算法，它从一个初始可行解出发，选择一系列的特定搜索方向（移动）作为试探，选择实现让特定的目标函数值变化最多的移动。为了避免陷入局部最优解，TS搜索中采用了一种灵活的“记忆”技术，对已经进行的优化过程进行记录和选择，指导下一步的搜索方向，这就是Tabu表的建立。

 

 

**算法流**

![details](https://i.loli.net/2021/04/26/TcS7ydztslPXYVx.jpg)

在搜索中，构造一个短期循环记忆表-禁忌表，禁忌表中存放刚刚进行过的 |T|（T称为禁忌表）个邻居的移动，这种移动即解的简单变化。

禁忌表中的移动称为禁忌移动。对于进入禁忌表中的移动， 在以后的 |T| 次循环内是禁止的，以避免回到原来的解，从而避免陷入循环。|T| 次循环后禁忌解除。

禁忌表是一个循环表，在搜索过程中被循环的修改，使禁忌表始终保持 |T| 个移动。

即使引入了禁忌表，禁忌搜索仍可能出现循环。因此，必须给定停止准则以避免出现循环。当迭代内所发现的最好解无法改进或无法离开它时，算法停止。

 

**参考文献**

[1]郎茂祥,胡思继.车辆路径问题的禁忌搜索算法研究[J].管理工程学报,2004(01):81-84.

[2]Gallego R A, Romero R, Monticelli A J. Tabu search algorithm for network synthesis[J]. IEEE Transactions on Power Systems, 2000, 15(2): 490-495.

[3]Fiechter C N. A parallel tabu search algorithm for large traveling salesman problems[J]. Discrete Applied Mathematics, 1994, 51(3): 243-267.