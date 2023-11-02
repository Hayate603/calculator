$(document).ready(function(){
var number = $(".number");
var display = $("#display .display-text");
var decimalPoint = $("#decimal-point");
var equal = $("#equal");
var ac = $("#ac");
var operator = $(".operator");

var availableDecimalPoint = true; //小数点が使える状況かどうか 
var secondNumber = false; //2個目の数字を入力待ちかどうか
var afterEqual = false; //＝を押した直後か
var availableOperator = false;//演算子を使える状態かどうか
var operatorNumber = ""; //計算式のタイプを格納する変数（1=足し算、2=引き算、3=掛け算、4=割り算）
var number1 = "";  //計算に使う数字を格納する変数
var number2 = "";  //計算に使う数字を格納する変数

//全ての表示を消す関数
function allclear() {
  display.text("");
  number1 = number2 = operatorNumber = "";
  availableDecimalPoint = true;
  secondNumber = false;
  afterEqual = false;
  availableOperator = false;
}

//ディスプレイに数字を表示する関数
function output() {
  display.text(String(number1) + fromOperationNumberToString(operatorNumber) + String(number2));
}

// 演算
function calculation() {
  var result;
  if(number2 == false){//2番目の数字が空だったら無効
    return;
  }
  if(operatorNumber == 1) {//演算子のvelueの値で条件分岐
    result = parseFloat(number1) + parseFloat(number2);
  } else if(operatorNumber == 2) {
    result = parseFloat(number1) - parseFloat(number2);
  } else if(operatorNumber == 3) {
    result = parseFloat(number1) * parseFloat(number2);
  } else if(operatorNumber == 4) {
    result = parseFloat(number1) / parseFloat(number2);
  } else {//演算子を押してない最初の状態のときはそのまま返す
    return "";
  }
  number1 = result;//number1に結果を保存
  number2 = "";//number2は空にする
  operatorNumber = "";//演算子も空にする
  output();//計算結果をディスプレイに表示
  availableDecimalPoint = true;//小数点が使える状態にする
  secondNumber = true;//計算結果をnumber1に入れているため2番目の入力状態にする
  availableOperator = true;//計算結果を利用してそのまま計算できるように演算子を使える状態にする
}

//演算子を文字に変換する関数
function fromOperationNumberToString(i) {
  if(i == 1) {
    return "+";
  } else if(i == 2) {
    return "-";
  } else if(i == 3) {
    return "×";
  } else if(i == 4) {
    return "÷";
  } else if(i == 0) {
    return "";
  }
}




// 数字をクリックした時の処理
number.click(function(){
  if(afterEqual == true) {//＝を押した後数字を押したら
    allclear();
  }
  var moji = $(this).text();
  if(secondNumber == false) {//1番目の数字のとき
    if(number1 === "" && moji === "00") {//最初に00を押したとき
      return;
    }
    if(number1 === "0" && moji != 0){//最初に0を押して次に0以外の数字を押したとき
      number1 = moji;
    }else if(number1 === "0" && moji == 0){//最初に0を押して次に0か00を押したとき
      return;
    }else {//それ以外だったらnumber1に文字列として繋ぎ合わせる
      number1 += moji;
    }
  }else if(secondNumber == true){//2番目の数字のとき
    if(number2 === "" && moji === "00") {
      return;
    }
    if(number2 === "0" && moji != 0){
      number2 = moji;
    }else if(number1 === "0" && moji == 0){
      return;
    }else {
      number2 += moji;
    }
  }
  output();//ディスプレイに反映させる；
  availableOperator = true;//演算子を使える状態にする
})

// 小数点を押した時の処理
decimalPoint.click(function(){
  if(afterEqual == true) {//=を押して計算が終わって小数点を押したとき
    allclear();
  }
  if(availableDecimalPoint == true) {//小数点が使える状態
    var moji = $(this).text();
    if(secondNumber == false){//1番目の数字の入力状態
      if(number1 == ""){//まだ数字が入力されていない状態で小数点が入力されたとき
        moji = "0.";//0が入力されていなくても自動で「0.」と入力
      }
      number1 += moji;
    }else if(secondNumber == true){
      if(number2 == ""){
        moji = "0.";
      }
      number2 += moji;
    }
    output();//ディスプレイに反映
    availableDecimalPoint = false;//小数点を使えないようにする
    availableOperator = false;//演算子を入力できないようにする
  }
});

// ACボタンを押した時の処理
ac.click(function() {
  allclear();
});

// 演算子ボタンを押した時の処理
operator.click(function() {
  if(availableOperator == false){//演算子が使えない状態のとき
    return;
  }
  if(number2 != false) {//2番目の数字があるとき（数字、演算子、数字、演算子の順番で押された時）
    calculation();
  }
  operatorNumber = $(this).val();//演算子のvelueの値を入れる
  output();//ディスプレイに反映させる
  secondNumber = true;//2番目の数字の入力状態にする
  availableDecimalPoint = true; //小数点を使える状態にする
  availableOperator = false; //演算子を使えない状態にする
  afterEqual = false; //=の直後ではない
});

// ＝を押した時の処理
equal.click(function() {
  calculation();
  afterEqual = true; //=の直後
});








});