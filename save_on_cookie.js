const web_html_init =`
<table id="resizable_table" style=" display: table; width: 100%; height: 100vh;">
<thead>
    <th class="resizable">
        <div class="chart_container" style="margin-right: 8px; height: 100%; overflow: auto;">
            <table style="height: 100vh; width: 100%; background-color: white;" id="schedule_content">
                <tbody>
                    <tr class="schedule_tr">
                        <th style="width: 7%; text-align: center;">節\日</th>
                        <th style="text-align: center;">星期一</th>
                        <th style="text-align: center;">星期二</th>
                        <th style="text-align: center;">星期三</th>
                        <th style="text-align: center;">星期四</th>
                        <th style="text-align: center;">星期五</th>
                        <th style="text-align: center;">星期六</th>
                        <th style="text-align: center;">星期日</th>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">A<br>7:00-7:50</th>
                        <td id="1A"></td>
                        <td id="2A"></td>
                        <td id="3A"></td>
                        <td id="4A"></td>
                        <td id="5A"></td>
                        <td id="6A"></td>
                        <td id="7A"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">1<br>8:10-9:00</th>
                        <td id="11"></td>
                        <td id="21"></td>
                        <td id="31"></td>
                        <td id="41"></td>
                        <td id="51"></td>
                        <td id="61"></td>
                        <td id="71"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">2<br>9:10-10:00</th>
                        <td id="12"></td>
                        <td id="22"></td>
                        <td id="32"></td>
                        <td id="42"></td>
                        <td id="52"></td>
                        <td id="62"></td>
                        <td id="72"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">3<br>10:10-11:00</th>
                        <td id="13"></td>
                        <td id="23"></td>
                        <td id="33"></td>
                        <td id="43"></td>
                        <td id="53"></td>
                        <td id="63"></td>
                        <td id="73"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">4<br>11:10-12:00</th>
                        <td id="14"></td>
                        <td id="24"></td>
                        <td id="34"></td>
                        <td id="44"></td>
                        <td id="54"></td>
                        <td id="64"></td>
                        <td id="74"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">B<br>12:10-13:00</th>
                        <td id="1B"></td>
                        <td id="2B"></td>
                        <td id="3B"></td>
                        <td id="4B"></td>
                        <td id="5B"></td>
                        <td id="6B"></td>
                        <td id="7B"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">5<br>13:10-14:00</th>
                        <td id="15"></td>
                        <td id="25"></td>
                        <td id="35"></td>
                        <td id="45"></td>
                        <td id="55"></td>
                        <td id="65"></td>
                        <td id="75"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">6<br>14:10-15:00</th>
                        <td id="16"></td>
                        <td id="26"></td>
                        <td id="36"></td>
                        <td id="46"></td>
                        <td id="56"></td>
                        <td id="66"></td>
                        <td id="76"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">7<br>15:10-16:00</th>
                        <td id="17"></td>
                        <td id="27"></td>
                        <td id="37"></td>
                        <td id="47"></td>
                        <td id="57"></td>
                        <td id="67"></td>
                        <td id="77"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">8<br>16:10-17:00</th>
                        <td id="18"></td>
                        <td id="28"></td>
                        <td id="38"></td>
                        <td id="48"></td>
                        <td id="58"></td>
                        <td id="68"></td>
                        <td id="78"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">9<br>17:10-18:00</th>
                        <td id="19"></td>
                        <td id="29"></td>
                        <td id="39"></td>
                        <td id="49"></td>
                        <td id="59"></td>
                        <td id="69"></td>
                        <td id="79"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">C<br>18:20-19:10</th>
                        <td id="1C"></td>
                        <td id="2C"></td>
                        <td id="3C"></td>
                        <td id="4C"></td>
                        <td id="5C"></td>
                        <td id="6C"></td>
                        <td id="7C"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">D<br>19:15-20:05</th>
                        <td id="1D"></td>
                        <td id="2D"></td>
                        <td id="3D"></td>
                        <td id="4D"></td>
                        <td id="5D"></td>
                        <td id="6D"></td>
                        <td id="7D"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">E<br>20:10-21:00</th>
                        <td id="1E"></td>
                        <td id="2E"></td>
                        <td id="3E"></td>
                        <td id="4E"></td>
                        <td id="5E"></td>
                        <td id="6E"></td>
                        <td id="7E"></td>
                    </tr>
                    <tr class="schedule_tr">
                        <th style="text-align: center;">F<br>21:05-21:55</th>
                        <td id="1F"></td>
                        <td id="2F"></td>
                        <td id="3F"></td>
                        <td id="4F"></td>
                        <td id="5F"></td>
                        <td id="6F"></td>
                        <td id="7F"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="resizer"></div>
    </th>
    <th class="resizable" style="height: 100vh; display: block; vertical-align: top;">
        <div class="function_container" style="height: 100%; overflow:auto;">
            <div class="accordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="compulsory_area">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-compulsory_area" aria-expanded="false"
                            aria-controls="panelsStayOpen-compulsory_area">
                            本學期必修
                        </button>
                    </h2>
                    <div id="panelsStayOpen-compulsory_area" class="accordion-collapse collapse show"
                        aria-labelledby="compulsory_area">
                        <div class="accordion-body">
                            必修必修
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="manual_area">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-manual_area" aria-expanded="false"
                            aria-controls="panelsStayOpen-manual_area">
                            手動填課 (物件較多開合可能會有些許卡頓，請耐心稍候)
                        </button>
                    </h2>
                    <div id="panelsStayOpen-manual_area" class="accordion-collapse show"
                        aria-labelledby="manual_area" style="margin: 0px;">
                        <div class="accordion-body" style="padding: 0;">
                            <div class="list_container" style="max-height: 700px; min-height: 200px; overflow: auto;">
                                <table id="list_content" style="display: inline-block; width: 100%;">
                                    <tbody>
                                        <tr id="list_head" style="position: sticky; height: 50px; top: 0; z-index: 1; background-color: white;">
                                            <th style="width:5%; text-align: center;">選擇</th>
                                            <th style="width:22%; text-align: center;">課程名稱</th>
                                            <th style="width:6%; text-align: center;">時間</th>
                                            <th style="width:5%; text-align: center;">年級/班別</th>
                                            <th style="width:10%; text-align: center;">上課系所</th>
                                            <th style="width:3%; text-align: center;">必選修</th>
                                            <th style="width:3%; text-align: center;">學分數</th>
                                            <th style="width:13%; text-align: center;">授課教師</th>
                                            <th style="width:18%; text-align: center;">所屬學程</th>
                                            <th style="width:5%; text-align: center;">英文授課</th>
                                            <th style="width:10%; text-align: center;">教室</th>
                                            <th></th>
                                        </tr>                                                   
                                    </tbody>
                                </table>
                                <div style="display: block; position: absolute; top: 18%; right: 35px; z-index: 3; height: auto; width: 80%; max-height: 80%; min-height: 100px; text-align: right;">
                                    <div style="display: block;">
                                        <button id="filter_collapser" style="background-color: rgba(212, 212, 212, 0.5); text-align: right; border-radius: 10px;">
                                            <i style="font-size:24px; color: #727272; padding: 3px;" class="fa">&#xf0d7;</i>
                                        </button>
                                    </div>
                                    <div id="filter_content" class="filter_content">
                                        <div style="position: absolute; left: 10px; top: 3px; padding: 5px; font-size: 18px; display: block; z-index: 3;">
                                            <span>使用篩選器：</span>

                                            <div class="form-check form-switch" style="display: inline-block;">
                                                <input class="form-check-input" type="checkbox" role="switch" id="filter_switch" style="margin-left: 5px;">
                                                <label style="padding-left: 7px; margin: 3px;" id="filter_switch_status">啟用</label>
                                            </div>
                                        
                                        </div>
                                        <div style="position: relative; top: 3px; padding: 17px; margin-bottom: 15px;"></div>
                                        
                                        <div style="position: relative; display: block; padding: 5px; z-index: 3;">
                                            <button class="add_filter_btn" onclick="Filter_window();"><i style="font-size:20px" class="fa-solid">&#x2b;</i></button>
                                        </div>
                                    </div>
                                    <div id="select_filter_content" class="select_filter_content" style="display: none; z-index: 3;">
                                        <div style="color: #727272;">選擇篩選器...</div>
                                        <hr style="color: #727272; width: 50%; height: 10px; padding: 0px; margin: 0px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="auto_area">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-auto_area" aria-expanded="false"
                            aria-controls="panelsStayOpen-auto_area">
                            自動填課
                        </button>
                    </h2>
                    <div id="panelsStayOpen-auto_area" class="accordion-collapse collapse"
                        aria-labelledby="auto_area">
                        <div class="accordion-body">
                            <span style="font-size: 14px" ><i>敬請期待！</i></span>
                            
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="selected_area">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-selected_area" aria-expanded="false"
                            aria-controls="panelsStayOpen-selected_area">
                            已選課程
                        </button>
                    </h2>
                    <div id="panelsStayOpen-selected_area" class="accordion-collapse collapse"
                        aria-labelledby="selected_area">
                        <div class="accordion-body" style="padding: 0;">
                            <div class="list_container">
                                <table id="list_content_selected" style="width: 100%;">
                                    <thead>
                                        <tr style="position: sticky; height: 50px; top: 0; z-index: 1; background-color: white;">
                                            <th style="width:5%; text-align: center;">選擇</th>
                                            <th style="width:22%; text-align: center;">課程名稱</th>
                                            <th style="width:6%; text-align: center;">時間</th>
                                            <th style="width:5%; text-align: center;">年級/班別</th>
                                            <th style="width:10%; text-align: center;">上課系所</th>
                                            <th style="width:3%; text-align: center;">必選修</th>
                                            <th style="width:3%; text-align: center;">學分數</th>
                                            <th style="width:13%; text-align: center;">授課教師</th>
                                            <th style="width:18%; text-align: center;">所屬學程</th>
                                            <th style="width:5%; text-align: center;">英文授課</th>
                                            <th style="width:10%; text-align: center;">教室</th>
                                        </tr>
        
                                    </thead>
                                    <tbody>
        
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </th>

</thead>
</table>
<script src="./resize_table.js"></script>

<input type="button" name="test" onclick="functionaddRow();">
`

document.addEventListener("click", (e) => {
    console.log(e);
    document.cookie=`COOKIE_NSYSU_Courses_Selector_Helper_Saved = ${document.getElementById("App_container").innerHTML}`
    console.log(document.cookie);
});

document.getElementById("App_container").innerHTML=web_html_init

