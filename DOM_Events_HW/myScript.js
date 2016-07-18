

function makeTable(){
    var tableau = document.createElement("table");

    for (var i = 0; i < 4; i++) {
      var tr = document.createElement("tr");
      for (var k = 0; k < 4; k++) {
        if (i == 0) {
          var th = document.createElement("th");
          th.textContent = "Header " + (k+1);
          tr.appendChild(th);
        } else {
          var td = document.createElement("td");
          td.textContent = (k+1) + ", " + i;
          if(k == 0){
              td.setAttribute("id", "selected");
          }
          tr.appendChild(td);
        }

      }
    	tableau.appendChild(tr);
    }

    document.getElementById("tblCont").appendChild(tableau);
    selectCell(document.getElementById("selected"));

}

function Buttons(){

    var upButton = document.createElement("button");
    upButton.textContent = "Up";
    upButton.addEventListener("click", moveUp);
    document.getElementById("up").appendChild(upButton);

    var downButton = document.createElement("button");
    downButton.textContent = "Down";
    downButton.addEventListener("click", moveDown);
    document.getElementById("down").appendChild(downButton);

    var leftButton = document.createElement("button");
    leftButton.textContent = "Left";
    leftButton.addEventListener("click", moveLeft);
    document.getElementById("left").appendChild(leftButton);

    var rightButton = document.createElement("button");
    rightButton.textContent = "Right";
    rightButton.addEventListener("click", moveRight);
    document.getElementById("right").appendChild(rightButton);

    var selectButton = document.createElement("button");
    selectButton.textContent = "Mark Cell";
    selectButton.addEventListener("click", markCell);
    document.getElementById("select").appendChild(selectButton);

}

function moveUp(){
    var x = document.getElementById("selected");
    var y = 0;
    console.log(x.parentNode.parentNode.rows.length) // 4
    var tableau = x.parentNode.parentNode;
    var isTop = false;
    var xRow = 0;
    var xCol = 0;
    var temp = tableau.rows[1].firstElementChild;
    for(var i = 0; i < tableau.rows.length; i++){
        for(var m = 0; m < tableau.rows[i].cells.length; m++){
            if(x == tableau.rows[i].cells[m]){
                xRow = i;
                xCol = m;
                // console.log(i);
                // console.log(m);
                if(i == 1){
                    isTop = true;
                }
            }
        }
    }
    if(!isTop){
        y = tableau.rows[xRow-1].cells[xCol];
        x.removeAttribute("id");
        x.style.border = "0px";
        y.setAttribute("id", "selected");
        y.style.border = "2px solid black";
    }

}

function moveDown(){

    var x = document.getElementById("selected");
    var y = 0;
    console.log(x.parentNode.parentNode.rows.length) // 4
    var tableau = x.parentNode.parentNode;
    var isBot = false;
    var xRow = 0;
    var xCol = 0;
    var temp = tableau.rows[1].firstElementChild;
    for(var i = 0; i < tableau.rows.length; i++){
        for(var m = 0; m < tableau.rows[i].cells.length; m++){
            if(x == tableau.rows[i].cells[m]){
                xRow = i;
                xCol = m;
                // console.log(i);
                // console.log(m);
                if(i == tableau.rows.length-1){
                    isTop = true;
                }
            }
        }
    }
    if(!isBot){
        y = tableau.rows[xRow+1].cells[xCol];
        x.removeAttribute("id");
        x.style.border = "0px";
        y.setAttribute("id", "selected");
        y.style.border = "2px solid black";
    }
}


function moveLeft(){
    var x = document.getElementById("selected");
    if(x != x.parentNode.firstElementChild){
        var y = x.previousElementSibling;
        x.removeAttribute("id");
        x.style.border = "0px";
        y.setAttribute("id", "selected");
        y.style.border = "2px solid black";
    }
}

function moveRight(){
    var x = document.getElementById("selected");
    if(x != x.parentNode.lastElementChild){
        var y = x.nextElementSibling;
        x.removeAttribute("id");
        x.style.border = "0px";
        y.setAttribute("id", "selected");
        y.style.border = "2px solid black";
    }
}

function selectCell(x){
    //var x = document.getElementById("selected");
    x.setAttribute("id", "selected");
    x.style.border = "2px solid black";
}

function markCell(){
    var y = document.getElementById("selected");
    y.style.background = "yellow";
}

makeTable();
Buttons();
