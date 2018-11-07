
const urlParams = new URLSearchParams(location.search);
const questionId = Number(urlParams.get('questionId'));   
if(questionId){
    doFetch(`http://localhost:8000/api/v1/question/${questionId}/answers`, 'get')
    .then(answers => {
    if (answers.error){
        // window.location.replace("profile.html");
    } else{
        answers.answers.map((answer,index) => {
            let commentList = document.createElement("li")
                commentList.innerHTML = 
                    `<div class="comment-main-level">
                        <div class="comment-avatar">
                            <img src="https://res.cloudinary.com/julietezekwe/image/upload/v1527437504/avarta1.jpg" alt="">
                        </div>
                        <div class="comment-box">
                            <div class="comment-head">
                                <h6 class="comment-name by-author"><a href="">${answer.user_name}</a></h6>
                                <span> 1hr ago</span>
                            </div>
                            <div class="comment-content">
                                ${answer.answer}
                            </div>
                            <div class="comment-head">
                                <a href="comments.html?questionId=${questionId}&&answerId=${answer.id}">Reply(2)</a>
                                <i >Likes 3</i>
                                <i >dislikes 1</i>
                            </div>
                        </div>
                    </div>`;
            document.getElementById("comments-list").appendChild(commentList);
        })
    }
    doFetch(`http://localhost:8000/api/v1/question/${questionId}`, 'get')
    .then(questions => {
        if (questions.error){
            window.location.replace("index.html");
        }
        const { title, question, created_at, user_id }= questions.questionDetail;
        doFetch(`http://localhost:8000/api/v1/auth/${user_id}`, 'get')
        .then(user=>{
            if(user.error){
                console.log('something went wrong')
            }
            let container = document.createElement("div");
                container.innerHTML = 
                    `<div class="comment-box">
                        <div id="card" class="card">
                            <h2>${title}</h2> 
                            <div class="comment-head">
                                <h6 class="comment-name by-author"><a href="#">${user.userDetail.name}</a></h6>
                                <span> ${created_at}</span>    
                            </div>
                            <p> ${question}</p>
                        </div>
                    </div>`;
            document.getElementById("question").appendChild(container);
            });
        });
    });
} else {
    window.location.replace("profile.html");
}

const submitComment = () => {
const response = document.getElementById('response').value;
if(sessionStorage.getItem('token')){
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    const body =JSON.stringify({
        body: response,
    })

    // console.log(token, id)
    doFetch(`http://localhost:8000/api/v1/question/${questionId}/answer`, 'post', token, body).then(data => {
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
const submitReply = () => {
    const response = document.getElementById('reply').value;
    const answerId = Number(urlParams.get('answerId'));
    if(sessionStorage.getItem('token')){
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('id');
        const body =JSON.stringify({
        body: response,
        })
        // console.log(token, id)
        doFetch(`http://localhost:8000/api/v1/answer/${answerId}/comment`, 'post', token, body).then(data => {
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