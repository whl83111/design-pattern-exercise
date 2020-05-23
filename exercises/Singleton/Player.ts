import DeathCounter from './DeathCounter'

/** 玩家 */
class Player {
    /** 死亡計數器實例 */
    deathCounterInstance = DeathCounter.getInstance()

    /** 玩家死亡 */
    death(): void {
        this.deathCounterInstance.plusDeath()
    }
}

export default Player;