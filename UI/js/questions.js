const submitQuestion = () =>{
    const title = document.getElementById('title').value;
    const response = document.getElementById('question').value;

    if(sessionStorage.getItem('token')){
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('id');
        const body =JSON.stringify({
            title,
            body: response,         
        })
        doFetch(`http://localhost:8000/api/v1/question`, 'post', token, body).then(data => {
            let message = '';
            if(!data.error){
                message = data.message;
                location.reload();
                console.log(message)
            }
            message = data.message;
            console.log(message)
        });
    }
    else{
        window.location.replace('login.html');
    }
}