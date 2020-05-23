/** 死亡計數器 */
class DeathCounter {
    /** 計數器 */
    private count = 0;

    /** 最大死亡次數 */
    private readonly maxDeathCount = 5;

    /** 實例存放 */
    private static instance: DeathCounter;

    /** 建構式
     * 
     * 強制不給使用 `new` 建構新的實例
     */
    private constructor() {
        // Do nothing.
    }

    /** 取得實例 */
    static getInstance(): DeathCounter {
        if (!DeathCounter.instance) {
            DeathCounter.instance = new DeathCounter();
        }
        return DeathCounter.instance;
    }

    /** 取得死亡計數 */
    getDeathCount(): number {
        return this.count;
    }

    /** 增加死亡計數
     * 
     * 計數達到最大死亡次數，則觸發 `gameOver()`
     */
    plusDeath(): void {
        this.count += 1;
        if (this.count === this.maxDeathCount) {
            this.gameOver()
        }
    }

    /** 遊戲結束 */
    private gameOver(): void {
        throw Error('Game over!')
    }

    /** 重設計數 */
    reset(): void {
        this.count = 0;
    }
}

export default DeathCounter;