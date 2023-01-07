function addClassRow(all_classes){
    const class_info=[
        "Grade",
        "Department",
        "Compulsory",
        "Credits",
        "Teacher",
        "Time",
        "Programs",
        "Room",
        "EMI",
        "Comment",
        "Select",
        "Name"
    ];

    var tableRow = document.getElementById("list_content");

    for(i=0;i<all_classes.length;i++){
        var row = tableRow.insertRow(-1);
        if(i%2==0){
            row.className = 'classes_row_even';
        }
        else{
            row.className = 'classes_row_odd';
        }

        //選擇
        var list_i=0;
        row.insertCell(list_i).innerHTML ="<div style=\"text-align: center\"> <input type=\"checkbox\" style=\" align: center\" onchange='handleChange(this, " + i + ");'> </div>";
        row.cells[list_i].className="cell_time";
        list_i++
        //課程名稱
        row.insertCell(list_i).innerHTML = all_classes[i][class_info[11]];
        row.cells[list_i].className="cell_name"
        list_i++

        //時間
        var times = all_classes[i][class_info[5]];
        var times_html = "";
        for(j=0;j<times.length;j++){
            times_html += ("<div style=\"text-align: center; margin: 1px; padding: 3px; background-color: #D5CAF9; border-radius: 3px \" >" + times[j] + "</div>");
        }
        row.insertCell(list_i).innerHTML = times_html;
        row.cells[list_i].className="cell_time";
        list_i++

        //年級班級
        row.insertCell(list_i).innerHTML = "<div style=\"text-align: center; \" >" + all_classes[i][class_info[0]] + "</div>"
        row.cells[list_i].className="cell_class"
        list_i++
        //上課系所
        row.insertCell(list_i).innerHTML = all_classes[i][class_info[1]];
        row.cells[list_i].className="cell_dep"
        list_i++
        //必選修
        row.insertCell(list_i).innerHTML = all_classes[i][class_info[2]];
        row.cells[list_i].className="cell_com";
        list_i++
        //學分
        row.insertCell(list_i).innerHTML = all_classes[i][class_info[3]];
        row.cells[list_i].className="cell_credit";
        list_i++
        //老師
        var teachers = all_classes[i][class_info[4]];
        var teacher_html = "";
        for(j=0;j<teachers.length;j++){
            teacher_html += ("<div style=\"display: inline-block; text-align: center; margin: 3px; padding: 5px; background-color: #FCFCE0; border-radius: 3px \" >" + teachers[j] + "</div>");
        }
        row.insertCell(list_i).innerHTML = teacher_html;
        row.cells[list_i].className="cell_teacher";
        list_i++
        
        //學程
        var programs = all_classes[i][class_info[6]];
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
        row.insertCell(list_i).innerHTML ="<div style=\"text-align: center; \" >" + all_classes[i][class_info[8]] + "</div>"
        row.cells[list_i].className="cell_EMI";
        list_i++
        //教室
        row.insertCell(list_i).innerHTML =all_classes[i][class_info[7]];
        row.cells[list_i].className="cell_room";

        
        

    }

}
var all_class_raw=[];

var class_info={
    "Grade": 0,
    "Department": "",
    "Compulsory": "",
    "Credits": 0,
    "Teacher": "",
    "Time": "",
    "Programs": "",
    "EMI": 0,
    "Comment": "",
    "Select": 0,
    "Name": ""
};

function time_sort(class_info_tmp){
    const day_index=['一 ', '二 ', '三 ', '四 ', '五 ', '六 ', '日 '];
    var tmp=[];
    for(i=18;i<=24;i++){
        
        if (class_info_tmp[i]!=""){
            tmp.push(day_index[i-18]+class_info_tmp[i]);
        }
    }
    //console.log(tmp);
    console.log('hi');
    return tmp;
}


function main(csv_data){
    const day_index=['一 ', '二 ', '三 ', '四 ', '五 ', '六 ', '日 '];
    const grade_index=['','一', '二','三', '四'];
    all_class_raw=csv_data.data
    //console.log(all_class_raw);
    all_classes=[]
    for(i=1;i<all_class_raw.length-1;i++){
    //for(i=1;i<100;i++){
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
            "Programs": all_class_raw[i][26].replaceAll('\'','').split(','),
            "Room": all_class_raw[i][17],
            "EMI": all_class_raw[i][27],
            "Comment": all_class_raw[i][25],
            "Select": 0,
            "Name": all_class_raw[i][7],
            "ClassID": all_class_raw[i][4]
        };
        all_classes.push(class_info);
        
    }
    //console.log("Done!")
    console.log(all_classes)
    addClassRow(all_classes)
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
                addedClass.id = class_info['ClassID'];
                addedClass.innerHTML =`<span>${class_info["Name"]}<br>${class_info["ClassID"]}</span>`;
                addedClass.style.background = "#F9F9D7";
                addedClass.style.height = "100%";
                addedClass.style.fontSize = "14px";
                addedClass.style.textAlign= "center";
                addedClass.style.position="relative";
                addedClass.style.margin=0;
                addedClass.style.verticalAlign="top";
                addedClass.style.display="inline-block";
                cell_index.appendChild(addedClass);
                ClassLayout(cell_index);
            }
            else{
                var deletClass = document.getElementById(class_info['ClassID']);
                deletClass.parentNode.removeChild(deletClass);
                ClassLayout(cell_index);
            }
            
        }
        
        
    }
    

}

function handleChange(checkbox,i) {
    if(checkbox.checked){
        all_classes[i]['Select']=1;
        insertClass(all_classes[i],1);
    }
    else{
        all_classes[i]['Select']=0;
        insertClass(all_classes[i],0);
    }
}