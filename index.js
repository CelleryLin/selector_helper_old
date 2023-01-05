function functionaddRow(){
    var tableRow = document.getElementById("list_content");
    var row = tableRow.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Cell of New Row";
    cell2.innerHTML = "Cell of New Row";
    cell3.innerHTML = "Cell of New Row";
}



Papa.parse("./all_classes.txt", {
	complete: function(results) {
		console.log(results);
	}
});