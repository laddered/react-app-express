let createAdmin = async(passwordAdmin, emailAdmin, secretAdmin)=>{
    const response = await fetch('/authz/createAdmin', {
        method: "POST",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            password:passwordAdmin,
            email:emailAdmin,
            secretAdmin: secretAdmin
        })
    });
    const body = await response.json();
    console.log(body);

    switch (response.status) {
        case 500:
            console.log(body);
            break;
        case 409:
            console.log(body);
            break;
        case 200:
            console.log(body.message);
            break;
        default:
            console.log('Unknown error ' + response.status)
    }
};