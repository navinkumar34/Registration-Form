const addRow = () => { 
    let obj = {};
    obj.name = document.getElementById("name").value.trim();
    obj.age = document.getElementById("age").value.trim();
    let gendergroup = document.getElementsByName("gender");
    let gender="";
    for(let i=0; i < gendergroup.length; i++ ){
        if(gendergroup[i].checked){
            gender = gendergroup[i].value;
        }
    }
    obj.gender = gender;
    obj.phone = document.getElementById("phone").value.trim();
    obj.email = document.getElementById("emailadd").value.trim();
    obj.country = document.getElementById("country").value.trim();
    obj.state = document.getElementById("state").value.trim();
    obj.city = document.getElementById("city").value.trim();
    let blue = document.getElementById("blue").checked ? document.getElementById("blue").value : "";
    let orange = document.getElementById("orange").checked ? document.getElementById("orange").value : "";
    let black = document.getElementById("black").checked ? document.getElementById("black").value : "";
    let red = document.getElementById("red").checked ? document.getElementById("red").value : "";
    obj.fcolor = ((red +" " +black +" "+orange+" "+ blue).trim()) +" ";
    obj.msg = document.getElementById("Message").value.length > 0 ? document.getElementById("Message").value.trim():"";
    let rs = datavalidate(obj);
    if(rs.localeCompare("valid")===0){
        appendtable(obj);
        setDefaults();   
    }
    else
    {
        let errormsg = document.getElementById("form-message");
        let err1 = document.createElement("LI");
        err1.appendChild(document.createTextNode(rs));
        errormsg.appendChild(err1);
    }
}

const appendtable = (dataobj) => {
    const datatable = document.getElementById("dataTable");
    let rowcount= datatable.rows.length;
    let newRow = datatable.insertRow(rowcount);
    for(let key in dataobj){
        let ncell= newRow.insertCell();
        ncell.appendChild(document.createTextNode(dataobj[key]));
    }       
}

const setDefaults = () => {
    document.getElementById("name").value="";
    document.getElementById("age").value="";
    document.getElementById("phone").value="";
    document.getElementById("emailadd").value="";
    document.getElementById("Message").value="";
    document.getElementById("country").selectedIndex = "0";
    document.getElementById("state").selectedIndex = "0";
    document.getElementById("city").selectedIndex = "0";
    let gender= document.getElementById("male");
    gender.checked = true;
    let blue = document.getElementById("blue");
    blue.checked = false;
    let red = document.getElementById("red");
    red.checked = false;
    let orange = document.getElementById("orange");
    orange.checked = false;
    let black = document.getElementById("black");
    black.checked = false;
    let errormsg = document.getElementById("form-message");
    errormsg.remove();
    let errmsgdiv = document.getElementById("errormsg");
    let newerrormsg = document.createElement("UL");
    newerrormsg.setAttribute("id", "form-message");
    errmsgdiv.appendChild(newerrormsg);
    let select = document.getElementById("state");
    for(let i = select.options.length ; i > 0 ; i--){
        select.options[i] = null;
    }
    select = document.getElementById("city");
    for(let i = select.options.length ; i > 0 ; i--){
        select.options[i] = null;
    }
}

const datavalidate = (dataobj) => {
    const mailformat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phonenoformat = /^\d{10}$/;
    let errormsg = document.getElementById("form-message");
    errormsg.remove();
    let errmsgdiv = document.getElementById("errormsg");
    let newerrormsg = document.createElement("UL");
    newerrormsg.setAttribute("id", "form-message");
    errmsgdiv.appendChild(newerrormsg);
    if(dataobj.name.localeCompare("")===0)
        return "Please enter name";
    if(Number(dataobj.age) < 1 || Number(dataobj.age) > 70  )
        return "Age must be between 1 and 70";
    if(dataobj.email.match(mailformat) == null)
        return "Enter valid email address";
    if(dataobj.phone.match(phonenoformat) == null )
        return "Enter valid phone number";
    if(dataobj.country.localeCompare("")===0)
        return "Please select a country";
    if(dataobj.state.localeCompare("")===0)
        return "Please select a state";
    if(dataobj.city.localeCompare("")===0)
        return "Please select a city";
    return "valid";   
}

const states ={
    Australia : ["New South Wales", "Victoria", "Queensland"],
    Canada : ["Ontario","Quebec","Alberta"],
    India : ["Tamil Nadu", "Karnataka", "Maharashtra"],
};
 
const cities = {
    Ontario : ["Windsor", "Toronto", "Ottawa"],
    Quebec : ["Montreal", "Gatineau", "Quebec City"],
    Alberta : ["Calgary"],
    "New South Wales":["Sydney","Newcastle","Gosford"],
    Victoria : ["Melbourne", "Ararat", "Portland", "Mildura"],
    Queensland : ["Brisbane","Gold Coast","Redcliffe City"],
    "Tamil Nadu":["Chennai","Coimbatore","Vellore"],
    Karnataka : ["Banglore", "Mysuru","Udupi"],
    Maharashtra :["Mumbai","Nagpur","Pune"]   
};


const Country = document.getElementById("country")
Country.addEventListener("change", () => {
    let country = document.getElementById("country").value;
    if(country.localeCompare("") === 0)
         return;
    let select = document.getElementById("state");
    for(let i = select.options.length ; i > 0 ; i--){
        select.options[i] = null;
    }
    for(let i = 0; i < states[country].length; i++){
        let opt = document.createElement("OPTION");
        opt.text = states[country][i];
        opt.value = states[country][i];
        select.appendChild(opt);
    }  
});

const state = document.getElementById("state")
state.addEventListener("change", () => {
    let state = document.getElementById("state").value;
    if(state.localeCompare("") === 0)
        return;
    let select = document.getElementById("city");
    for(let i = select.options.length ; i > 0 ; i--){
        select.options[i] = null;
    }
    for(let i = 0; i < cities[state].length; i++){
        let opt = document.createElement("OPTION");
        opt.text = cities[state][i];
        opt.value = cities[state][i];
        select.appendChild(opt);
    }      
});