let user = new Array();
let user1 = new Array();
let user2 = new Array();
let frameFriend = 0;
let cellPlace = 0;
let flag = 0;

window.onload = function() {
  user1 = createUser1();
  user2 = createUser2();

  update1(user1, "", "");
  update2(user2, "", "");
};
// クリック1
$(document).on("click", "#table td", function() {
  if (flag == 0) {
    let komaData = $(this)
      .find("span")
      .attr("id")
      .split("_");
    let first = eval("(" + komaData[0] + ")");
    let second = komaData[1];
    if (first == user2) {
      flag = 2;
      frameFriend = user2[second];
    } else if (first == user1) {
      flag = 1;
      frameFriend = user1[second];
    }
    console.log("flag :" + flag);
    //クリック2 user2
  } else if (flag == 2) {
    let placeData = $(this)
      .find("span")
      .attr("id")
      .split("_");
    let komaPlace = $(this)
      .attr("id")
      .slice(4);
    let place = komaPlace.split("");
    let x = place[0];
    let y = place[1];
    let komaData = eval("(" + placeData[0] + ")");
    let frameEnemy = komaData[placeData[1]];
    if (placeData[1] == 100) {
      alert("1マス進みます");
      let tempx = frameFriend.x;
      let tempy = frameFriend.y;
      frameFriend.x = x;
      frameFriend.y = y;
      update2(user2, tempx, tempy);
      flag = 0;
    } else {
      if (komaData == user2) {
        alert("味方の駒です");
        return false;
      } else if (komaData == user1) {
        alert("勝負します");
        lost = judgeMent(frameFriend.hand, frameEnemy.hand);
        if (lost == 0) {
          alert("引き分けです。");
          flag = 0;
        } else {
          console.log("lost :" + lost);
          //user2の負け
          if ((lost = frameFriend.hand)) {
            frameFriend.exist = 1;
            flag = 0;
            //user1の負け
          } else if ((lost = frameEnemy.hand)) {
            frameEnemy.exist = 1;
            flag = 0;
          }
        }
      }
    }
    // クリック２　user1
  } else if (flag == 1) {
    let placeData = $(this)
      .find("span")
      .attr("id")
      .split("_");
    let komaPlace = $(this)
      .attr("id")
      .slice(4);
    let place = komaPlace.split("");
    let x = place[0];
    let y = place[1];
    let komaData = eval("(" + placeData[0] + ")");
    let frameEnemy = komaData[placeData[1]];
    //2回目のクリックした場所になにもいなかった場合
    if (placeData[1] == 100) {
      alert("1マス進みます");
      let tempx = frameFriend.x;
      let tempy = frameFriend.y;
      frameFriend.x = x;
      frameFriend.y = y;
      flag = 0;
      //2回目のクリックに駒がある場合
    } else {
      //２回目のクリックの場所に味方の駒がある場合
      if (komaData == user1) {
        alert("味方の駒です");
        return false;
        //2回目のクリックの場所に敵の駒がある場合
      } else if (komaData == user2) {
        alert("勝負します");
        let lost = judgeMent(frameFriend.hand, frameEnemy.hand);
        //引き分けた場合
        if (lost == 0) {
          alert("引き分けです。");
          flag = 0;
          //決着
        } else {
          //user1が負け
          if (frameFriend.hand == lost) {
            frameFriend.exist = 1;
            // user1が勝ち
            flag = 0;
          } else if (frameEnemy.hand == lost) {
            frameEnemy.exist = 1;
            flag = 0;
          }
        }
      }
    }
  }
});

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

function update1(user1) {
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

function update2(user2) {
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

// じゃんけんの判定:white(味方),black(相手)
function judgeMent(white, black) {
  let lost = 0;
  console.log((white - black + 3) % 3);
  if ((white - black + 3) % 3 == 2) {
    console.log("whiteの勝利、blackの負け");
    lost = black;
  } else if (white - black + (3 % 3) == 1) {
    console.log("blackの勝利、whiteの負け");
    lost = white;
  } else if ((white - black + 3) % 3 == 0) {
    console.log("引き分け");
    lost = 0;
  }
  return lost;
}
