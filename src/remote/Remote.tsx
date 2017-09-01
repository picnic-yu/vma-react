// import 'fetch';

export async function login(userName: string, password: string) {
    let response = await fetch('http://localhost:8080/login.json', {mode: 'cors'});
    // let response = await fetch('/login.json');
    let data = response.json();
    return data;        

    // fetch('http://localhost:3000/login.json').then(function (response) {
    //         return response.json();
    //     }).then(function(data) {
    //             console.log(data);
    //     }).catch(function(ex) {
    //         console.log(ex);
    //     });
}
