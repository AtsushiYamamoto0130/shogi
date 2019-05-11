/**
 * 全体的にコードが読みやすかった。
 * 
 * 基本的なコーディング問題
 * 1. 似た処理は書かない。
 * 
 * 2. if文とswwitch文を使い分けた方がいい。
 * 特に、switch文は分岐を明示的に書けるので可読性の向上が期待できる
 * 使い分け方は、2分岐の場合はif...else,
 * 多分岐の場合はswitch文を使う。
 * 
 * あと場合にも依るだろうけど、if文とswitch文ではswitch文の方が処理速度が速い
 */

let user = new Array();
let user1 = new Array();
let user2 = new Array();
let frameFriend = 0;
let flag = 0;
let komaData;
let firstClickArray;
let handArrayConvoy1 = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
let handArrayConvoy2 = handArrayConvoy1;
let handArrayShuffled1 = new Array();
let handArrayShuffled2 = new Array();
let cellPlace1 = 0;

window.onload = function() {
    handArrayShuffled1 = shuffledArray(handArrayConvoy1);
    handArrayShuffled2 = shuffledArray(handArrayConvoy2);

    //  関数に駒生成範囲を渡してあげる。
    //  生成範囲を変更しやすいほか、user1とuser2で同じ関数が使えるようになる。
    user1 = createUser(6, 9, handArrayShuffled1);
    user2 = createUser(0, 9, handArrayShuffled2);

    set1(user1, "", "");
    set2(user2, "", "");
};
// クリック1
$(document).on("click", "#table td", function() {
    if (flag == 0) {
        komaData = $(this)
            .find("span")
            .attr("id")
            .split("_");
        firstClickArray = eval("(" + komaData[0] + ")");
        cellPlace1 = $(this).attr("id");
        let second = komaData[1];
        if (firstClickArray == user2) {
            flag = 2;
            frameFriend = user2[second];
        } else if (firstClickArray == user1) {
            flag = 1;
            frameFriend = user1[second];
        }
        console.log("flag :" + flag);
        //クリック2 user2
    } else if (flag == 2) {
        let komaData2 = $(this)
            .find("span")
            .attr("id")
            .split("_");
        let komaPlace = $(this)
            .attr("id")
            .slice(4);
        cellPlace1 = eval("(" + cellPlace1 + ")");
        console.log("cellPlace1aaaaa :" + cellPlace1);
        $("#cellPlace1").css("background-color", "green");
        let place = komaPlace.split("");
        let x = place[0];
        let y = place[1];
        let afterClickArray = eval("(" + komaData2[0] + ")");
        let frameEnemy = afterClickArray[komaData2[1]];
        console.log("frameEnemy :" + komaData2[1]);
        console.log("afterClickArray" + afterClickArray);
        if (komaData2[1] == 100) {
            alert("マスを進みます");
            let tempx = frameFriend.x;
            let tempy = frameFriend.y;
            frameFriend.x = x;
            frameFriend.y = y;
            deleteFrame(tempx, tempy);
            upDate2(
                frameFriend.x,
                frameFriend.y,
                frameFriend.hand,
                komaData[1],
                frameFriend.exist
            );
            flag = 0;
        } else {
            if (afterClickArray == user2) {
                alert("味方の駒です");
                return false;
            } else if (afterClickArray == user1) {
                alert("勝負します");
                lost = judgeMent(frameFriend, frameEnemy);
                if (lost == 0) {
                    alert("引き分けです。");
                    frameFriend.exist = 1;
                    frameEnemy.exist = 1;
                    upDate2(
                        frameFriend.x,
                        frameFriend.y,
                        frameFriend.hand,
                        komaData[1],
                        frameFriend.exist
                    );
                    upDate1(
                        frameEnemy.x,
                        frameEnemy.y,
                        frameEnemy.hand,
                        komaData2[1],
                        frameEnemy.exist
                    );
                    checkWinner1();
                    checkWinner2();

                    flag = 0;
                } else {
                    console.log("lost :" + lost);
                    //user2の負け
                    if (lost == 1) {
                        upDate2(
                            frameFriend.x,
                            frameFriend.y,
                            frameFriend.hand,
                            frameFriend,
                            frameFriend.exist
                        );
                        upDate1(
                            frameFriend.x,
                            frameFriend.y,
                            frameEnemy.hand,
                            komaData2[1],
                            frameEnemy.exist
                        );
                        deleteFrame(frameEnemy.x, frameEnemy.y);
                        frameEnemy.x = frameFriend.x;
                        frameEnemy.y = frameFriend.y;
                        checkWinner1();
                        checkWinner2();
                        flag = 0;
                        //user1の負け
                    } else if (lost == 2) {
                        upDate1(
                            frameEnemy.x,
                            frameEnemy.y,
                            frameEnemy.hand,
                            frameEnemy,
                            frameEnemy.exist
                        );
                        upDate2(
                            frameEnemy.x,
                            frameEnemy.y,
                            frameFriend.hand,
                            komaData[1],
                            frameFriend.exist
                        );
                        deleteFrame(frameFriend.x, frameFriend.y);
                        frameFriend.x = frameEnemy.x;
                        frameFriend.y = frameEnemy.y;
                        checkWinner1();
                        checkWinner2();
                        flag = 0;
                    }
                }
            }
        }
        // クリック２user1
    } else if (flag == 1) {
        let komaData2 = $(this)
            .find("span")
            .attr("id")
            .split("_");
        console.log("komaData2 :" + komaData2);
        let komaPlace = $(this)
            .attr("id")
            .slice(4);
        let place = komaPlace.split("");
        let x = place[0];
        let y = place[1];
        let afterClickArray = eval("(" + komaData2[0] + ")");
        console.log("komaData :" + komaData);
        let frameEnemy = afterClickArray[komaData2[1]];
        console.log("frameEnemy :" + frameEnemy);

        //2回目のクリックした場所になにもいなかった場合
        if (komaData2[1] == 100) {
            alert("マスを進みます");
            let tempx = frameFriend.x;
            let tempy = frameFriend.y;
            frameFriend.x = x;
            frameFriend.y = y;
            deleteFrame(tempx, tempy);
            console.log("駒データ" + komaData[1]);
            upDate1(
                frameFriend.x,
                frameFriend.y,
                frameFriend.hand,
                komaData[1],
                frameFriend.exist
            );
            flag = 0;
            //2回目のクリックに駒がある場合
        } else {
            //２回目のクリックの場所に味方の駒がある場合
            if (afterClickArray == user1) {
                alert("味方の駒です");
                return false;
                //2回目のクリックの場所に敵の駒がある場合
            } else if (afterClickArray == user2) {
                // alert("勝負します");
                let lost = judgeMent(frameFriend, frameEnemy);
                //引き分けた場合
                console.log("frameFriend.exist" + frameFriend.exist);
                console.log("frameEnemy.exist" + frameEnemy.exist);
                if (lost == 0) {
                    alert("引き分けです。");
                    frameFriend.exist = 1;
                    frameEnemy.exist = 1;
                    upDate1(
                        frameFriend.x,
                        frameFriend.y,
                        frameFriend.hand,
                        komaData[1],
                        frameFriend.exist
                    );
                    upDate2(
                        frameEnemy.x,
                        frameEnemy.y,
                        frameEnemy.hand,
                        komaData2[1],
                        frameEnemy.exist
                    );
                    checkWinner1();
                    checkWinner2();
                    flag = 0;
                    //決着
                } else {
                    //user1が負け
                    if (lost == 1) {
                        console.log("frameFriend.exist>>" + frameFriend.exist);
                        console.log("frameEnemy.exist>>" + frameEnemy.exist);
                        console.log("frameFriend>>" + frameFriend);

                        upDate1(
                            frameFriend.x,
                            frameFriend.y,
                            frameFriend.hand,
                            frameFriend,
                            frameFriend.exist
                        );
                        upDate2(
                            frameFriend.x,
                            frameFriend.y,
                            frameEnemy.hand,
                            komaData2[1],
                            frameEnemy.exist
                        );

                        deleteFrame(frameEnemy.x, frameEnemy.y);
                        frameEnemy.x = frameFriend.x;
                        frameEnemy.y = frameFriend.y;
                        checkWinner1();
                        checkWinner2();

                        // user1が勝ち
                        flag = 0;
                    } else if (lost == 2) {
                        upDate2(
                            frameEnemy.x,
                            frameEnemy.y,
                            frameEnemy.hand,
                            frameEnemy,
                            frameEnemy.exist
                        );
                        upDate1(
                            frameEnemy.x,
                            frameEnemy.y,
                            frameFriend.hand,
                            komaData[1],
                            frameFriend.exist
                        );

                        deleteFrame(frameFriend.x, frameFriend.y);
                        frameFriend.x = frameEnemy.x;
                        frameFriend.y = frameEnemy.y;
                        checkWinner1();
                        checkWinner2();

                        flag = 0;
                    }
                }
            }
        }
    }
});

// せっかく、exist, handにid値を振っているんだから
// こんな時は連想配列を使ったら良いんじゃないか説 is ある
const handTypeFriend = {
    1: 'FriendGu.png',
    2: 'FriendChoki.png',
    3: 'FriendPa.png'
};
const existType = {
    0: 'frame',
    2: 'king',
    3: 'knight'
}
const handTypeEnemy = {
    1: 'EnemyGu.png',
    2: 'EnemyChoki.png',
    3: 'EnemyPa.png'
};

function set1(user1) {
    console.log("更新中");
    let user = user1;

    for (let i = 0; i < 18; i++) {
        let userObj = user[i];
        console.log('user1 : ', userObj);
        handTypeNum = userObj.hand;
        existTypeNum = userObj.exist;
        $(`#cell${userObj.x}${userObj.y}`).html(
            `<span id="user1_${i}"><img src="./img/${existType[existTypeNum]}${handTypeFriend[handTypeNum]}"/></span>`
        );
        if (existTypeNum === 1 || existTypeNum === 2) $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
    }
}

function set2(user2) {
    console.log("更新中");
    let user = user2;

    for (let i = 0; i < 18; i++) {
        let userObj = user[i];
        console.log('user2 : ', userObj);
        handTypeNum = userObj.hand;
        existTypeNum = userObj.exist;
        $(`#cell${userObj.x}${userObj.y}`).html(
            `<span id="user1_${i}"><img src="./img/${existType[existTypeNum]}${handTypeEnemy[handTypeNum]}"/></span>`
        );
        if (existTypeNum === 1 || existTypeNum === 2) $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
    }
}

// じゃんけんの判定:white(味方),enemy(相手)
function judgeMent(friend, enemy) {
    let white = friend.hand;
    let black = enemy.hand;
    let lost = 0;
    console.log((white - black + 3) % 3);
    if ((white - black + 3) % 3 == 2) {
        console.log("whiteの勝利、blackの負け");
        enemy.exist = 1;
        lost = 2;
    } else if ((white - black + 3) % 3 == 1) {
        console.log("blackの勝利、whiteの負け");
        friend.exist = 1;
        lost = 1;
    } else if ((white - black + 3) % 3 == 0) {
        console.log("引き分け");
        lost = 0;
    }
    return lost;
}

function upDate1(x, y, hand, komaData, exist) {
    console.log("ああああああ");
    console.log("x :" + x);
    console.log("y :" + y);
    console.log("komaData :" + komaData);
    console.log("exist :" + exist);
    if (exist == 0 || exist == 2 || exist == 3) {
        $(`#cell${x}${y}`).html(
            `<span id="user1_${komaData}"><img src="./img/${existType[exist]}${handTypeFriend[hand]}"/></span>`
        );

    } else if (exist == 1) $(`#cell${x}${y}`).html(`<span id="user_100"></span>`);
}

function upDate2(x, y, hand, komaData, exist) {
    if (exist == 0 || exist == 2 || exist == 3) {
        $(`#cell${x}${y}`).html(
            `<span id="user2_${komaData}"><img src="./img/${existType[exist]}${handTypeEnemy[hand]}"/></span>`
        );

    } else if (exist == 1) $(`#cell${x}${y}`).html(`<span id="user_100"></span>`);
}

function deleteFrame(tempx, tempy) {
    console.log("デリート" + tempx + tempy);
    $(`#cell${tempx}${tempy}`).html(`<span id="user_100"></span>`);
}

// ユーザーの駒生成関数
function createUser(geneArea, komaLength, handArray) {
    let userArray = new Array();
    let existNumber = 0;
    for (let i = geneArea; i <= geneArea + 2; i = i + 2) {
        for (let j = 0; j < komaLength; j++) {
            existNumber = 0;
            if ((i === 0 || i === 8) && j === 4) existNumber = 2; // 王様の駒
            if ((i === 0 || i === 8) && (j === 7 || j === 1)) existNumber = 3; // 飛車角の駒
            userArray.push({
                x: j,
                y: i,
                hand: handArray[j], // hand = にする必要ない
                exist: existNumber
            })
        }
    }
    return userArray
}

// 数字からグー、チョキ、パーを判別
function seeHand(hand) {
    let jankenHand = "";
    if (hand == 1) {
        jankenHand = "グー";
    } else if (hand == 2) {
        jankenHand = "チョキ";
    } else if (hand == 3) {
        jankenHand = "パー";
    }
    return jankenHand;
}

function shuffledArray(convoy) {
    var team = convoy;
    for (i = team.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = team[i];
        team[i] = team[j];
        team[j] = tmp;
    }
    console.log("team.length" + team);
    return team;
}


// 勝敗チェックuser1
function checkWinner1() {
    let winnerJudge = 0;
    for (let i = 0; i < 18; i++) {
        if (user1[i].exist == 2) {
            winnerJudge = 1;
        }
    }
    if (winnerJudge == 0) {
        alert("勝者はuser2です！！");
    }
}
// 勝敗チェックuser2
function checkWinner2() {
    let winnerJudge = 0;
    for (let i = 0; i < 18; i++) {
        if (user2[i].exist == 2) {
            winnerJudge = 1;
        }
    }
    if (winnerJudge == 0) {
        alert("勝者はuser1です！！");
    }
}