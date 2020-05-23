import DeathCounter from "./DeathCounter";
import Player from "./Player";

describe('Singleton', () => {
    beforeEach(() => {
        // 每個 test case 執行之前先重設計數
        DeathCounter.getInstance().reset();
    })

    // NOTE: Typescript compiler 在編譯過程就會出錯告知不能建構，所以不能執行此測試
    // eslint-disable-next-line jest/no-commented-out-tests
    // test('不能使用 `new` 建構實例', () => {
    //     expect(new DeathCounter).toThrowError();
    // })

    test('可以使用 getInstance() 取得實例', () => {
        const instance = DeathCounter.getInstance();
        expect(instance).toBeInstanceOf(DeathCounter);
    })

    test('使用 getInstance() 取得同一個實例', () => {
        const instance1 = DeathCounter.getInstance();
        const instance2 = DeathCounter.getInstance();
        expect(instance1).toEqual(instance2);
    })

    test('每個玩家都取得同一個 DeathCounter 實例', () => {
        const player1 = new Player();
        const player2 = new Player();
        expect(player1.deathCounterInstance).toEqual(player2.deathCounterInstance);
    })

    test('player1 死亡1次，每個玩家取得的 death count 值一樣', () => {
        const player1 = new Player();
        const player2 = new Player();
        player1.death();
        expect(player1.deathCounterInstance.getDeathCount()).toEqual(player2.deathCounterInstance.getDeathCount());
    })

    test('player1 死亡1次以及 player2 死亡1次，每個玩家取得的 death count 值一樣', () => {
        const player1 = new Player();
        const player2 = new Player();
        player1.death();
        player2.death();
        expect(player1.deathCounterInstance.getDeathCount()).toEqual(player2.deathCounterInstance.getDeathCount());
    })

    test('遊戲初始死亡計數為零', () => {
        expect(DeathCounter.getInstance().getDeathCount()).toEqual(0);
    })

    test('玩家死亡1次，計數為1', () => {
        const player = new Player();
        player.death()
        expect(player.deathCounterInstance.getDeathCount()).toEqual(1);
        expect(DeathCounter.getInstance().getDeathCount()).toEqual(1);
    })

    test('玩家死亡5次，遊戲結束', () => {
        const player = new Player();
        expect(() => {
            player.death();
            player.death();
            player.death();
            player.death();
            player.death();
        }).toThrowError('Game over!');
    })

    test('player1 死亡4次，player2 死亡1次，遊戲結束', () => {
        const player1 = new Player();
        const player2 = new Player();
        expect(() => {
            player1.death();
            player1.death();
            player1.death();
            player1.death();
            player2.death();
        }).toThrowError('Game over!');
    })
})