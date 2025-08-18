// 阶段性陪伴分析器 - 伪代码推理

class CompanionshipAnalyzer {
    constructor() {
        this.factors = {
            expectationAlignment: 0, // 期望一致性 (0-1)
            companionshipQuality: 0, // 陪伴质量 (0-1)
            lifeStage: '', // 生命阶段
            communicationLevel: 0, // 沟通水平 (0-1)
            emotionalDependency: 0, // 情感依赖程度 (0-1)
            relationshipDuration: 0 // 关系持续时间 (月)
        };
    }

    // 分析阶段性陪伴的影响
    analyzeIntermittentCompanionship(factors) {
        this.factors = { ...this.factors, ...factors };
        
        const rewardScore = this.calculateRewardScore();
        const punishmentScore = this.calculatePunishmentScore();
        
        return {
            rewardScore,
            punishmentScore,
            netEffect: rewardScore - punishmentScore,
            conclusion: this.getConclusion(rewardScore, punishmentScore),
            reasoning: this.getReasoning()
        };
    }

    // 计算奖励分数
    calculateRewardScore() {
        let score = 0;
        
        // 期望一致性越高，奖励越大
        score += this.factors.expectationAlignment * 0.3;
        
        // 陪伴质量越高，奖励越大
        score += this.factors.companionshipQuality * 0.4;
        
        // 沟通水平越高，奖励越大
        score += this.factors.communicationLevel * 0.2;
        
        // 关系持续时间适中时奖励最大
        const durationFactor = Math.min(this.factors.relationshipDuration / 12, 1);
        score += (1 - Math.abs(durationFactor - 0.5)) * 0.1;
        
        return Math.min(score, 1);
    }

    // 计算惩罚分数
    calculatePunishmentScore() {
        let score = 0;
        
        // 期望不一致时惩罚最大
        score += (1 - this.factors.expectationAlignment) * 0.3;
        
        // 情感依赖程度越高，惩罚越大
        score += this.factors.emotionalDependency * 0.3;
        
        // 沟通水平越低，惩罚越大
        score += (1 - this.factors.communicationLevel) * 0.2;
        
        // 生命阶段影响
        const lifeStagePenalty = this.getLifeStagePenalty();
        score += lifeStagePenalty * 0.2;
        
        return Math.min(score, 1);
    }

    // 根据生命阶段计算惩罚
    getLifeStagePenalty() {
        const penalties = {
            'crisis': 0.8,    // 危机时期 - 高惩罚
            'transition': 0.6, // 过渡期 - 中等惩罚
            'stable': 0.2,    // 稳定期 - 低惩罚
            'growth': 0.1     // 成长期 - 很低惩罚
        };
        return penalties[this.factors.lifeStage] || 0.3;
    }

    // 得出结论
    getConclusion(rewardScore, punishmentScore) {
        const netEffect = rewardScore - punishmentScore;
        
        if (netEffect > 0.3) return "主要是奖励";
        if (netEffect > 0) return "偏向奖励";
        if (netEffect > -0.3) return "偏向惩罚";
        return "主要是惩罚";
    }

    // 获取推理过程
    getReasoning() {
        const reasons = [];
        
        if (this.factors.expectationAlignment > 0.7) {
            reasons.push("双方期望一致，减少冲突");
        } else {
            reasons.push("期望不一致，容易产生误解");
        }
        
        if (this.factors.companionshipQuality > 0.7) {
            reasons.push("陪伴质量高，价值感强");
        } else {
            reasons.push("陪伴质量低，缺乏满足感");
        }
        
        if (this.factors.emotionalDependency > 0.7) {
            reasons.push("情感依赖高，分离痛苦大");
        }
        
        if (this.factors.communicationLevel > 0.7) {
            reasons.push("沟通良好，理解充分");
        } else {
            reasons.push("沟通不足，容易误解");
        }
        
        return reasons;
    }
}

// 测试不同场景
function runAnalysis() {
    const analyzer = new CompanionshipAnalyzer();
    
    console.log("=== 阶段性陪伴分析结果 ===\n");
    
    // 场景1: 理想情况 - 主要是奖励
    console.log("场景1: 理想情况");
    const scenario1 = analyzer.analyzeIntermittentCompanionship({
        expectationAlignment: 0.9,
        companionshipQuality: 0.9,
        lifeStage: 'stable',
        communicationLevel: 0.8,
        emotionalDependency: 0.3,
        relationshipDuration: 18
    });
    console.log(scenario1);
    console.log("推理:", scenario1.reasoning.join(", "));
    console.log("\n");
    
    // 场景2: 困难情况 - 主要是惩罚
    console.log("场景2: 困难情况");
    const scenario2 = analyzer.analyzeIntermittentCompanionship({
        expectationAlignment: 0.2,
        companionshipQuality: 0.4,
        lifeStage: 'crisis',
        communicationLevel: 0.3,
        emotionalDependency: 0.8,
        relationshipDuration: 6
    });
    console.log(scenario2);
    console.log("推理:", scenario2.reasoning.join(", "));
    console.log("\n");
    
    // 场景3: 平衡情况 - 因人而异
    console.log("场景3: 平衡情况");
    const scenario3 = analyzer.analyzeIntermittentCompanionship({
        expectationAlignment: 0.6,
        companionshipQuality: 0.7,
        lifeStage: 'transition',
        communicationLevel: 0.6,
        emotionalDependency: 0.5,
        relationshipDuration: 12
    });
    console.log(scenario3);
    console.log("推理:", scenario3.reasoning.join(", "));
    console.log("\n");
}

// 运行分析
runAnalysis();

// 结论验证函数
function validateConclusion() {
    console.log("=== 结论验证 ===\n");
    
    const analyzer = new CompanionshipAnalyzer();
    let rewardCount = 0;
    let punishmentCount = 0;
    let neutralCount = 0;
    
    // 模拟1000个随机场景
    for (let i = 0; i < 1000; i++) {
        const randomFactors = {
            expectationAlignment: Math.random(),
            companionshipQuality: Math.random(),
            lifeStage: ['crisis', 'transition', 'stable', 'growth'][Math.floor(Math.random() * 4)],
            communicationLevel: Math.random(),
            emotionalDependency: Math.random(),
            relationshipDuration: Math.random() * 60
        };
        
        const result = analyzer.analyzeIntermittentCompanionship(randomFactors);
        
        if (result.netEffect > 0.1) rewardCount++;
        else if (result.netEffect < -0.1) punishmentCount++;
        else neutralCount++;
    }
    
    console.log(`总样本: 1000`);
    console.log(`奖励为主: ${rewardCount} (${(rewardCount/1000*100).toFixed(1)}%)`);
    console.log(`惩罚为主: ${punishmentCount} (${(punishmentCount/1000*100).toFixed(1)}%)`);
    console.log(`中性: ${neutralCount} (${(neutralCount/1000*100).toFixed(1)}%)`);
    console.log("\n结论: 阶段性陪伴的影响确实因人而异，因时而异，因关系而异");
}

validateConclusion();