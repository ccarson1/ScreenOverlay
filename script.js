let lesson_text;
let lesson_video;
let arr;
let lesson_array
let text_pos = 0;

window.addEventListener("load", () => {
    lesson_text = document.getElementById("lesson-text");
    lesson_video = document.getElementById("myVideo");

    arr = lesson_text.innerHTML.split("\n");
    console.log(arr);
    // console.log(lesson_text)
    arr = cleanArr(arr);
    lesson_array = breakArrayText(arr);
    //console.log(cleanArr(arr));

    // console.log(lesson_video.currentTime);
    // console.log(lesson_video.duration);

    



});

//breaks the array into a text array and an array that holds the values for the time stamps
function breakArrayText(arr){

    let textArr = [];
    let timeArr = [];

    for(let x=0; x<arr.length; x++){
        arr[x].slice(11)
        if(arr[x].slice(0,12) != "            "){
            textArr.push(arr[x]);
        }
        else{
            let tStamp = arr[x].slice(12).split(":");
            let newTime = (parseInt(tStamp[0])*60)+ parseInt(tStamp[1]);
            timeArr.push(newTime);
        }
    }

    return [textArr, timeArr];
}



//removes emtpy spaced entries in the array
function cleanArr(arr){
    let newArr = [];
    for(let n=0; n<arr.length; n++){
        if(!spacing(arr[n])){
            newArr.push(arr[n]);
        }
    }

    function spacing(element){
        let count = 0;
        for(let e=0; e<element.length; e++){
            if(element[e] == " "){
                count++;
            }
        }
        if(count == element.length){
            return true
        }
        else{
            return false
        }
    }

    return newArr;
}

function overlayWordDisplay(text_string){
    string_arr = text_string.split(" ");

    for(let s=0; s<string_arr.length; s++){
        let word = document.createElement("span");
        word.innerText = string_arr[s];
        
        word.setAttribute("class", "dis-word");
        lesson_text.appendChild(word);
    }

}

function updateText(){

    
    console.log(Math.ceil(lesson_video.currentTime));
    console.log(lesson_array[1][text_pos]);

    if(parseInt(lesson_array[1][text_pos]) == Math.ceil(lesson_video.currentTime)){
        
        text_pos++;
    }

    lesson_text.innerHTML = "";
    overlayWordDisplay(lesson_array[0][text_pos]);
}

setInterval(updateText, 1000);

