// 模拟宝藏地图API - 扩展版
class TreasureMap {
    // 获取初始线索
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索，指向一片神秘森林...");
            }, 1000);
        });
    }

    // 解码古卷
    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!古卷提到森林深处有个被遗忘的神庙入口...");
            }, 1500);
        });
    }

    // 穿越森林
    static crossForest(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("森林中遭遇猛兽袭击，被迫返回!");
                }
                resolve("成功穿越森林，找到了神庙入口...");
            }, 2000);
        });
    }

    // 选择通道
    static choosePassage(choice) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (choice === 'left') {
                    reject("选择了左侧通道，触发了陷阱!");
                } else if (choice === 'right') {
                    resolve("选择了右侧通道，安全通过并发现了机关室...");
                } else {
                    reject("无效的选择!");
                }
            }, 1500);
        });
    }

    // 解开机关
    static solvePuzzle() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.4) {
                    reject("机关破解失败，神庙开始坍塌!");
                }
                resolve("成功解开机关，获得了宝箱钥匙...");
            }, 2500);
        });
    }

    // 找到宝箱
    static findTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在密室中找到了一个华丽的宝箱...");
            }, 1000);
        });
    }

    // 打开宝箱
    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你打开了宝箱，找到了传说中的黄金宝藏和古老文物!");
            }, 1500);
        });
    }
}

// 使用async/await重写寻宝过程
async function findTreasureWithAsyncAwait() {
    try {
        // 第一步：获取初始线索
        const clue = await TreasureMap.getInitialClue();
        updateGameStatus(clue, 'library');
        await waitForUser();

        // 第二步：解码古卷
        const location = await TreasureMap.decodeAncientScript(clue);
        updateGameStatus(location, 'ancient-script');
        await waitForUser();

        // 第三步：穿越森林
        const forestResult = await TreasureMap.crossForest(location);
        updateGameStatus(forestResult, 'forest');
        await waitForUser();

        // 第四步：选择通道（增加用户交互）
        showChoices(['left', 'right'], '请选择通道方向 (左/右):');
        const choice = await waitForChoice();
        const passageResult = await TreasureMap.choosePassage(choice);
        updateGameStatus(passageResult, `passage-${choice}`);
        await waitForUser();

        // 第五步：解开机关
        const puzzleResult = await TreasureMap.solvePuzzle();
        updateGameStatus(puzzleResult, 'puzzle');
        await waitForUser();

        // 第六步：找到宝箱
        const box = await TreasureMap.findTreasureBox();
        updateGameStatus(box, 'treasure-box');
        await waitForUser();

        // 第七步：打开宝箱
        const treasure = await TreasureMap.openTreasureBox();
        updateGameStatus(treasure, 'treasure');
        showCompletion();

    } catch (error) {
        updateGameStatus(`任务失败: ${error}`, 'failure');
        showRestartButton();
    }
}

// 辅助函数：等待用户继续
function waitForUser() {
    return new Promise((resolve) => {
        document.getElementById('continue-btn').style.display = 'block';
        document.getElementById('continue-btn').onclick = () => {
            document.getElementById('continue-btn').style.display = 'none';
            resolve();
        };
    });
}

// 辅助函数：显示选择
function showChoices(choices, message) {
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = `<p>${message}</p>`;
    
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice === 'left' ? '左侧通道' : '右侧通道';
        button.dataset.choice = choice;
        choicesDiv.appendChild(button);
    });
    
    choicesDiv.style.display = 'block';
}

// 辅助函数：等待用户选择
function waitForChoice() {
    return new Promise((resolve) => {
        const choiceButtons = document.querySelectorAll('.choice-btn');
        choiceButtons.forEach(button => {
            button.onclick = () => {
                const choice = button.dataset.choice;
                document.getElementById('choices').style.display = 'none';
                resolve(choice);
            };
        });
    });
}

// 页面更新函数将在HTML中实现
