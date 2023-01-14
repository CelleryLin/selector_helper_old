var filter_Name=[];
var filter_Time=[];
var filter_Day=[];
var filter_Grade=[];
var filter_Class=[];
var filter_Dep=[];
var filter_Compulsory=[];
var filter_Credit=[];
var filter_Teacher=[];
var filter_Programs=[];
var filter_EMI=[];
var filter_Room=[];
const filter_category=['課程名稱', '時間', '星期', '年級', '班別', '上課系所', '必選修', '學分數', '授課教師', '所屬學程', '英文授課'];
const filter_category_index=['Class', 'Time', 'Day', 'Grade', 'ClassCat', 'Dep', 'Comp', 'Credit', 'Teacher', 'Prog', 'EMI'];
function p(a){
    console.log(a);
}

function t(){
    p("hi");
}
function getUnique(a) {
    return [...new Set(a)];
}
function filter_Init(all_classes){
    //課名
    filter_Name=[]; //pass

    //時間
    filter_Time=['A','1','2','3','B','4','5','6','7','8','9','C','D','E','F'];

    //星期
    filter_Day=['一','二','三','四','五','六','日'];

    //年級
    filter_Grade=['(無)','一','二','三','四'];
    filter_Grade_trans=['','一','二','三','四'];

    //班級
    filter_Class=['甲','乙','全英'];

    //系所
    all_classes.map((val) => filter_Dep.push(val.Department))
    filter_Dep=getUnique(filter_Dep);
    filter_Dep.splice(filter_Dep.indexOf("博雅向度一"), 0, '博雅向度全');
    //p(filter_Dep);

    //必選
    filter_Compulsory=['必修','選修'];
    filter_Compulsory_trans=['必','選'];

    //學分
    all_classes.map((val) => filter_Credit.push(val.Credits))
    filter_Credit=getUnique(filter_Credit).map((x) => {return parseFloat(x, 10); });
    filter_Credit.sort((a, b) => {
        return a - b;
    });
    //p(filter_Credit);

    //老師
    //all_classes.map((val) => {
    //    filter_Teacher = filter_Teacher.concat(val.Teacher);
    //});
    //filter_Teacher=getUnique(filter_Teacher);
    //p(filter_Teacher);
    filter_Teacher=[];   //pass

    //學程
    //all_classes.map((val) => {
    //    filter_Programs = filter_Programs.concat(val.Programs);
    //});
    //filter_Programs=getUnique(filter_Programs);
    //p(filter_Programs);
    filter_Programs=[];   //pass

    //EMI
    filter_EMI=['非英文授課','英文授課'];

    //篩選器種類
    
    const filter_selector=document.getElementById("select_filter_content")
    filter_category.map((val, index) => {
        const newdiv = document.createElement('div');
        newdiv.innerHTML=`
            <div class="filter_select_btn" onclick="appendFilter('${index}')">
                <span style="padding: 8px;" >${val}</span>
            </div>
        `;
        filter_selector.appendChild(newdiv);
    });

}
function updateCheckbox(class_info){
    
    var classrow = document.getElementById(class_info["ClassID"]+"_selected");
    if(classrow != null){
        classrow.childNodes[0].childNodes[0].childNodes[1].checked=class_info["Select"];
    }
    var classrow = document.getElementById(class_info["ClassID"]);
    classrow.childNodes[0].childNodes[0].childNodes[1].checked=class_info["Select"];

    save_course();
}

function addanRow(tableRow, class_info, id_selector, i){
    var row = tableRow.insertRow(-1);
    if(i%2==0){
        row.className = 'classes_row_even';
    }
    else{
        row.className = 'classes_row_odd';
    }
    if(id_selector=="list"){
        row.id=class_info["ClassID"];
    }
    else if(id_selector=="selected"){
        row.id=class_info["ClassID"]+"_selected";
    }
    

    //選擇
    var list_i=0;
    if(class_info["Select"]){
        row.insertCell(list_i).innerHTML =`<div style="text-align: center"> <input type="checkbox" style=" align: center" onchange='handleChange(this,${i});' checked> </div>`;
    }
    else{
        row.insertCell(list_i).innerHTML =`<div style="text-align: center"> <input type="checkbox" style=" align: center" onchange='handleChange(this,${i});'> </div>`;
    } 
    row.cells[list_i].className="cell_selected";
    
    list_i++

    //課程名稱
    row.insertCell(list_i).innerHTML = class_info["Name"];
    row.cells[list_i].className="cell_name"
    list_i++

    //時間
    var times = class_info["Time"];
    var times_html = "";
    for(j=0;j<times.length;j++){
        times_html += ("<div style=\"text-align: center; margin: 1px; padding: 3px; background-color: #D5CAF9; border-radius: 3px \" >" + times[j] + "</div>");
    }
    row.insertCell(list_i).innerHTML = times_html;
    row.cells[list_i].className="cell_time";
    list_i++

    //年級班級
    row.insertCell(list_i).innerHTML = `<div style="text-align: center; " > ${class_info["Grade"]} </div>`
    row.cells[list_i].className="cell_class"
    list_i++

    //上課系所
    row.insertCell(list_i).innerHTML = class_info["Department"];
    row.cells[list_i].className="cell_dep"
    list_i++

    //必選修
    row.insertCell(list_i).innerHTML = class_info["Compulsory"];
    row.cells[list_i].className="cell_com";
    list_i++

    //學分
    row.insertCell(list_i).innerHTML = class_info["Credits"];
    row.cells[list_i].className="cell_credit";
    list_i++

    //老師
    var teachers = class_info["Teacher"];
    var teacher_html = "";
    for(j=0;j<teachers.length;j++){
        teacher_html += `<div style="display: inline-block; text-align: center; margin: 3px; padding: 5px; background-color: #FCFCE0; border-radius: 3px " > ${teachers[j]}</div>`;
    }
    row.insertCell(list_i).innerHTML = teacher_html;
    row.cells[list_i].className="cell_teacher";
    list_i++
    
    //學程
    var programs = class_info["Programs"];
    if (programs[0]!=''){
        var programs_html = "";
        for(j=0;j<programs.length;j++){
            programs_html += ("<div style=\"text-align: left; margin: 3px; padding: 3px; background-color: #D5CAF9; border-radius: 3px \" >" + programs[j] + "</div>");
        }
        row.insertCell(list_i).innerHTML = programs_html;
    }
    else{
        row.insertCell(list_i).innerHTML = "";
    }
    row.cells[list_i].className="cell_prog";
    list_i++

    //EMI
    row.insertCell(list_i).innerHTML ="<div style=\"text-align: center; \" >" + class_info["EMI"] + "</div>"
    row.cells[list_i].className="cell_EMI";
    list_i++

    //教室
    row.insertCell(list_i).innerHTML =class_info["Room"];
    row.cells[list_i].className="cell_room";

}

function addClassRow(all_classes, filter){
    list_delet_all_classes();
    var tableRow = document.getElementById("list_content");
    for(i=0;i<all_classes.length;i++){
        if(all_classes[i]["Visibility"]==1 || filter){
            addanRow(tableRow, all_classes[i],"list", i);
        }
    }
    all_classes.forEach(val => {
        val["Visibility"]=1;
    })
}
var all_class_raw=[];

function time_sort(class_info_tmp){
    const day_index=['一 ', '二 ', '三 ', '四 ', '五 ', '六 ', '日 '];
    var tmp=[];
    for(i=18;i<=24;i++){
        
        if (class_info_tmp[i]!=""){
            tmp.push(day_index[i-18]+class_info_tmp[i]);
        }
    }
    //console.log(tmp);
    //console.log('hi');
    return tmp;
}


function main(csv_data){
    const day_index=['一 ', '二 ', '三 ', '四 ', '五 ', '六 ', '日 '];
    const grade_index=['','一', '二','三', '四'];
    all_class_raw=csv_data.data
    if(JSON.parse(localStorage.getItem('NSYSU_Courses_Selector_Helper_Saved')) == null){
        t();
        all_classes=[]
        //for(i=1;i<all_class_raw.length-1;i++){
        for(i=1;i<1000;i++){
            //time_sort(all_class_raw[i]);
            var sorted_time=[];
            for(j=18;j<=24;j++){
                
                if (all_class_raw[i][j]!=""){
                    sorted_time.push(day_index[j-18]+all_class_raw[i][j]);
                }
            }
            class_info = {
                "Grade": (grade_index[all_class_raw[i][5]]+all_class_raw[i][6].split('班')[0]),
                "Department": all_class_raw[i][3],
                "Compulsory": all_class_raw[i][11],
                "Credits": all_class_raw[i][9],
                "Teacher": all_class_raw[i][16].split(','),
                "Time": sorted_time,
                "Programs": all_class_raw[i][26].replaceAll('\'','').replaceAll(' ','').split(','),
                "Room": all_class_raw[i][17],
                "EMI": all_class_raw[i][27],
                "Comment": all_class_raw[i][25],
                "Select": 0,
                "Name": all_class_raw[i][7],
                "ClassID": all_class_raw[i][4],
                "Visibility": 1
            };
            all_classes.push(class_info);
        }
    }
    else{
        all_classes=JSON.parse(localStorage.getItem('NSYSU_Courses_Selector_Helper_Saved'));
        all_classes.forEach(val => {
            if(val['Select']){
                insertClass(val,1);
                var tableRow = document.getElementById("list_content_selected");
                addanRow(tableRow, val, "selected", i);
            }
        })
        p(all_classes);
    }

    addClassRow(all_classes, 1)
    filter_Init(all_classes)
}


Papa.parse("./all_classes.csv", {
    download: true,	
    complete: function(csv_data) {
        main(csv_data);
	}
});

function ClassLayout(cell_index){
    if (cell_index.children.length != 0){
        cell_index.childNodes.forEach(function(th_i,th_index){
            var width = 100/cell_index.children.length;
            th_i.style.width = `${width}%`;
        });
    }
}

function insertClass(class_info, isSelected){
    const schedule = document.getElementById('schedule_content');
    for(i=0;i<class_info['Time'].length;i++){
        var timedata=class_info['Time'][i].split('');
        //console.log(timedata);
        for(j=0;j<timedata.length-2;j++){
            
            var day_tmp=-1;
            var time_tmp=-1;
            var row = schedule.rows[time_tmp];
            //console.log(row)
            switch(timedata[0]){
                case "一": day_tmp=1; break;
                case "二": day_tmp=2; break;
                case "三": day_tmp=3; break;
                case "四": day_tmp=4; break;
                case "五": day_tmp=5; break;
                case "六": day_tmp=6; break;
                case "日": day_tmp=7; break;
            }
            const cell_index = document.getElementById(day_tmp.toString() + timedata[j+2].toString())
            //var cell = row.cells[day_tmp];
            //console.log(cell)
            
            if (isSelected){
                var addedClass = document.createElement('div');
                addedClass.id = class_info['ClassID']+"_table";
                addedClass.innerHTML =`<span style="display: table-cell; vertical-align: middle;">${class_info["Name"]}<br>${class_info["ClassID"]}</span>`;
                addedClass.className="addedclass";
                cell_index.appendChild(addedClass);
                
            }
            else{
                var deletClass = document.getElementById(class_info['ClassID']+"_table");
                deletClass.parentNode.removeChild(deletClass);
            }
            ClassLayout(cell_index);
            
        }
        
        
    }
    

}

function handleChange(checkbox,i) {
    if(checkbox.checked){
        all_classes[i]['Select']=1;
        insertClass(all_classes[i],1);
        var tableRow = document.getElementById("list_content_selected");
        addanRow(tableRow, all_classes[i], "selected", i);
    }
    else{
        all_classes[i]['Select']=0;
        insertClass(all_classes[i],0);
        var deletClass = document.getElementById(all_classes[i]['ClassID']+"_selected");
        deletClass.parentNode.removeChild(deletClass);
    }
    updateCheckbox(all_classes[i]);
}

var dir_trigger=-1;
const filter_collapser=document.getElementById("filter_collapser");
filter_collapser.addEventListener("click", (e) =>{
    dir_trigger*=-1;
    var fil_content = document.getElementById("filter_content");
    if (fil_content.style.display === "block") {
        fil_content.style.display = "none";
    }
    else {
        fil_content.style.display = "block";
    }

    if(dir_trigger<0){
        e.target.parentNode.innerHTML=`
            <i style="font-size:24px; color: #727272; padding: 3px;" class="fa">&#xf0d7;</i>
        `
    }
    else{
        e.target.parentNode.innerHTML=`
            <i style="font-size:24px; color: #727272; padding: 3px;" class="fa">&#xf0d8;</i>
        `
    }

});
function list_delet_all_classes(){
    var tableRow = document.getElementById("list_content");
    var list_head = document.getElementById("list_head");
    tableRow.innerHTML="";
    tableRow.appendChild(list_head);
}

function Filter_logic_excute(class_info, filter_cat, filter_logic, filter_content, filter_type){
    var final_res=1;
    if(filter_type=="str"){
        switch(filter_logic){
            case "contains":
                var tmp_res=0;
                filter_content.replace(/\s+/g, '').split(',').forEach(val => {
                    if(class_info[filter_cat].includes(val)){
                        tmp_res=1;
                    }
                    else{
                        //do nothing
                    }
                });
                final_res=tmp_res;
                break;
            
            case "ncontains":
                var tmp_res=0;
                filter_content.replace(/\s+/g, '').split(',').forEach(val => {
                    if(class_info[filter_cat].includes(val)){
                        tmp_res=1;
                    }
                    else{
                        //do nothing
                    }
                });
                final_res= !tmp_res;
                break;
            
            case "equ":
                var tmp_res=0;
                filter_content.replace(/\s+/g, '').split(',').forEach(val => {
                    if(class_info[filter_cat]==val){
                        tmp_res=1;
                    }
                    else{
                        //do nothing
                    }
                });
                final_res=tmp_res;
                break;

            case "nequ":
                var tmp_res=0;
                filter_content.replace(/\s+/g, '').split(',').forEach(val => {
                    if(class_info[filter_cat]==val){
                        tmp_res=1;
                    }
                    else{
                        //do nothing
                    }
                });
                final_res= !tmp_res;
                break;

            defult:
                p("WRONG!");
                break;
        }
    }
    else if(filter_type=="obj"){
        p(class_info[filter_cat])
        switch(filter_logic){
            case "contains":
                var tmp_res=0;
                class_info[filter_cat].forEach(val_cat =>{
                    filter_content.forEach(val_con => {
                        if(val_cat.includes(val_con)){
                            tmp_res=1;
                        }
                        else{
                            //do nothing
                        }
                    });
                })
                final_res=tmp_res;
                break;
            
            case "ncontains":
                var tmp_res=0;
                class_info[filter_cat].forEach(val_cat =>{
                    filter_content.forEach(val_con => {
                        if(val_cat.includes(val_con)){
                            tmp_res=1;
                        }
                        else{
                            //do nothing
                        }
                    });
                })
                final_res= !tmp_res;
                break;
            
            case "equ":
                var tmp_res=0;
                class_info[filter_cat].forEach(val_cat =>{
                    filter_content.forEach(val_con => {
                        if(val_cat==val_con){
                            tmp_res=1;
                        }
                        else{
                            //do nothing
                        }
                    });
                })
                final_res=tmp_res;
                break;

            case "nequ":
                var tmp_res=0;
                class_info[filter_cat].forEach(val_cat =>{
                    filter_content.forEach(val_con => {
                        if(val_cat==val_con){
                            tmp_res=1;
                        }
                        else{
                            //do nothing
                        }
                    });
                })
                final_res= !tmp_res;
                break;

            defult:
                p("WRONG!");
                break;
        }
    }
    return final_res;

}
function Filter(filter_cat, filter_logic, filter_content){
    // class_info = {
    //     "Grade": (grade_index[all_class_raw[i][5]]+all_class_raw[i][6].split('班')[0]),
    //     "Department": all_class_raw[i][3],
    //     "Compulsory": all_class_raw[i][11],
    //     "Credits": all_class_raw[i][9],
    //     "Teacher": all_class_raw[i][16].split(','),
    //     "Time": sorted_time,
    //     "Programs": all_class_raw[i][26].replaceAll('\'','').replaceAll(' ','').split(','),
    //     "Room": all_class_raw[i][17],
    //     "EMI": all_class_raw[i][27],
    //     "Comment": all_class_raw[i][25],
    //     "Select": 0,
    //     "Name": all_class_raw[i][7],
    //     "ClassID": all_class_raw[i][4],
    //     "Visibility": 1
    // };
    all_classes.forEach(val => {
        if(val["Visibility"]==1){
            var final_res=1;
        switch (filter_cat){
            case "Filter_Class":
                final_res*=Filter_logic_excute(val, "Name", filter_logic, filter_content, "str");
                break;
            case "Filter_Time":
                final_res*=Filter_logic_excute(val, "Time", filter_logic, filter_content, "obj");
                break;
            case "Filter_Day":
                var filter_content_Trans=[]
                filter_content.forEach( val_tmp => {
                    filter_content_Trans.push(filter_Day[parseInt(val_tmp,10)]);
                });
                final_res*=Filter_logic_excute(val, "Time", filter_logic, filter_content_Trans, "obj");
                break;
            case "Filter_Grade":
                var filter_content_Trans=""
                filter_content.forEach( (val_tmp,index) => {
                    if (index==0){
                        filter_content_Trans += filter_Grade_trans[parseInt(val_tmp,10)];
                    }
                    else{
                        filter_content_Trans += (","+filter_Grade_trans[parseInt(val_tmp,10)]);
                    }
                    
                });
                final_res*=Filter_logic_excute(val, "Grade", filter_logic, filter_content_Trans, "str");
                break;
            case "Filter_ClassCat":
                var filter_content_Trans=""
                filter_content.forEach( (val_tmp,index) => {
                    if (index==0){
                        filter_content_Trans += filter_Class[parseInt(val_tmp,10)];
                    }
                    else{
                        filter_content_Trans += (","+filter_Class[parseInt(val_tmp,10)]);
                    }
                    
                });
                final_res*=Filter_logic_excute(val, "Grade", filter_logic, filter_content_Trans, "str");
                break;
            case "Filter_Dep":
                var filter_content_Trans=""
                filter_content.forEach( (val_tmp,index) => {
                    if (index==0){
                        filter_content_Trans += val_tmp;
                    }
                    else{
                        filter_content_Trans += (","+val_tmp);
                    }
                    
                });
                final_res*=Filter_logic_excute(val, "Department", filter_logic, filter_content_Trans, "str");
                break;
            case "Filter_Comp":
                
                var filter_content_Trans=""
                filter_content.forEach( (val_tmp,index) => {
                    if (index==0){
                        filter_content_Trans += filter_Compulsory_trans[parseInt(val_tmp,10)];
                    }
                    else{
                        filter_content_Trans += (","+filter_Compulsory_trans[parseInt(val_tmp,10)]);
                    }
                    
                });
                final_res*=Filter_logic_excute(val, "Compulsory", filter_logic, filter_content_Trans, "str");
                break;
            case "Filter_Credit":
                p(filter_content)
                var filter_content_Trans=""
                filter_content.forEach( (val_tmp,index) => {
                    if (index==0){
                        filter_content_Trans += filter_Credit[parseInt(val_tmp,10)];
                    }
                    else{
                        filter_content_Trans += (","+filter_Credit[parseInt(val_tmp,10)]);
                    }
                    
                });
                final_res*=Filter_logic_excute(val, "Credits", filter_logic, filter_content_Trans, "str");
                break;
            case "Filter_Teacher":
                final_res*=Filter_logic_excute(val, "Teacher", filter_logic, filter_content.replace(/\s+/g, '').split(','), "obj");
                break;
            case "Filter_Prog":
                final_res*=Filter_logic_excute(val, "Programs", filter_logic, filter_content.replace(/\s+/g, '').split(','), "obj");
                break;
            case "Filter_EMI":
                p(filter_content)
                var filter_content_Trans=""
                filter_content.forEach( (val_tmp,index) => {
                    if (index==0){
                        filter_content_Trans += val_tmp;
                    }
                    else{
                        filter_content_Trans += (","+val_tmp);
                    }
                    
                });
                final_res*=Filter_logic_excute(val, "EMI", filter_logic, filter_content_Trans, "str");
                break;
        }
        val["Visibility"]=final_res;
        }
    });
}

document.addEventListener("click",(val) => {
    const content=document.getElementById("filter_content");
    const isClosest = val.target.closest("#select_filter_content");
    const filter_sel_menu = document.getElementById("select_filter_content");
    filter_sel_menu.style.top=`${content.getBoundingClientRect().height+50}px`;
    if ((filter_sel_menu.style.display == "inline-block") && (isClosest == null)){
        filter_sel_menu.style.display="none";
    }
});

document.addEventListener("input",(val) => {
    if(val.target.id=="filter_switch"){
        if ($('#filter_switch').is(':checked')){
            var all_filter=[].slice.call($('#filter_content').children(".Filter_row"))
            if(all_filter.length!=0){
                all_filter.forEach(val => {
                    filter_cat=(val.children[0].id)
                    filter_logic=(val.children[1].children[0].children[0].value)
                    tag_finder=val.children[2]
                    while(tag_finder.tagName != "INPUT" && tag_finder.tagName !="SELECT"){
                        tag_finder=tag_finder.children[0];
                    }
                    filter_content=($(tag_finder).val())
                    Filter(filter_cat, filter_logic, filter_content)
                    
                });
                addClassRow(all_classes, 0);
            } 
        }
        else{
            addClassRow(all_classes,1);
        }
    }
})

function Filter_window(){
    const filter_sel_menu = document.getElementById("select_filter_content");
    if(filter_sel_menu.style.display=="inline-block"){
        filter_sel_menu.style.display="none";
    }
    else{
        setTimeout(function(){
            filter_sel_menu.style.display="inline-block";
        }, 10);
    }
    //教室//EMI//學程//老師//學分//必選修//上課系所//年級班級//時間//課程名稱//選擇
    
}

function appendFilter(append_i){
    toAppend=filter_category[append_i];
    const content=document.getElementById("filter_content");
    const seleter_menu=document.getElementById("select_filter_content");
    var append_html;
    var newrow=document.createElement('div');
    switch (filter_category_index[append_i]){
        case "Class":
            append_html=`
                <div id="Filter_Class" style="display: inline-block; vertical-align: middle;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                    </select>
                </div>
                <div class="input-group" style="width: 100%; top: 2px; display: inline-block; padding-right: 15px; width: 250px;">
                    <input id="class_input" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style="width: 100%;">
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;
        case "Time":
            var options="";
            filter_Time.forEach((val)=>{
                options+=`<option value="${val}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_Time" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body" data-style=">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;

        case "Day":
            var options="";
            filter_Day.forEach((val,index)=>{
                options+=`<option value="${index}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_Day" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;

        case "Grade":
            var options="";
            filter_Grade.forEach((val,index)=>{
                options+=`<option value="${index}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_Grade" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;

        case "ClassCat":
            var options="";
            filter_Class.forEach((val,index)=>{
                options+=`<option value="${index}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_ClassCat" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;
        case "Dep":
            var options="";
            filter_Dep.forEach((val,index)=>{
                options+=`<option value="${val}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_Dep" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-live-search="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;
        case "Comp":
            var options="";
            filter_Compulsory.forEach((val,index)=>{
                options+=`<option value="${index}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_Comp" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="equ" selected>等於</option>
                        <option value="nequ">不等於</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;
        case "Credit":
            var options="";
            filter_Credit.forEach((val,index)=>{
                options+=`<option value="${index}">${val}</option>`;
            });
            append_html=`
                <div id="Filter_Credit" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="equ" selected>等於</option>
                        <option value="nequ">不等於</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;
        case "Teacher":
            append_html=`
                <div id="Filter_Teacher" style="display: inline-block; vertical-align: middle;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                    </select>
                </div>
                <div class="input-group" style="width: 100%; top: 2px; display: inline-block; padding-right: 15px; width: 250px;">
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style="width: 100%;">
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;
        case "Prog":
            append_html=`
                <div id="Filter_Prog" style="display: inline-block; vertical-align: middle;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="contains" selected>包含</option>
                        <option value="ncontains">不包含</option>
                    </select>
                </div>
                <div class="input-group" style="width: 100%; top: 2px; display: inline-block; padding-right: 15px; width: 250px;">
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style="width: 100%;">
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break; 
        case "EMI":
            var options="";
            filter_EMI.forEach((val,index)=>{
                options+=`<option value="${index}">${val}</option>`;
            });
            
            append_html=`
                <div id="Filter_EMI" style="display: inline-block;" class="Filter_lable">
                    ${toAppend}
                </div>
                <div class="Filter_logic">
                    <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
                        <option value="equ" selected>等於</option>
                        <option value="nequ">不等於</option>
                        </select>
                </div>
                <div style="display: inline-block; padding-right: 15px; width: 250px">
                    <select data-style="btn-white" class="selectpicker" multiple data-actions-box="true" data-width="100%" data-container="body">
                        ${options}
                    </select>
                </div>
                <div style="display: inline-block; padding 5px; right: 0px;">
                    <button class="add_filter_btn" onclick="delet_Filter(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
                </div>
            `;
            newrow.className="Filter_row";
            newrow.innerHTML=append_html;
            break;

    }
    content.insertBefore(newrow, content.lastElementChild);
    $('.selectpicker').selectpicker("refresh");

}

function delet_Filter(event){
    var ptr=event.target
    while(ptr.tagName != "DIV" || ptr.className != "Filter_row"){
        ptr=ptr.parentNode
    }
    ptr.remove();
}

$('.selectpicker').selectpicker();

function save_course(){
    p("saved!");
    localStorage.setItem('NSYSU_Courses_Selector_Helper_Saved', JSON.stringify(all_classes));
}
