//For all of these functions, we will just pass in the object literal which we'll send to the server

function create_user(param) {
    server_fetch("/register", "POST", param)
    .then(res=>res.json())
    .then((response)=>{
        if (response.success){
           return JSON.parse(response);
        }
        else{
            console.log(response.description);
        }

    })
    .catch((error)=>console.error("Error",error));
}

// function server_fetch(endpoint, method, data, headers={"content-type": "application/json"}) {
//     let url = "http://ec2-44-203-76-180.compute-1.amazonaws.com:3456"+endpoint;
//     let json = {"method":method,
//             "body":JSON.stringify(data),
//             "header":headers};

//     return  fetch(url, json);
//     //Returns the fetch() promise, each method which calls this can determine how they want to resolve this promise
// }


function login(param) { //Stores username in a cookie/global variable


    // fetch(
    //     "http://ec2-44-203-76-180.compute-1.amazonaws.com:3456/auth", 
    //     {"method":"POST",
    //     "body":JSON.stringify(param),
    //     "header":{"content-type": "application/json"}
    // }).then(res=>res.json())
    //   .then(res => {
    //       console.log(JSON.stringify(res));
    //       return res;
    //     })
    //   .catch(error => console.error("Error", error));


    // console.log(param);
    // try {
        

    //     let promise = server_fetch("/auth", "POST", param);
    //     console.log(promise);
    //     const response = await promise;
    //     console.log(promise);
    //     //console.log(promise.get());

    //     console.log(response.status);
    //     console.log(response.message);
    //     console.log(JSON.stringify(response));
    //     if (response.status === 200){
    //         console.log("Login success");
    //          document.cookie = "username= "+param.username+";";
    //     }
    //     else{
    //         console.log(response.message);
    //     }

    //     return response;
    // }
    // catch (error) {
    //     console.error("Error",error)
    // }

    console.log("param "+param);

    return server_fetch("/auth", "POST", param)
    .then(res=>res.json(), (error)=>console.error("Error",error))
    .then((response)=>{
        // if (response.success){
            
        //     console.log("in if "+JSON.stringify(response));
        //     document.cookie = "username= "+param.username+";";
        // }
        // else{
        //     console.log("Else "+response.message);
        // }
        
        console.log(JSON.stringify(response)+" api-user");
        return response;

    })
    .catch((error)=>console.error("Error",error));
}



function logout(param) { //Stores username in a cookie/global variable
    server_fetch("/user/"+get_username()+"/logout", "GET", param)
    .then(res=>res.json())
    .then((response)=>{
        if (response.success){
            document.cookie = "username= ;";
           return JSON.parse(response);
        }
        else{
            console.log(response.description);
        }

    })
    .catch((error)=>console.error("Error",error));
}

//Events fetch

function add_event(param) {
    return generic_fetch("/user/"+get_username()+"/event","POST", param);
}

function unresolved_events(param) {
    return generic_fetch("/user/"+get_username()+"/event","GET", param);
}

function update_event(param) {
    return generic_fetch("/user/"+get_username()+"/event","PUT", param);
}

function delete_event(param) {
    return generic_fetch("/user/"+get_username()+"/event","DELETE", param);
}


//Courses fetch

function add_course(param) {
    return generic_fetch("/user/"+get_username()+"/course","POST", param);
}

function current_courses(param) {
    return generic_fetch("/user/"+get_username()+"/event","GET", param);
}

function update_course(param) {
    return generic_fetch("/user/"+get_username()+"/event","PUT", param);
}

function delete_course(param) {
    return generic_fetch("/user/"+get_username()+"/event","DELETE", param);
}

//User-info fetch

function user_info(param) {
    return generic_fetch("/user/"+get_username(),"GET", param);
}

function update_userinfo(param) {
    return generic_fetch("/user/"+get_username(),"PUT", param);
}

function delete_user(param) {
    return generic_fetch("/user/"+get_username(),"DELETE", param);
}


//Adding a university

function define_university(param){
    return generic_fetch("/university","POST", param);
}

//University courselist

function university_courselist(param) {
    //NOTE: param will be the university name
    return generic_fetch("/university/"+param+"/courselist","GET", param);
}

//Really no need to have access to this from the frontend
// function add_to_university_courselist(param) {
//     //NOTE: param will be the university name
//     return generic_fetch("/university/"+param+"/courselist","GET", param);
// }

//Generic fetch gets a promise from server_fetch() and the .then .catch chaining acts as blocking which resolves the promise
async function generic_fetch(endpoint, method, data) {
    server_fetch(endpoint, method, data)
    .then(res=>res.json())
    .then((response)=>{
        if (response.success){
           return JSON.parse(response);
        }
        else{
            console.log(response.description);
        }

    })
    .catch((error)=>console.error("Error",error));
}


function server_fetch(endpoint, method, data, headers={"content-type": "application/json"}) {
    let url = "http://ec2-44-203-76-180.compute-1.amazonaws.com:3456"+endpoint;
    let json = {'headers':headers,
            'method':method,
            'body':JSON.stringify(data)
            };

    console.log("Sent json: ");
    console.log(json);
    return  fetch(url, json);
    //Returns the fetch() promise, each method which calls this can determine how they want to resolve this promise
}


function get_username() {
    //Code taken from Mozilla
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    let cookieValue = document.cookie.split('; ').find(row => row.startsWith('username='));
    //end of code citation

    if (cookieValue !== undefined){
        return cookieValue.split('=')[1];
    }
    else {
        return null;
    }
}

export {
    create_user, login, logout, 
    add_event, delete_event, update_event, unresolved_events,
    add_course, delete_course, update_course, current_courses,
    user_info, update_userinfo, delete_user,
    define_university, university_courselist,
    get_username
}