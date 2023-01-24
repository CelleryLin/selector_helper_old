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
var isFinity=1;
const filter_category=['課程名稱', '節次', '星期', '年級', '班別', '上課系所', '必選修', '學分數', '授課教師', '所屬學程', '英文授課'];
const list=['博雅課程','運動與健康(體適能或游泳)','運動與健康(其他)','跨院選修','隨機課程','中文思辨與表達','英文初級','英文中級','英文中高級','英文高級']
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
    filter_Grade=['一','二','三','四'];
    filter_Grade_trans=['一','二','三','四'];

    //班級
    filter_Class=['甲','乙','全英'];
    filter_Class_trans=['','甲','乙','全英'];

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

function sortable_Init(){
    //const list=['博雅課程','系上選修','運動與健康(體適能或游泳)','運動與健康(其他)','跨願選修','隨機課程','中文思辨與表達','英文初級','英文中級','英文中高級','英文高級']
    const filter_selector=document.getElementById("select_sortable_content");

    list.forEach(val => {
        const newdiv = document.createElement('div');
        newdiv.className="sortable_select_btn";
        newdiv.innerHTML=`
        <div>${val}</div>
        `;
        newdiv.setAttribute('onclick',`appendSortable('${val}');`);
        filter_selector.appendChild(newdiv);
    });
}



function updateCheckbox(class_info){
    var classrow=["", "_selected", "_comp"];
    classrow.forEach(val => {
        var thisrow = document.getElementById(class_info["ClassID"]+val)
        if(thisrow!=null){
            thisrow.children[0].children[0].children[0].checked=class_info["Select"];
        }
    })
    
    save_course();
}

function addanRow(tableRow, class_info, id_selector, i){
    var row = document.createElement('div');

    if(class_info["Overlapping"]){
        row.className = 'classes_row overlapping';
    }
    else{
        row.className = 'classes_row';
    }
    
    
    if(id_selector=="list"){
        row.id=class_info["ClassID"];
    }
    else if(id_selector=="selected"){
        row.id=class_info["ClassID"]+"_selected";
    }
    else if(id_selector=="comp"){
        row.id=class_info["ClassID"]+"_comp";
    }
    tableRow.appendChild(row);
    

    //選擇
    var cell0 = document.createElement('div')
    if(class_info["Select"]){
        cell0.innerHTML=`<div style="text-align: center"> <input type="checkbox" style=" align: center" onchange='handleChange(this,${i});' checked> </div>`;
    }
    else{
        cell0.innerHTML =`<div style="text-align: center"> <input type="checkbox" style=" align: center" onchange='handleChange(this,${i});'> </div>`;
    } 
    cell0.className="classes_cell";
    row.appendChild(cell0);

    //課程名稱
    var cell1 = document.createElement('div')
    cell1.innerHTML = `
        <a href="${class_info["URL"]}" class="class_url" target="_blank"> ${class_info["Name"]} </a>
    `
    cell1.className="classes_cell"
    row.appendChild(cell1);

    //時間
    var cell2 = document.createElement('div')
    var times = class_info["Time"];
    var times_html = "";
    for(j=0;j<times.length;j++){
        times_html += ("<div style=\"text-align: center; margin: 1px; padding: 3px; background-color: #D5CAF9; border-radius: 3px \" >" + times[j] + "</div>");
    }
    cell2.innerHTML = times_html;
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

    //必選修
    var cell5 = document.createElement('div')
    cell5.innerHTML = class_info["Compulsory"];
    cell5.className="classes_cell";
    row.appendChild(cell5);

    //學分
    var cell6 = document.createElement('div')
    cell6.innerHTML = class_info["Credits"];
    cell6.className="classes_cell";
    row.appendChild(cell6);

    //老師
    var cell7 = document.createElement('div')
    var teachers = class_info["Teacher"];
    var teacher_html = "";
    for(j=0;j<teachers.length;j++){
        teacher_html += `
            <div style="display: inline-block; text-align: center; margin: 3px; padding: 5px; background-color: #FCFCE0; border-radius: 3px " >
                <a href="https://www.google.com/search?q=中山+${teachers[j]}+dcard+%7C+ptt" class="class_url" target="_blank">    
                    ${teachers[j]}
                </a>
            </div>`;
    }
    cell7.innerHTML = teacher_html;
    cell7.className="classes_cell";
    row.appendChild(cell7);
    
    //學程
    var cell8 = document.createElement('div')
    var programs = class_info["Programs"];
    if (programs[0]!=''){
        var programs_html = "";
        for(j=0;j<programs.length;j++){
            programs_html += ("<div style=\"text-align: left; margin: 3px; padding: 3px; background-color: #D5CAF9; border-radius: 3px \" >" + programs[j] + "</div>");
        }
        cell8.innerHTML = programs_html;
    }
    else{
        cell8.innerHTML = "";
    }
    cell8.className="classes_cell";
    row.appendChild(cell8);

    //EMI
    var cell9 = document.createElement('div')
    cell9.innerHTML ="<div style=\"text-align: center; \" >" + class_info["EMI"] + "</div>"
    cell9.className="classes_cell";
    row.appendChild(cell9);

    //教室
    var cell10 = document.createElement('div')
    cell10.innerHTML =class_info["Room"];
    cell10.className="classes_cell";
    row.appendChild(cell10);

    

}

function show_more(filter){
    isFinity=0;
    addClassRow(all_classes, filter);
}

function addClassRow(all_classes, filter){
    list_delet_all_classes(document.getElementById("list_content"));
    var tableRow = document.getElementById("list_content");
    var row_count=0;
    for(i=0;i<all_classes.length;i++){
        if(all_classes[i]["Visibility"]==1 || filter){
            if(row_count>=100 && isFinity){
                const show_more = document.createElement('div');
                show_more.innerHTML="顯示全部... (注意：可能會造成些微卡頓)";
                show_more.className="classes_row";
                show_more.style.textAlign="Center";
                show_more.style.display="block";
                show_more.setAttribute('onclick', `show_more(${filter});`)
                tableRow.appendChild(show_more);
                break;
            }
            else{
                addanRow(tableRow, all_classes[i],"list", i);
            }
            row_count++;

        }
    }
    p(row_count);
    isFinity=1;
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
    p(all_class_raw)
    all_classes=[]
    for(i=1;i<=all_class_raw.length-2;i++){
    //for(i=1;i<200;i++){
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
            "URL": all_class_raw[i][8],
            "ClassID": all_class_raw[i][4],
            "Visibility": 1,
            "Overlapping": 0,
            "MyComp": 0,
            "Pending": 0
        };
        all_classes.push(class_info);
    }

    var all_classes_read = JSON.parse(localStorage.getItem('NSYSU_Courses_Selector_Helper_Saved'));
    if(all_classes_read!=null){
        all_classes_read.forEach( (val_old,index) => {
            all_classes.forEach( (val_new, index) => {
                if(val_old["ClassID"]==val_new["ClassID"]){
                    val_new["Select"]=val_old["Select"];
                    val_new["Pending"]=val_old["Pending"];
                    val_new["MyComp"]=val_old["MyComp"];
                    val_new["Overlapping"]=val_old["Overlapping"];
                }
            });
        });
    }

    all_classes=Array.from(
        new Set(all_classes.map((object) => JSON.stringify(object)))
        ).map((string) => JSON.parse(string))

    all_classes.forEach( (val,index) => {
        if(val['Select']){
            if(val['Pending']){
                insertClass(val,1,"auto");
            }
            else{
                insertClass(val,1);
            }
            
            var tableRow = document.getElementById("list_content_selected");
            addanRow(tableRow, val, "selected", index);
        }
    });

    filter_Init(all_classes);
    sortable_Init();
    create_comp_fourm();
    addClassRow(all_classes, 1);
    comp_update_list();
    calc_stat();

    $('.selectpicker').selectpicker();

    $(document).ready( function() {
        $( "#sortable" ).sortable({
          items: "li:not(.ui-state-disabled)"
        }).disableSelection();
    });
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

function insertClass(class_info, isSelected, isAuto="norm"){
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
                if(isAuto=="auto"){
                    addedClass.className="addedclass pending";
                }
                else{
                    addedClass.className="addedclass";
                }
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
    else if(checkbox=='comp1'){
        all_classes[i]['Select']=1;
        insertClass(all_classes[i],1);
        var tableRow = document.getElementById("list_content_selected");
        addanRow(tableRow, all_classes[i], "selected", i);
    }
    else if(checkbox=='comp0'){
        all_classes[i]['Select']=0;
        insertClass(all_classes[i],0);
        var deletClass = document.getElementById(all_classes[i]['ClassID']+"_selected");
        deletClass.parentNode.removeChild(deletClass);
    }
    else if(checkbox=='auto1'){
        all_classes[i]['Pending']=1;
        all_classes[i]['Select']=1;
        insertClass(all_classes[i],1,"auto");
        var tableRow = document.getElementById("list_content_selected");
        addanRow(tableRow, all_classes[i], "selected", i);
    }
    else if(checkbox=='auto0'){
        all_classes[i]['Pending']=0;
        all_classes[i]['Select']=0;
        insertClass(all_classes[i],0,"auto");
        var deletClass = document.getElementById(all_classes[i]['ClassID']+"_selected");
        deletClass.parentNode.removeChild(deletClass);
    }
    else{
        all_classes[i]['Select']=0;
        insertClass(all_classes[i],0);
        var deletClass = document.getElementById(all_classes[i]['ClassID']+"_selected");
        deletClass.parentNode.removeChild(deletClass);
    }
    classOverlapping();
    updateCheckbox(all_classes[i]);
    calc_stat();
}

var dir_trigger=-1;
const filter_collapser=document.getElementById("filter_collapser");
filter_collapser.addEventListener("click", (e) =>{
    dir_trigger*=-1;
    var fil_content = document.getElementById("filter_content");
    if (fil_content.style.display === "inline-block") {
        fil_content.style.display = "none";
        fil_content.style.zIndex = 0;
    }
    else {
        fil_content.style.display = "inline-block";
        fil_content.style.zIndex = 3;
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

function list_delet_all_classes(tableRow){
    [].slice.call(tableRow.children).forEach(val => {
        if (val.id!="list_head"){
            val.remove()
        }
    });
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
    all_classes.forEach((val,index) => {
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
                            filter_content_Trans += filter_Class_trans[parseInt(val_tmp,10)];
                        }
                        else{
                            filter_content_Trans += (","+filter_Class_trans[parseInt(val_tmp,10)]);
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
                default:
                    break;
            }
            val["Visibility"]=final_res;
        }
    });
}

document.addEventListener("click",(val) => {
    const filter_isClosest = val.target.closest("#select_filter_content");
    const sort_isCloset = val.target.closest("#select_sortable_content");
    const filter_sel_menu = document.getElementById("select_filter_content");
    const sort_sel_menu = document.getElementById("select_sortable_content");
    if ((filter_sel_menu.style.display == "inline-block") && (filter_isClosest == null)){
        filter_sel_menu.style.display="none";
    }
    if ((sort_sel_menu.style.display == "inline-block") && (sort_isCloset == null)){
        sort_sel_menu.style.display="none";
    }
});

//Bookmark
function filter_update_list(e){
    if(e.target.parentNode.parentNode.className=="classes_cell"){
        return 0;
    }
    all_classes.forEach(val => {
        val["Visibility"]=1;
    });
    if ($('#filter_switch').is(':checked')){
        document.getElementById("filter_switch_status").innerHTML="已啟用"
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
        document.getElementById("filter_switch_status").innerHTML="已停用"
    }
    if(e.target.id=="filter_switch"){
        if (!($('#filter_switch').is(':checked'))){
            addClassRow(all_classes,1);
        }
    }
    var toSearch=search_bar.value
    toSearch=toSearch.replace('年級','');
    toSearch=toSearch.replace('班','');
    toSearch=toSearch.replace('下午','5%6%7%8');
    toSearch=toSearch.replace('上午','早上');
    toSearch=toSearch.replace('早上','1%2%3%4');
    toSearch=toSearch.split(' ');
    all_classes.forEach(val => {
        var Mix_string=val["Grade"]+val["Department"]+val["Compulsory"]+val["Teacher"]+"星期"+val["Time"]+val["Programs"]+val["Name"]
        if(val["Visibility"]==1){
            var final_res=1;
            toSearch.forEach(val_search => {
                var or_res=0;
                val_search.split('%').forEach( val_search_or => {
                    or_res+=Mix_string.includes(val_search_or)
                })
                final_res*=(!!or_res)
            })
            val["Visibility"]=final_res
        }
    });
    addClassRow(all_classes, 0);
}

function comp_update_list(isCatChange){
    const tableRow=document.getElementById('comp_content');
    list_delet_all_classes(tableRow);

    const comp_filter=document.getElementById("comp_sel_container");
    var comp_sel=[];
    for(var i=0;i<3;i++){
        var tag_finder=comp_filter.children[i];
        while(tag_finder.tagName!="SELECT"){
            tag_finder=tag_finder.children[0];
        }
        comp_sel[i] = $(tag_finder).val();
    }
    var comp_all_classcat=[];
    all_classes.forEach((val,index) => {
        val["MyComp"]=0;
        if(val["Department"]==comp_sel[0]){
            if(val["Grade"].includes(filter_Grade[parseInt(comp_sel[1],10)] )){
                if(val["Compulsory"].includes("必")){
                    comp_all_classcat.push(val["Grade"].substring(1));
                    if(val["Grade"].includes(comp_sel[2])){
                        val["MyComp"]=1;
                        addanRow(tableRow, val, "comp", index);
                    }
                }
            }
        }
    });
    if(!isCatChange){
        $('.selectpicker.comp-class').empty();
        $('.selectpicker.comp-class').append(`<option value="" selected>(全)</option>`)
        getUnique(comp_all_classcat).forEach(val => {
            if(val!=""){
                $('.selectpicker.comp-class').append(`<option value="${val}">${val}</option>`)
            }
        });
        $('.selectpicker.comp-class').selectpicker("refresh");
    }
    
}

//Bookmark
document.addEventListener("input",(val) => {
    if($('#overlapping_show_switch').is(':checked')){
        document.querySelector(':root').style.setProperty('--over_lap', 'table-row');
    }
    else{
        document.querySelector(':root').style.setProperty('--over_lap', 'none');
    }
    filter_update_list(val);
});

document.addEventListener("change",(val) => {
    if(val.target.parentNode.parentNode.parentNode.id=="comp_sel_container"){
        if(val.target.className=="selectpicker comp-class"){
            comp_update_list(1);
        }
        else{
            comp_update_list(0);
        }
    }

    if(val.target.parentNode.parentNode.parentNode.className=="Filter_row"){
        filter_update_list(val);
    }
    
});

$('.selectpicker').on('change', function(){
    filter_update_list(this);
 });

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


function create_comp_fourm(){
    var options_dep="";
    var options_grade="";
    var options_class='<option value="" selected>(全)</option>';

    const content=document.getElementById("comp_sel_container");

    filter_Dep.forEach((val,index)=>{
        if(val.includes('系') || val.includes('人科')){
            options_dep+=`<option value="${val}">${val}</option>`;
        }
    });

    filter_Grade.forEach((val,index)=>{
            options_grade+=`<option value="${index}">${val}</option>`;
    });

    filter_Class.forEach((val,index)=>{
        options_class+=`<option value="${index+1}">${val}</option>`;
    });
    
    content.innerHTML=`
    <div style="display: inline-block; padding-right: 5px; width: 150px">
        <select data-style="btn-white" class="selectpicker" data-live-search="true" data-width="100%" data-container="body" data-style="">
            ${options_dep}
        </select>
    </div>
    <div style="display: inline-block; padding-right: 5px; width: 80px">
        <select data-style="btn-white" class="selectpicker" data-width="100%" data-container="body">
            ${options_grade}
        </select>
    </div>
    <div style="display: inline-block; padding-right: 5px; width: 80px">
        <select data-style="btn-white" class="selectpicker comp-class" data-width="100%" data-container="body">
            ${options_class}
        </select>
    </div>
    <div style="display: inline-block;">
        <button type="button" class="btn btn-light" onclick="comp_insert(0);">全部填入</button>
    </div>
    <div style="display: inline-block;">
        <button type="button" class="btn btn-light" onclick="comp_insert(1);">全部取消</button>
    </div>
    `;

    content.style.display="inline-block";

}

function appendFilter(append_i){
    toAppend=filter_category[append_i];
    const content=document.getElementById("filter_content");
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
function comp_insert(isCancel){
    const tableRow=document.getElementById("comp_content");
    all_classes.forEach((val,index) => {
        if(val["MyComp"]==1){
            if(isCancel){
                if(val["Select"]==1){
                    handleChange("comp0",index);
                }
            }
            else{
                if(val["Select"]!=1){
                    handleChange("comp1",index);
                }
                //addanRow(tableRow, val, "comp", index);
            }
        }
    });
}



function delet_Filter(event){
    var ptr=event.target
    while(ptr.tagName != "DIV" || ptr.className != "Filter_row"){
        ptr=ptr.parentNode
    }
    ptr.remove();
    filter_update_list(event)
}

function delet_Sortable(event){
    var ptr=event.target
    while(ptr.tagName != "LI"){
        ptr=ptr.parentNode
    }
    ptr.remove();
}

function classOverlapping(){
    var selected_time=[];
    all_classes.forEach(val => {
        val["Overlapping"]=0;
        var row=document.getElementById(val["ClassID"]);
        if(row != null){
            row.className="classes_row";
        }
        if(val["Select"]){
            val["Time"].forEach(val_time => {
                var tmp=val_time.split(" ");
                tmp[1].split('').forEach( val_mun => {
                    selected_time.push(tmp[0]+" "+val_mun);
                })
            })
        }
    });
    //p(selected_time)
    
    selected_time.forEach(val_sel => {
        all_classes.forEach(val_class => {
            var row=document.getElementById(val_class["ClassID"]);
            val_class["Time"].forEach(val_time => {
                var tmp=val_time.split(" ");
                tmp[1].split('').forEach( val_mun => {
                    if(tmp[0]+" "+val_mun==val_sel){
                        val_class["Overlapping"]=1;
                        if(row != null){
                            row.className="classes_row overlapping";
                        }
                        //p(val_class)
                    }
                });
            });
        });
    });
    //p(isFinity)
    //addClassRow(all_classes,0);
}

function calc_stat(){
    var tt_credits=0;
    var tt_time=0;
    all_classes.forEach(val => {
        if(val["Select"]){
            tt_credits+=parseInt(val["Credits"],10);
            val["Time"].forEach( val_time => {
                tt_time+=val_time.split("").length-2
            })
        }
    });
    document.getElementById("all_credits").innerHTML=tt_credits;
    document.getElementById("tt_time").innerHTML=tt_time;
}

function appendSortable(a){
    const table = document.getElementById("sortable");
    const newdiv = document.createElement('li');
    newdiv.className="ui-state-default"
    newdiv.id=a
    newdiv.innerHTML=`
    <div style="display: block; text-align: center;">
        <div class="sortable_row">
            <div class="sortable_cat">${a}</div>
            <div style="display: inline-block; padding 5px; right: 0px;">
                <button class="add_filter_btn" onclick="delet_Sortable(event);"><div style="font-size: 18px;"><i style="font-size:12px" class="fa">&#xf00d;</i></div></button>
            </div>
        </div>
    </div>
    
    `
    table.appendChild(newdiv)
}


function Sortable_window(){
    const filter_sel_menu = document.getElementById("select_sortable_content");
    if(filter_sel_menu.style.display=="inline-block"){
        filter_sel_menu.style.display="none";
    }
    else{
        setTimeout(function(){
            filter_sel_menu.style.display="inline-block";
        }, 10);
    }
}

function random_class(got_classes){
    return new Promise(resolve => {
        const res_class = got_classes[Math.floor(Math.random()*got_classes.length)];
        handleChange("auto1",res_class[1]);
        resolve(0);
    });
    
}


function pendingClasses(){
    all_classes.forEach((val,index) => {
        if(val["Pending"]){
            handleChange("auto0", index);
        }
    });
    //const list=['博雅課程','運動與健康(體適能或游泳)','運動與健康(其他)','跨願選修','隨機課程','中文思辨與表達','英文初級','英文中級','英文中高級','英文高級']
    const list = document.getElementById("sortable");
    const ele = [].slice.call(list.children)
    for (var i=0;i<ele.length;i++){
        const got_classes = [];
        switch (ele[i].id){
            case '博雅課程':
                all_classes.forEach((val_class,index) => {
                    if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                        if(val_class["Department"].includes("博雅向度")){
                            got_classes.push([val_class,index]);
                        }
                    } 
                });
                if(got_classes.length!=0){
                    random_class(got_classes).then();
                }
                break;

            case '運動與健康(體適能或游泳)':
                all_classes.forEach((val_class,index) => {
                    if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                        if(val_class["Department"].includes("運動健康") && val_class["Grade"].includes("一")){
                            got_classes.push([val_class,index]);
                        }
                    } 
                });
                if(got_classes.length!=0){
                    random_class(got_classes).then();
                }
                break;

            case '運動與健康(其他)':
                all_classes.forEach((val_class,index) => {
                    if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                        if(val_class["Department"].includes("運動健康") && (!val_class["Grade"].includes("一"))){
                            got_classes.push([val_class,index]);
                        }
                    } 
                });
                if(got_classes.length!=0){
                    random_class(got_classes).then();
                }
                break;
            case '跨院選修':
                all_classes.forEach((val_class,index) => {
                    if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                        if(val_class["Department"].includes("跨院選修")){
                            got_classes.push([val_class,index]);
                        }
                    } 
                });
                if(got_classes.length!=0){
                    random_class(got_classes).then();
                }
                break;
            
            case '隨機課程':
            all_classes.forEach((val_class,index) => {
                if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                    got_classes.push([val_class,index]);
                } 
            });
            if(got_classes.length!=0){
                random_class(got_classes).then();
            }
            break;

        case '中文思辨與表達':
            all_classes.forEach((val_class,index) => {
                if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                    if(val_class["Department"].includes("中文思辨與表達")){
                        got_classes.push([val_class,index]);
                    }
                } 
            });
            if(got_classes.length!=0){
                random_class(got_classes).then();
            }
            break;

        case '英文初級':
            all_classes.forEach((val_class,index) => {
                if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                    if(val_class["Department"].includes("英文初級")){
                        got_classes.push([val_class,index]);
                    }
                } 
            });
            if(got_classes.length!=0){
                random_class(got_classes).then();
            }
            break;

        case '英文中級':
            all_classes.forEach((val_class,index) => {
                if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                    if(val_class["Department"].includes("英文中級")){
                        got_classes.push([val_class,index]);
                    }
                } 
            });
            if(got_classes.length!=0){
                random_class(got_classes).then();
            }
            break;

    case '英文中高級':
        all_classes.forEach((val_class,index) => {
            if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                if(val_class["Department"].includes("英文中高級")){
                    got_classes.push([val_class,index]);
                }
            } 
        });
        if(got_classes.length!=0){
            random_class(got_classes).then();
        }
        break;

    case '英文高級':
        all_classes.forEach((val_class,index) => {
            if(val_class["Overlapping"]==0 && val_class["Select"]==0){
                if(val_class["Department"].includes("英文高級")){
                    got_classes.push([val_class,index]);
                }
            } 
        });
        if(got_classes.length!=0){
            random_class(got_classes).then();
        }
        break;



        }        
    }
};
    
function confirmPending(){
    all_classes.forEach(val => {
        val["Pending"]=0;
    });

    [].slice.call(document.getElementsByClassName("addedclass pending")).forEach(val => {
        val.className="addedclass";
    })
}


function cancelPending(){
    all_classes.forEach((val,index) => {
        if(val["Pending"]){
            val["Pending"]=0;
            handleChange("auto0",index)
        }
    });
}




function save_course(){
    
    localStorage.setItem('NSYSU_Courses_Selector_Helper_Saved', JSON.stringify(all_classes));
}

function delet_all_select(){
    all_classes.forEach((val,index) => {
        val["Overlapping"]=0;
        if(val["Select"]==1){
            handleChange("delet",index);
            //localStorage.clear();
        }
    });
}
