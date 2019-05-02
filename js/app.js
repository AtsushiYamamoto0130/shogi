let user = new Array();
let user1 = new Array();
let user2 = new Array();
let frameFriend = 0;
let cellPlace = 0;
let flag = 0;
let komaData;
let firstClickArray;

window.onload = function() {
  user1 = createUser1();
  user2 = createUser2();

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
    let place = komaPlace.split("");
    let x = place[0];
    let y = place[1];
    let afterClickArray = eval("(" + komaData2[0] + ")");
    let frameEnemy = afterClickArray[komaData2[1]];
    console.log("frameEnemy :" + komaData2[1]);
    console.log("afterClickArray" + afterClickArray);
    if (komaData2[1] == 100) {
      alert("1マス進みます");
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
              frameEnemy,
              frameEnemy.exist
            );
            deleteFrame(frameEnemy.x, frameEnemy.y);
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
              frameFriend,
              frameFriend.exist
            );
            deleteFrame(frameFriend.x, frameFriend.y);
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
      alert("1マス進みます");
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
        alert("勝負します");
        let lost = judgeMent(frameFriend, frameEnemy);
        //引き分けた場合
        console.log("frameFriend.exist" + frameFriend.exist);
        console.log("frameEnemy.exist" + frameEnemy.exist);
        if (lost == 0) {
          alert("引き分けです。");
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
              frameEnemy,
              frameEnemy.exist
            );
            deleteFrame(frameEnemy.x, frameEnemy.y);

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
              frameFriend,
              frameFriend.exist
            );
            deleteFrame(frameFriend.x, frameFriend.y);
            flag = 0;
          }
        }
      }
    }
  }
});

function set1(user1) {
  console.log("更新中");
  let user = user1;

  for (let i = 0; i < 18; i++) {
    let userObj = user[i];
    if (userObj.hand == 1) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user1_${i}">グー</span>`
      );
    } else if (userObj.hand == 2) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user1_${i}">チョキ</span>`
      );
    } else if (userObj.hand == 3) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user1_${i}">パー</span>`
      );
    }
  }
}

function set2(user2) {
  console.log("更新中");
  let user = user2;

  for (let i = 0; i < 18; i++) {
    let userObj = user[i];
    if (userObj.hand == 1) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user2_${i}">グー</span>`
      );
    } else if (userObj.hand == 2) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user2_${i}">チョキ</span>`
      );
    } else if (userObj.hand == 3) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user2_${i}">パー</span>`
      );
    }
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
  if (exist == 0) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(`<span id="user1_${komaData}">グー</span>`);
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(`<span id="user1_${komaData}">チョキ</span>`);
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(`<span id="user1_${komaData}">パー</span>`);
    }
  } else if (exist == 1) {
    $(`#cell${x}${y}`).html(`<span id="user_100"></span>`);
  }
}

function upDate2(x, y, hand, komaData, exist) {
  if (exist == 0) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(`<span id="user2_${komaData}">グー</span>`);
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(`<span id="user2_${komaData}">チョキ</span>`);
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(`<span id="user2_${komaData}">パー</span>`);
    }
  } else if (exist == 1) {
    $(`#cell${x}${y}`).html(`<span id="user_100"></span>`);
  }
}

function deleteFrame(tempx, tempy) {
  $(`#cell${tempx}${tempy}`).html(`<span id="user_100"></span>`);
}

// user2を作る
function createUser2() {
  let userArray2 = [
    {
      x: 0,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 1,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 2,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 3,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 4,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 5,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 6,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 7,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 8,
      y: 0,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 0,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 1,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 2,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 3,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 4,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 5,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 6,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 7,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 8,
      y: 2,
      hand: (hand = makeHand()),
      exist: 0
    }
  ];
  return userArray2;
}

// user1を作る
function createUser1() {
  let userArray1 = [
    {
      x: 0,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 1,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 2,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 3,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 4,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 5,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 6,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 7,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 8,
      y: 6,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 0,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 1,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 2,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 3,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 4,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 5,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 6,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 7,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    },
    {
      x: 8,
      y: 8,
      hand: (hand = makeHand()),
      exist: 0
    }
  ];
  return userArray1;
}

function makeHand() {
  let hand = Math.floor(Math.random() * 3 + 1);
  return hand;
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
