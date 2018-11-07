if(sessionStorage.getItem('token')){
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');


    doFetch(`http://localhost:8000/api/v1/question/${id}/questions`, 'get', token).then(data => {

        if(data.questions){
            const userQuestions =data.questions;
            let recentQuestions = [...userQuestions];
               recentQuestions = recentQuestions.reverse()

            getQuestion(userQuestions, "#card");
            getQuestion(recentQuestions, "#cardSide");

        }
        else if (data.error === true){

            noQuestion('#card');
            noQuestion('#cardSide')

        };

    });
}
else{
    window.location.replace('login.html');
}


const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
}

// get users questions
const getQuestion = (questions, id) => {

    questions.map((question, index)=> {
        let newdiv = document.createElement('div');
        newdiv.innerHTML=`<h4>${question.title} <i class="pull-right"> ${question.created_at}</i> </h4> <div > ${question.question} 
        </div><span id="${id}answer${index}"> </span>`;
        doFetch(`http://localhost:8000/api/v1/question/${question.id}/answers`, 'get')
            .then(data=>{
                let found = false;
                let count = 0;
                console.log(data.message);
                if(data.message === "Success"){
                    count = data.answers.length;
                    found = true;
                }
                if(found){
                    document.getElementById(`${id}answer${index}`).innerHTML= `<a href="comments.html?questionId=${question.id} " class="primary">Answers(${count})</a>` 
            }
        });

        newdiv.innerHTML += `<button onclick="deleteQuestion(${question.id})" class="btn small pull-right">Delete</button><hr class="hr-light">`;

        document.querySelector(id).appendChild(newdiv);

    });
}

//  no questions

const noQuestion = div => {
    const newdiv = document.createElement('div');
    newdiv.innerHTML="<p>You have no questions now</p>";
    document.querySelector(div).appendChild(newdiv);
}

const deleteQuestion = (id) => {
   
    if(sessionStorage.getItem('token')){
        const token = sessionStorage.getItem('token');
      
        doFetch(`http://localhost:8000/api/v1/question/${id}`, 'delete', token).then(data => {
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