$(function() {
  $("#input").html("0");
  var arr = ["√", "^", "ln", "π", "(-)", "!", "e", "sin", "cos", "tan"];
  var arr1 = ["√", "^", "ln", "(-)", "sin", "cos", "tan"]
  var opStr = "";
  var endStr = "";
  var miscOp = {
    e: 2.718281828459045,
    pi: 3.141592653589793
  }
  
  //Add button content to string
  function operation() {
    console.log(opStr.length);
    if (opStr.length > 17) {
      $("#input").html("MAX LIMIT REACHED");
      opStr = "";
    }
    var misc = "+-^x÷!";
    var e = event.target;
    //Prevent operators from being added first/after non-numbers
    if ((opStr[opStr.indexOf(" ") - 1] === "π" || opStr[opStr.indexOf(" ") - 1] === "e") || opStr[opStr.indexOf(" ") - 1] === "0" && misc.indexOf(e.textContent) !== -1) {
      opStr += e.textContent + " ";
      $("#input").html(opStr)
    }
    else if (opStr === "" && misc.indexOf(e.textContent) !== -1) {
      event.preventDefault();
    }
    else if (!Number(opStr[opStr.length - 1]) && misc.indexOf(e.textContent) !== -1) {
      event.preventDefault();
    }
    else {
      if (!Number(e.textContent)) {
        if (e.textContent === "0") {
          opStr += e.textContent + " ";
          $("#input").html(opStr);
        }
        else if (opStr === "") {
          opStr += e.textContent + " ";
          $("#input").html(opStr)
        }
        else {
          opStr += " " + e.textContent + " ";
          $("#input").html(opStr)
        }  
      }
      else {
        opStr += e.textContent;
        $("#input").html(opStr)
      }  
    }
  }  
  
  //Evaluate string content
  function evaluate() {
    endStr = ""; 
    var opStrArr = opStr.split(" ");
    console.log(opStrArr);
    if (opStrArr[opStrArr.indexOf("e") - 1] === "") {
      opStrArr.splice(opStrArr.indexOf("e") - 1, 1);
    }
    var sum = 1;
    for (var i = 0; i < opStrArr.length; i++) { 
      if (opStrArr[i] === "√") {
          if (((Number(opStrArr[i + 1]) || opStrArr[i + 1] === "0") && Number(opStrArr[i - 1])) ||(opStrArr[i - 1] === "π" && opStrArr[i + 1] === "π") || (opStrArr[i - 1] === "e" && opStrArr[i + 1] === "e") ) {
            endStr += "" + "(" + opStrArr[i - 1] + ")" + "*" + "Math.sqrt(" + opStrArr[i + 1] + ")";
          }
          else if (Number(opStrArr[i + 1])) { 
            endStr += "Math.sqrt(" + opStrArr[i + 1] + ")";
          }  
      } 
      else if (opStrArr[i] === "^") {
        endStr += "Math.pow(" + opStrArr[i - 1] + "," + opStrArr[i + 1] + ")";
      }
      else if (opStrArr[i] === "sin") {
        if ((Number(opStrArr[i - 1]) && Number(opStrArr[i + 1])) || (opStrArr[i - 1] === "π" && opStrArr[i + 1] === "π") || (opStrArr[i - 1] === "e" && opStrArr[i + 1] === "e")){
          endStr += "" + opStrArr[i - 1] + "*" + "(" + "Math.sin(" + opStrArr[i + 1] + ")" + ")";
        }
        else {
          endStr += "Math.sin(" + opStrArr[i + 1] + ")";
        }  
      }
      else if (opStrArr[i] === "cos") {
        if ((Number(opStrArr[i - 1]) && Number(opStrArr[i + 1])) || ((opStrArr[i - 1] === "π") && opStrArr[i + 1] === "π") || ((opStrArr[i - 1] === "e") && opStrArr[i + 1] === "e")) {
          endStr += "" + opStrArr[i - 1] + "*" + "(" + "Math.cos(" + opStrArr[i + 1] + ")" + ")";
        }
        else {
          endStr += "Math.cos(" + opStrArr[i + 1] + ")";
        }  
      }
      else if (opStrArr[i] === "tan") {
        if ((Number(opStrArr[i - 1]) && Number(opStrArr[i + 1])) || ((opStrArr[i - 1] === "π") && opStrArr[i + 1] === "π") || ((opStrArr[i - 1] === "e") && opStrArr[i + 1] === "e")) {
          endStr += "" + opStrArr[i - 1] + "*" + "(" + "Math.tan(" + opStrArr[i + 1] + ")" + ")";
        }
        else {
          endStr += "Math.tan(" + opStrArr[i + 1] + ")";
        }  
      }
      else if (opStrArr[i] === "ln") {
        if ((Number(opStrArr[i - 1]) && Number(opStrArr[i + 1])) || ((opStrArr[i - 1] === "π") && opStrArr[i + 1] === "π") || ((opStrArr[i - 1] === "e") && opStrArr[i + 1] === "e")) {
          endStr += "" + opStrArr[i - 1] + "*" + "(" + "Math.log(" + opStrArr[i + 1] + ")" + ")";
        }
        else {
          endStr += "Math.log(" + opStrArr[i + 1] + ")";
        }  
      }
      else if (opStrArr[i] === "π") {
        if (arr1.indexOf(opStrArr[i - 1]) !== -1 || arr1.indexOf(opStrArr[i + 1]) !== -1) {
          continue;
        }
        if (Number(opStrArr[i - 1])) {
          endStr += "" + opStrArr[i - 1] + "*" + miscOp.pi;
        }
        else if (Number(opStrArr[i + 1])) {
          endStr += "error";
        }
        else {
          endStr += "" + miscOp.pi;
        }
      }
      else if (opStrArr[i] === "e") {
        if (arr1.indexOf(opStrArr[i - 1]) !== -1 || arr1.indexOf(opStrArr[i + 1]) !== -1) {
          continue;
        }
        else if (Number(opStrArr[i - 1])) {
          endStr += "" + opStrArr[i - 1] + "*" + miscOp.e;
        }
        else if (Number(opStrArr[i + 1])) {
          endStr += "error";
        }
        else {
          endStr += "" + miscOp.e;
        }
      }
      else if (opStrArr[i] === "(-)") {
        if (Number(opStrArr[i - 1])) {
          endStr += "error";
        }
        else {
          endStr += "(" + "-" + opStrArr[i + 1] + ")";
        }
      }
      else if (opStrArr[i] === "!") {
        if (Number(opStrArr[i + 1])) {
          endStr += "error";
        }
        else if (Number(opStrArr[i - 1]) && opStrArr[i - 1] % 1 === 0) {
          var num = Number(opStrArr.slice(i - 1, i));
          while (num > 0) {
            sum *= num;
            num--;
          }
          endStr += "" + sum;
        }
      }  
        else if (opStrArr[i] === "x") {
          endStr += "*";
        }
        else if (opStrArr[i] === "÷") {
          endStr += "/";
        }
        else if (Number(opStrArr[i]) && (arr.indexOf(opStrArr[i + 1]) !== -1 || arr.indexOf(opStrArr[i - 1]) !== -1)) {
          continue;
        }
        else {
          endStr += opStrArr[i];
        }
    }
    endStr = endStr.replace(/π/g, "3.141592653589793");
    endStr = endStr.replace(/e/g, "2.718281828459045")
    if (endStr.indexOf("err") !== -1) {
        $("#input").html("INVALID SYNTAX!");
      }
    else {
      try {
        var calc = eval(endStr);
      }  
      catch(err) {
        if (err.name === "SyntaxError") {
         $("#input").html("INVALID SYNTAX!");
        }
      }
      var calc = eval(endStr);
      console.log(calc);
        if(calc.toString().length > 18) {
          $("#input").html("MAX LIMIT REACHED");
        }
      else {
        $("#input").html(calc);
      }  
      return calc;
    }
    
}  
  
  //Button click functions
  $("#square").click(operation);
  $("#exp").click(operation);
  $("#natlog").click(operation);
  $("#pi").click(function() {
    if (opStr === "") {
      opStr += "π" + " ";
      $("#input").html(opStr)
    }
    else {
      if (Number(opStr[opStr.length - 1])) {
        opStr += " " + "π" + " ";   
        $("#input").html(opStr); 
      } 
      else {    
        opStr += "π" + " ";
        $("#input").html(opStr);
      }
    }
  });
  $("#neg").click(operation);
  $("#fact").click(operation);
  $("#euler").click(operation);
  $("#sin").click(operation);
  $("#cos").click(operation);
  $("#tan").click(operation);
  $("#7").click(operation);
  $("#8").click(operation);
  $("#9").click(operation);
  $("#delete").click(function() {
    $("#input").text(opStr.slice(0, opStr.length - 1));
    opStr = opStr.slice(0, opStr.length - 1);
  });
  $("#clear").click(function() {
    $("#input").html("0")
    opStr = "";
    endStr = "";
  });
  $("#4").click(operation);
  $("#5").click(operation);
  $("#6").click(operation);
  $("#mult").click(operation);
  $("#div").click(operation);
  $("#1").click(operation);
  $("#2").click(operation);
  $("#3").click(operation);
  $("#add").click(operation);
  $("#sub").click(operation);
  $("#0").click(operation);
  $("#dec").click(operation);
  $("#answer").click(function() {
    var ans = evaluate();
    opStr = "" + ans;
  });
  $("#equals").click(evaluate);
})