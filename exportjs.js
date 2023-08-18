function p(t){
    console.log(t);
}

function importClass() {
    prev_classes = document.querySelectorAll('.classes_row.export');
    prev_classes.forEach(element => {
        element.remove();
    });
    
    all_classes_import = document.querySelectorAll('#list_container_selected div.classes_row');
    all_classes_export = [];
    all_classes_import.forEach(element => {
        class_name = element.children[1].innerText.replace(/\s/g, '');

        all_classes_export.push({'ClassID': element.children[11].innerText,
                                 'Name': class_name,
                                 'Time': element.children[2].innerHTML,
                                 'Grade': element.children[3].innerText,
                                 'Department': element.children[4].innerText,
                                 'value': '',
                                 'isSel': '-'});
    addanRow_export(all_classes_export.slice(-1)[0]);
    });
    
    p(all_classes_export);
}

function exportClass(){
    all_classes_export = document.querySelectorAll('.classes_row.export');
    my_classes = [];

    all_classes_export.forEach(element => {
        isSel = element.children[0].children[0].children[0].checked;
        class_id = element.children[5].innerText;
        value = element.children[6].children[0].value;

        // p(isSel)
        // p(class_id);
        // p(value);
        if (isSel){
            isSel = '+';
            my_classes.push({'id': class_id,
                             'value': value,
                             'isSel': isSel});
        }
    });
    document.getElementById('export_modal_classes_num').innerText = my_classes.length;

    //generate js code
    var gen_code = `my_class = ${JSON.stringify(my_classes)};\n\n
for (let i = 0; i < my_class.length; i++) {
    document.querySelectorAll('input')[2*i].value = my_class[i]['id'];
    document.querySelectorAll('input')[2*i+1].value = my_class[i]['value'];
    document.querySelectorAll('select')[i].value = my_class[i]['isSel'];
}`

    navigator.clipboard.writeText(gen_code);
    document.querySelector('.export_modal_code_view span').innerText = gen_code;
    $('#export_code_modal').modal("show");
    document.querySelector('.succPage_container').setAttribute('style', 'display: block;');
    

}

function addanRow_export(class_info){
    var tableRow = document.getElementById('list_content_export');
    var row = document.createElement('div');
    row.className = 'classes_row export';
    

    row.id=class_info["ClassID"]+"_export";
    row.setAttribute('onmouseover',`selectedHover("${class_info['ClassID']}");`);
    if(class_info["Pending"]){
        row.setAttribute('onmouseout',`selectedLeave("${class_info['ClassID']}","pending");`);
    }
    else{
        row.setAttribute('onmouseout',`selectedLeave("${class_info['ClassID']}","norm");`);
    }

    tableRow.appendChild(row);
    

    //加選
    var cell0 = document.createElement('div')
    cell0.innerHTML=`<div style="text-align: center">
        <input type="checkbox" style=" align: center">
    </div>`;

    cell0.className="classes_cell";
    row.appendChild(cell0);

    //課程名稱
    var cell1 = document.createElement('div')
    cell1.innerHTML = `
        <div> ${class_info["Name"]} </div>
    `
    cell1.className="classes_cell"
    row.appendChild(cell1);

    //時間
    var cell2 = document.createElement('div')
    cell2.innerHTML = class_info["Time"];
    cell2.className="classes_cell";
    row.appendChild(cell2);

    //年級班級
    var cell3 = document.createElement('div')
    cell3.innerHTML = `<div style="text-align: center; " > ${class_info["Grade"]} </div>`
    cell3.className="classes_cell"
    row.appendChild(cell3);

    //上課系所
    var cell4 = document.createElement('div')
    cell4.innerHTML = class_info["Department"];
    cell4.className="classes_cell"
    row.appendChild(cell4);

    
    //課號
    var cell11 = document.createElement('div')
    cell11.innerHTML = class_info["ClassID"];
    cell11.className="classes_cell";
    row.appendChild(cell11);

    //值
    var cell12 = document.createElement('div');
    // add an input box
    cell12.innerHTML = `<input type="text" class="value_input" id="${class_info["ClassID"]}_value" value="">`;
    cell12.className="classes_cell";
    row.appendChild(cell12);

}
