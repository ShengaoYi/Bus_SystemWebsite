# 大规模邻域搜索

![index](https://i.loli.net/2021/04/26/iTRJ1kFyIl8XZon.png)

邻域搜索算法（Large Neighborhood Serach LNS）是一类非常广泛的改进算法，其在每次迭代时通过搜索当前解的“邻域”找到更优的解。 邻域搜索算法设计中的关键是邻域结构的选择，即邻域定义的方式。 根据以往的经验，邻域越大，局部最优解就越好，这样获得的全局最优解就越好。 但是，与此同时，邻域越大，每次迭代搜索邻域所需的时间也越长。

 

ALNS是从LNS发展扩展而来的，在了解了LNS以后，我们现在来看看ALNS。ALNS在LSN的基础上，允许在同一个搜索中使用多个destroy和repair方法来获得当前解的邻域。ALNS会为每个destroy和repair方法分配一个权重，通过该权重从而控制每个destroy和repair方法在搜索期间使用的频率。 在搜索的过程中，ALNS会对各个destroy和repair方法的权重进行动态调整，以便获得更好的邻域和解。简单点解释，ALNS和LNS不同的是，ALNS通过使用多种destroy和repair方法，然后再根据这些destroy和repair方法生成的解的质量，选择那些表现好的destroy和repair方法，再次生成邻域进行搜索。

 

**算法流程**

 ![details](https://i.loli.net/2021/04/26/uNeG1l6gyar5EAX.png)

**参考文献**

[1]李妍峰,李军,高自友.大规模邻域搜索算法求解时变车辆调度问题[J].管理科学学报,2012,15(01):22-32.

[2]Ahuja R K, Orlin J B, Sharma D. Very large‐scale neighborhood search[J]. International Transactions in Operational Research, 2000, 7(4‐5): 301-317.

[3]Tu W, Zhao T, Zhou B, et al. OCD: Online crowdsourced delivery for on-demand food[J]. IEEE Internet of Things Journal, 2019, 7(8): 6842-6854.

 