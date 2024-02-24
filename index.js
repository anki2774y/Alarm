const dataJson = []

// Backspace problem to resolve


// Updating the Time & Setting on the alarm
function updateTime() {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    const currentTimeEl = document.getElementById('crntTime');
    currentTimeEl.textContent = currentTime;

    for (let i = 0; i < dataJson.length; i++) {
        const alarmHour = dataJson[i].hour;
        const alarmMinute = dataJson[i].minute;
        const alarmSecond = dataJson[i].second;
        const alarmMeridiem = dataJson[i].meridiem;

        // current time splitting
        const [hour, minute, second, meridiem] = currentTime.split(/:|\s+/);

        // Checking if alarm need to set on or off
        if(alarmHour === hour && alarmMinute === minute && alarmSecond === second && alarmMeridiem === meridiem) {
            alert("Alarm sets on");
        } else {
            console.log("BYe!!");
        }
    }    
}
// using this to update the current time in UI
// and checking if the alarm time sets, if it matches the current time or not
updateTime();
setInterval(updateTime, 1000);

// Adding the Alarm 
const addEl = document.getElementById('add');
const formEl = document.getElementsByTagName('form')[0];
const setAlarmBtn = document.getElementById('setAlarm');

// To display or hide form
addEl.addEventListener('click', ()=> {
    formEl.style.display === '' 
    ? formEl.style.display = 'flex' 
    : formEl.style.display = '';
});

// Set the alarm listener
setAlarmBtn.addEventListener('click', (e) => handleNewAlarm(e));

const alarmContainerEl = document.getElementById('alarmCnt');

function updateAlarmList() {

    // Emptying the earlier data so that new data can be rendered
    alarmContainerEl.innerHTML = '';

    dataJson.map((data) => {
        // Creating a new alarm Html content
        const alarmList = document.createElement('li');
        const alarmCnt = document.createElement('div');
        const alarmIcon = document.createElement('img');
        const alarmTime = document.createElement('p');
        const delBtn = document.createElement('button');

        alarmIcon.src = 'https://cdn-icons-png.flaticon.com/128/11252/11252514.png';

        delBtn.innerHTML = 'Delete';

        alarmList.className = 'alarmList';
        alarmCnt.className = 'alarmlistCnt';
        alarmIcon.className = 'imgIcon';
        alarmTime.className = 'time';
        delBtn.className = 'deleteBtn';

        alarmContainerEl.appendChild(alarmList);
        alarmList.appendChild(alarmCnt);
        alarmCnt.appendChild(alarmIcon);
        alarmCnt.appendChild(alarmTime);
        alarmList.appendChild(delBtn);

        alarmTime.textContent = data.hour + ':' + data.minute + ':' + data.second + ' ' + data.meridiem;

        // Delete the alarm
        delBtn.addEventListener('click', () => {
            deleteAlarm(data.id); // Call deleteAlarm function with the unique identifier of the alarm to be deleted
        });
    })
}

// Delete the alarm
function deleteAlarm(id) {
    // Find the index of the alarm with the given id
    const index = dataJson.findIndex(alarm => alarm.id === id);
    if (index !== -1) {
        // Remove the alarm at the found index
        dataJson.splice(index, 1);
        // Update the alarm list displayed on the webpage
        updateAlarmList();
    }
}


function handleNewAlarm(e) {
    e.preventDefault();
    if(hourInputEl.value && minInputEl.value && secInputEl.value && meridiem) {
        // Pushing new data 
        dataJson.push({
            id: dataJson.length+1,
            hour, 
            minute, 
            second, 
            meridiem: meridiem.replace(/\s+/g, '')
        });

        // Updating the Alarm List
        updateAlarmList();
        // Clearing the Values
        hourInputEl.value = '';
        minInputEl.value = '';
        secInputEl.value = '';
        hour = '';
        minute = '';
        second = '';
        // Setting the default Selection thing
        amOrPmEl.childNodes[1].innerHTML = 'AM/PM';
        formEl.style.display = 'none';
    }
    else {
        alert("Please Input Valid Values!!")        
        return;
    }
}






// Get the input element
const hourInputEl = document.getElementById('hourInput');
const minInputEl = document.getElementById('minInput');
const secInputEl = document.getElementById('secInput');
let hour='', second='', minute='';

document.addEventListener('keypress', function(e) {
    if (e.target === hourInputEl) {
        handleInputs(e, 'hour');
        hourInputEl.innerHTML = hour;
    } else if (e.target === minInputEl) {
        handleInputs(e, 'minute');
        minInputEl.innerHTML = minute;
    } else if (e.target === secInputEl) {
        handleInputs(e, 'second');
        secInputEl.innerHTML = second;
    }
});

// Handling key press for the time to input in our form
function handleInputs(event, type) {
    var key = event.which || event.keyCode;
    console.log("Key :: ", key);
    if (key < 48 || key > 57) {
        event.preventDefault();
    }
    if(type === 'hour') {
        if (Number(hour + event.key) > 0 && Number(hour + event.key) <= 12) {
            hour = hour + event.key;
        } else {
            alert("Hour cannot be greater than 12");
            event.preventDefault();
        }
    } else if(type === 'minute') {
        if (Number(minute + event.key) >= 0 && Number(minute + event.key) <= 60) {
            minute = minute + event.key;
        } else {
            alert("Minute should lie between 0 to 60");
            event.preventDefault();
        }
    } else if(type === 'second') {
        if (Number(second + event.key) >= 0 && Number(second + event.key) <= 60) {
            second = second + event.key;
        } else {
            alert("Second should lie between 0 to 60");
            event.preventDefault();
        }
    }
}


// set am or pm
let meridiem;  // holding value of AM or PM

const amOrPmEl = document.getElementById('amOrPmCnt');
const container = document.getElementById('AMorPMCnt');
const selectAmOrPm = document.getElementById('selectAmOrPm');

const amCntEl = document.getElementById('AMCnt');
const pmCntEl = document.getElementById('PMCnt');

// Container which holds to select the AM or PM
container.addEventListener('click', (e)=>{handleShowAmPM(e)});

// Event Listener to set the AM or PM
amCntEl.addEventListener('click', ()=>{setMeridiem(amCntEl.childNodes[1].innerHTML)});
pmCntEl.addEventListener('click', ()=>{setMeridiem(pmCntEl.childNodes[1].innerHTML)});

container.style.borderRadius = '5px' 

// Show AM or PM to select it
function handleShowAmPM(e) {
    e.preventDefault();
    
    container.style.borderBottomLeftRadius === '' 
    ? container.style.borderBottomLeftRadius = '5px'
    : container.style.borderBottomLeftRadius = '' ;
    
    container.style.borderBottomRightRadius === '' 
    ? container.style.borderBottomRightRadius = '5px'
    : container.style.borderBottomRightRadius = '';

    selectAmOrPm.style.display === '' 
    ? selectAmOrPm.style.display = 'flex' 
    : selectAmOrPm.style.display = '';
}

// Set the Meridiem 
function setMeridiem(input) {
    meridiem = input;
    selectAmOrPm.style.display = 'none';
    amOrPmEl.childNodes[1].innerHTML = meridiem;
}