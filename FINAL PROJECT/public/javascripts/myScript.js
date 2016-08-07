
//CODE FROM jsfiddle provided by instructor
function deleteRow(tableID,currentRow) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];

            if (row==currentRow.parentNode.parentNode) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    } catch (e) {
        alert(e);
    }
    //getValues();
}

document.getElementById('addActivity').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
    payload.name = document.getElementById('name').value;
    payload.reps = document.getElementById('reps').value;
    payload.weight = document.getElementById('weight').value;
    payload.date = document.getElementById('date').value;
    payload.lbs = document.getElementById('lbs').value;

    req.open('POST', '/insert' , true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
    var tbl = document.getElementById('exercises');
    var tr = document.createElement('tr');
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var delbutt = document.createElement("input");
    delbutt.type = "button";
    delbutt.value = "delete";
    delbutt.addEventListener('click', deleteRow(exercises, delbutt));
    td1.textContent = payload.name;
    td2.textContent = payload.reps;
    td3.textContent = payload.weight;
    td4.textContent = payload.lbs;
    td5.textContent = payload.date;
    td6.appendChild(delbutt);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tbl.appendChild(tr);







  });
