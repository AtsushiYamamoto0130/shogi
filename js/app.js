let user1 = new Array();
let user2 = new Array();
let frame = 0;
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
      frame = user2[second];
    } else if (first == user1) {
      flag = 1;
      frame = user1[second];
    }
    console.log("flag :" + flag);
    //クリック2 user2
  } else if (flag == 2) {
    let komaData = $(this)
      .attr("id")
      .slice(4);
    let place = komaData.split("");
    x = place[0];
    y = place[1];
    let tempx = frame.x;
    let tempy = frame.y;
    frame.x = x;
    frame.y = y;
    update2(user2, tempx, tempy);
    flag = 0;
    // クリック２　user1
  } else if (flag == 1) {
    let komaData = $(this)
      .attr("id")
      .slice(4);
    let place = komaData.split("");
    x = place[0];
    y = place[1];
    let tempx = frame.x;
    let tempy = frame.y;
    frame.x = x;
    frame.y = y;
    update1(user1, tempx, tempy);
    flag = 0;
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

function update1(user1, tempx, tempy) {
  console.log("更新中");
  let user = user1;
  $(`#cell${tempx}${tempy}`).html("");

  for (let i = 0; i < 18; i++) {
    let userObj = user[i];
    if (userObj.exist == 1) {
      userObj.x = 10;
      userObj.y = 10;
    }
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
function update2(user2, tempx, tempy) {
  console.log("更新中");
  let user = user2;

  $(`#cell${tempx}${tempy}`).html("");

  console.log(user);
  for (let j = 0; j < 18; j++) {
    let userObj = user[j];
    if (userObj.hand == 1) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("グー");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user2_${j}">グー</span>`
      );
    } else if (userObj.hand == 2) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("チョキ");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user2_${j}">チョキ</span>`
      );
    } else if (userObj.hand == 3) {
      // $(`#cell${user1Obj.x}${user1Obj.y}`).html("パー");
      $(`#cell${userObj.x}${userObj.y}`).html(
        `<span id="user2_${j}">パー</span>`
      );
    }
  }
}

// じゃんけんの判定:white(味方),black(相手)
function judgeMent(user1, user2) {
  let judgeMent = 0;
  console.log((white - black + 3) % 3);
  if ((white - black + 3) % 3 == 2) {
    console.log("user1の勝利、user2の負け");
    judgeMent = white;
  } else if (white - black + (3 % 3) == 1) {
    console.log("user2の勝利、user1の負け");
    judgeMent = black;
  } else if ((white - black + 3) % 3 == 0) {
    console.log("引き分け");
    judgeMent = 0;
  }
  return judgeMent;
}
