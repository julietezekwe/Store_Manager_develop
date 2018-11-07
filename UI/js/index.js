const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", " Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const questionCard = (props) => {
    let { question, index } = props;
    let newdiv = document.createElement('div');
    newdiv.innerHTML =`
    <div class="comment-box">
        <div class="card">
            <h2>${question.title} </h2> 
            <div class="comment-head">
                <h6 class="comment-name by-author">
                    <a href="">Juliet Eze</a>
                </h6>
                <i><span> ${days[new Date(question.created_at).getDay()]} &nbsp</span> 
                <span> ${months[new Date(question.created_at).getMonth()]} &nbsp</span>
                <span> ${new Date(question.created_at).getDate()},  &nbsp</span>
                <span> ${new Date(question.created_at).getFullYear()} &nbsp</span>
                </i>
            </div>
            <p class="comment-content" >
                ${question.question} 
            </p>
            <div class="comment-head">
                <a href="comments.html?questionId=${question.id} " class="primary"><span id="answer${index}"> comment </span></a>
                <i >Likes 3</i>
                <i >dislikes 1</i>
            </div>`

        doFetch(`http://localhost:8000/api/v1/question/${question.id}/answers`, 'get')
        .then(data=>{
            let found = false;
            let count = 0;
            if(data.message === "Success"){
                count = data.answers.length;
                found = true;
            }
            if(found){
                document.getElementById(`answer${index}`).innerHTML += `(${count})` 
            }
        });
    newdiv.innerHTML += `</div></div>`;        
    document.querySelector("#questionsBox").appendChild(newdiv);
}


doFetch(`http://localhost:8000/api/v1/questions`, 'get')
    .then(questions => {
        if(questions.error){
            document.querySelector('#questionsBox').innerHTML = "<p>You have no questions now</p>";
        } else {
            questions.questionModel.map((question, index)=> {
                let props = {question, index};
               questionCard(props);
            });
        }
});