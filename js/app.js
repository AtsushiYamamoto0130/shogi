let user = new Array();
let user1 = new Array();
let user2 = new Array();
let frameFriend = 0;
let cellPlace = 0;
let flag = 0;
let komaData;
let firstClickArray;
let handArrayConvoy1 = new Array();
let handArrayConvoy2 = new Array();
let handArrayShuffled1 = new Array();
let handArrayShuffled2 = new Array();

window.onload = function() {
  handArrayConvoy1 = makeArray1();
  handArrayConvoy2 = makeArray2();
  handArrayShuffled1 = shuffledArray1(handArrayConvoy1);
  handArrayShuffled2 = shuffledArray2(handArrayConvoy2);
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
        alert("勝負します");
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

function set1(user1) {
  console.log("更新中");
  let user = user1;

  for (let i = 0; i < 18; i++) {
    let userObj = user[i];
    if (userObj.exist == 0) {
      if (userObj.hand == 1) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/frameFriendGu.png"/></span>`
        );
      } else if (userObj.hand == 2) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/frameFriendChoki.png"/></span>`
        );
      } else if (userObj.hand == 3) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/frameFriendPa.png"/></span>`
        );
      }
    } else if (userObj.exist == 2) {
      if (userObj.hand == 1) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/kingFriendGu.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 2) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/kingFriendChoki.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 3) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/kingFriendPa.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      }
    } else if (userObj.exist == 3) {
      if (userObj.hand == 1) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/knightFriendGu.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 2) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/knightFriendChoki.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 3) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user1_${i}"><img src="./img/knightFriendPa.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      }
    }
  }
}

function set2(user2) {
  console.log("更新中");
  let user = user2;

  for (let i = 0; i < 18; i++) {
    let userObj = user[i];
    if (userObj.exist == 0) {
      if (userObj.hand == 1) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/frameEnemyGu.png"/></span>`
        );
      } else if (userObj.hand == 2) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/frameEnemyChoki.png"/></span>`
        );
      } else if (userObj.hand == 3) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/frameEnemyPa.png"/></span>`
        );
      }
    } else if (userObj.exist == 2) {
      if (userObj.hand == 1) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/kingEnemyGu.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 2) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/kingEnemyChoki.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 3) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/kingEnemyPa.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      }
    } else if (userObj.exist == 3) {
      if (userObj.hand == 1) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/knightEnemyGu.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 2) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/knightEnemyChoki.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      } else if (userObj.hand == 3) {
        // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
        $(`#cell${userObj.x}${userObj.y}`).html(
          `<span id="user2_${i}"><img src="./img/knightEnemyPa.png"/></span>`
        );
        $(`#cell${userObj.x}${userObj.y}`).css("color", "red");
      }
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
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/frameFriendGu.png"/></span>`
      );
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/frameFriendChoki.png"/></span>`
      );
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/frameFriendPa.png"/></span>`
      );
    }
  } else if (exist == 1) {
    $(`#cell${x}${y}`).html(`<span id="user_100"></span>`);
  } else if (exist == 2) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/kingFriendGu.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/kingFriendChoki.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/kingFriendPa.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    }
  } else if (exist == 3) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/knightFriendGu.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/knightFriendChoki.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(
        `<span id="user1_${komaData}"><img src="./img/knightFriendPa.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    }
  }
}

function upDate2(x, y, hand, komaData, exist) {
  if (exist == 0) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/frameEnemyGu.png"/></span>`
      );
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/frameEnemyChoki.png"/></span>`
      );
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/frameEnemyPa.png"/></span>`
      );
    }
  } else if (exist == 1) {
    $(`#cell${x}${y}`).html(`<span id="user_100"></span>`);
  } else if (exist == 2) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/kingEnemyGu.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/kingEnemyChoki.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/kingEnemyPa.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    }
  } else if (exist == 3) {
    if (hand == 1) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/knightEnemyGu.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 2) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/knightEnemyChoki.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    } else if (hand == 3) {
      $(`#cell${x}${y}`).html(
        `<span id="user2_${komaData}"><img src="./img/knightEnemyPa.png"/></span>`
      );
      $(`#cell${x}${y}`).css("color", "red");
    }
  }
}

function deleteFrame(tempx, tempy) {
  console.log("デリート" + tempx + tempy);
  $(`#cell${tempx}${tempy}`).html(`<span id="user_100"></span>`);
}

// いっっっっk
// user2を作る
function createUser2() {
  let userArray2 = [
    {
      x: 0,
      y: 0,
      hand: (hand = handArrayShuffled2[0]),
      exist: 0
    },
    {
      x: 1,
      y: 0,
      hand: (hand = handArrayShuffled2[1]),
      exist: 3
    },
    {
      x: 2,
      y: 0,
      hand: (hand = handArrayShuffled2[2]),
      exist: 0
    },
    {
      x: 3,
      y: 0,
      hand: (hand = handArrayShuffled2[3]),
      exist: 0
    },
    {
      x: 4,
      y: 0,
      hand: (hand = handArrayShuffled2[4]),
      exist: 2
    },
    {
      x: 5,
      y: 0,
      hand: (hand = handArrayShuffled2[5]),
      exist: 0
    },
    {
      x: 6,
      y: 0,
      hand: (hand = handArrayShuffled2[6]),
      exist: 0
    },
    {
      x: 7,
      y: 0,
      hand: (hand = handArrayShuffled2[7]),
      exist: 3
    },
    {
      x: 8,
      y: 0,
      hand: (hand = handArrayShuffled2[8]),
      exist: 0
    },
    {
      x: 0,
      y: 2,
      hand: (hand = handArrayShuffled2[9]),
      exist: 0
    },
    {
      x: 1,
      y: 2,
      hand: (hand = handArrayShuffled2[10]),
      exist: 0
    },
    {
      x: 2,
      y: 2,
      hand: (hand = handArrayShuffled2[11]),
      exist: 0
    },
    {
      x: 3,
      y: 2,
      hand: (hand = handArrayShuffled2[12]),
      exist: 0
    },
    {
      x: 4,
      y: 2,
      hand: (hand = handArrayShuffled2[13]),
      exist: 0
    },
    {
      x: 5,
      y: 2,
      hand: (hand = handArrayShuffled2[14]),
      exist: 0
    },
    {
      x: 6,
      y: 2,
      hand: (hand = handArrayShuffled2[15]),
      exist: 0
    },
    {
      x: 7,
      y: 2,
      hand: (hand = handArrayShuffled2[16]),
      exist: 0
    },
    {
      x: 8,
      y: 2,
      hand: (hand = handArrayShuffled2[17]),
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
      hand: (hand = handArrayShuffled1[0]),
      exist: 0
    },
    {
      x: 1,
      y: 6,
      hand: (hand = handArrayShuffled1[1]),
      exist: 0
    },
    {
      x: 2,
      y: 6,
      hand: (hand = handArrayShuffled1[2]),
      exist: 0
    },
    {
      x: 3,
      y: 6,
      hand: (hand = handArrayShuffled1[3]),
      exist: 0
    },
    {
      x: 4,
      y: 6,
      hand: (hand = handArrayShuffled1[4]),
      exist: 0
    },
    {
      x: 5,
      y: 6,
      hand: (hand = handArrayShuffled1[5]),
      exist: 0
    },
    {
      x: 6,
      y: 6,
      hand: (hand = handArrayShuffled1[6]),
      exist: 0
    },
    {
      x: 7,
      y: 6,
      hand: (hand = handArrayShuffled1[7]),
      exist: 0
    },
    {
      x: 8,
      y: 6,
      hand: (hand = handArrayShuffled1[8]),
      exist: 0
    },
    {
      x: 0,
      y: 8,
      hand: (hand = handArrayShuffled1[9]),
      exist: 0
    },
    {
      x: 1,
      y: 8,
      hand: (hand = handArrayShuffled1[10]),
      exist: 3
    },
    {
      x: 2,
      y: 8,
      hand: (hand = handArrayShuffled1[11]),
      exist: 0
    },
    {
      x: 3,
      y: 8,
      hand: (hand = handArrayShuffled1[12]),
      exist: 0
    },
    {
      x: 4,
      y: 8,
      hand: (hand = handArrayShuffled1[13]),
      exist: 2
    },
    {
      x: 5,
      y: 8,
      hand: (hand = handArrayShuffled1[14]),
      exist: 0
    },
    {
      x: 6,
      y: 8,
      hand: (hand = handArrayShuffled1[15]),
      exist: 0
    },
    {
      x: 7,
      y: 8,
      hand: (hand = handArrayShuffled1[16]),
      exist: 3
    },
    {
      x: 8,
      y: 8,
      hand: (hand = handArrayShuffled1[17]),
      exist: 0
    }
  ];
  return userArray1;
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
function shuffledArray1(convoy) {
  var team1 = convoy;
  for (i = team1.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = team1[i];
    team1[i] = team1[j];
    team1[j] = tmp;
  }
  console.log("team1.length" + team1.length);
  return team1;
}

function shuffledArray2(convoy) {
  var team2 = convoy;
  for (k = team2.length - 1; k > 0; k--) {
    var l = Math.floor(Math.random() * (k + 1));
    var tmp = team2[k];
    team2[k] = team2[l];
    team2[l] = tmp;
  }
  console.log("team2.length" + team2.length);
  return team2;
}

function makeArray1() {
  handArrayConvoy1 = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
  return handArrayConvoy1;
}
function makeArray2() {
  handArrayConvoy2 = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
  return handArrayConvoy2;
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
