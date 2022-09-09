// JSON
import data from './data.json' assert {type: 'json'};

// selectors
let wrapper = document.querySelector('.wrapper-container')
let replyTextArea = document.querySelector('#replyTextArea');
let textarea = document.querySelector('#textarea')
let textareaReply = document.querySelector('#textarea-reply')
let sendBtn = document.querySelector('.send')
let btnReply = document.querySelectorAll('.reply');
let body = document.querySelector('body')

// data from JSON
let currentUser = data.currentUser.username;
let currentUserName = data.currentUser.username;
let currentUserImg = data.currentUser.image.png;

// display DOM elements
function populate(){
    // current user
    if(currentUser === 'juliusomo') {
        currentUser = 'you'
    }

    for(let i = 0; i <= data.comments.length-1; i++) {
        // retrieve data fields from JSON
        let imgSrc = data.comments[i].user.image.png;
        let createdAt = data.comments[i].createdAt;
        let commentText = data.comments[i].content;
        let score = data.comments[i].score;
        let username = data.comments[i].user.username;

        // comment container
        let comment = document.createElement('article');
        comment.classList.add('comment-container');

        // add HTML
        comment.innerHTML = `
            <div class="comment-header">
                <div class="comment-info">
                    <img class="hero-img" src="${imgSrc}" alt="hero-img">
                    <p class="user-name">${username}</p>
                    <p class="posting-date">${createdAt}</p>
                </div>
                <p class="icon-reply"><img src="./images/icon-reply.svg" alt="reply-icon"> Reply</p>
            </div>
            <div class="comment-body">
                <span class="replying-to"></span>
                <p class="comment-text">${commentText}</p>
            </div> `

        // score bar
        let scoreBar = document.createElement('div');
        scoreBar.classList.add('score-bar');
        // icon plus
        let iconPlus = document.createElement('img');
        iconPlus.classList.add('icon-plus', 'score-btn');
        iconPlus.src = "./images/icon-plus.svg";
        iconPlus.alt = "icon-plus"
        // score value
        let scoreValue = document.createElement('p')
        scoreValue.classList.add('score')
        scoreValue.dataset.value = `${score}`;
        scoreValue.innerText = `${score}`;
        // icon minus
        let iconMinus = document.createElement('img');
        iconMinus.classList.add('icon-minus', 'score-btn');
        iconMinus.src = "./images/icon-minus.svg";
        iconMinus.alt = "icon-minus"

        scoreBar.append(iconPlus, scoreValue, iconMinus)
        comment.append(scoreBar)
        wrapper.append(comment)
    }

    // reply
    data.comments.filter(d =>  {
        let replies = d.replies

        for(let i = 0; i <= replies.length-1; i++){
            let imgSrc = replies[i].user.image.png;
            let createdAt = replies[i].createdAt;
            let commentText = replies[i].content;
            let score = replies[i].score;
            let username = replies[i].user.username;
            let replyingTo = replies[i].replyingTo;

            let reply = document.createElement('article');
            reply.classList.add('reply-container', 'comment-container')   

            reply.innerHTML = `
                <div class="comment-header">
                    <div class="comment-info">
                        <img class="hero-img" src="${imgSrc}" alt="hero-img">
                        <p class="current-user">${currentUser}</p>
                        <p class="user-name">${username}</p>
                        <p class="posting-date">${createdAt}</p>
                    </div>
                    <p class="icon-reply"><img src="./images/icon-reply.svg" alt="reply-icon"> Reply</p>
                </div>

                <div class="comment-body">
                    <span class="replying-to">@${replyingTo} </span>
                    <p class="comment-text">${commentText}</p>
                </div>
                `

                // score bar
                let scoreBar = document.createElement('div');
                scoreBar.classList.add('score-bar');
                // icon plus
                let iconPlus = document.createElement('img');
                iconPlus.classList.add('icon-plus', 'score-btn');
                iconPlus.src = "./images/icon-plus.svg";
                iconPlus.alt = "icon-plus"
                // score value
                let scoreValue = document.createElement('p')
                scoreValue.classList.add('score')
                scoreValue.dataset.value = `${score}`;
                scoreValue.innerText = `${score}`;
                // icon minus
                let iconMinus = document.createElement('img');
                iconMinus.classList.add('icon-minus', 'score-btn');
                iconMinus.src = "./images/icon-minus.svg";
                iconMinus.alt = "icon-minus"

                scoreBar.append(iconPlus, scoreValue, iconMinus)
                reply.append(scoreBar)
                
            // getting currentUser node text 
            let you = reply.childNodes[1].childNodes[1].childNodes[3];
            let replyBtn = reply.childNodes[1].childNodes[3]
            if(username !== 'juliusomo') {
                you.remove()
            }
            if(username === 'juliusomo') {
                replyBtn.remove()
                let btnGroup = document.createElement('div')
                btnGroup.classList.add('btn-group')
                let deleteIcon = document.createElement('p')
                deleteIcon.classList.add('delete-icon')
                deleteIcon.innerHTML = `
                    Delete
                    <img src="./images/icon-delete.svg" alt="">
                `
                let editIcon = document.createElement('p')
                editIcon.classList.add('edit-icon')
                editIcon.innerHTML = `
                    Edit
                    <img src="./images/icon-edit.svg" alt="">
                `
                btnGroup.append(deleteIcon)
                btnGroup.append(editIcon)
                reply.childNodes[1].append(btnGroup)
            }
            wrapper.append(reply)
        }
    })
}

// ======= FUNCTION FOR CREATING A NEW COMMENT VIA SEND BTN EVENTLISTENER =======
function createArticle(parentElement,textElement, className = 'no-value', position = 'beforeend') {
    let text = textElement.value;
    textElement.value = '';
    let d = new Date();
    let date = d.getDate();

    if(date < 10) {
        date = `0${date}`
    }

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[d.getMonth()];

    // comment container
    let comment = document.createElement('article');
    comment.classList.add('comment-container', `${className}`);


    // add HTML
    comment.innerHTML = `
        <div class="comment-header">
            <div class="comment-info">
                <img class="hero-img" src="${currentUserImg}" alt="hero-img">
                <p class="current-user">${currentUser}</p>
                <p class="user-name">${currentUserName}</p>
                <p class="posting-date">${date} ${monthName}</p>
            </div>
            <div class="btn-group">
                <p class="delete-icon">Delete <img src="./images/icon-delete.svg" alt="delete-icon"></p>
                <p class="edit-icon">Edit <img src="./images/icon-edit.svg" alt="edit-icon"></p>
            </div>
        </div>
        <div class="comment-body">
            <span class="replying-to"></span>
            <p class="comment-text">${text}</p>
        </div> `

    // score bar
    let scoreBar = document.createElement('div');
    scoreBar.classList.add('score-bar');
    // icon plus
    let iconPlus = document.createElement('img');
    iconPlus.classList.add('icon-plus', 'score-btn');
    iconPlus.src = "./images/icon-plus.svg";
    iconPlus.alt = "icon-plus"
    // score value
    let scoreValue = document.createElement('p')
    scoreValue.classList.add('score')
    scoreValue.dataset.value = 0;
    scoreValue.innerText = 0;
    // icon minus
    let iconMinus = document.createElement('img');
    iconMinus.classList.add('icon-minus', 'score-btn');
    iconMinus.src = "./images/icon-minus.svg";
    iconMinus.alt = "icon-minus"

    scoreBar.append(iconPlus, scoreValue, iconMinus)
    comment.append(scoreBar)

    parentElement.insertAdjacentElement(`${position}`, comment)
}

sendBtn.addEventListener('click', () => {
    createArticle(wrapper, textarea)
})

// populate HTML document
document.addEventListener('DOMContentLoaded', populate())

// ========= CREATING DELETE MODULE ===============
function createDeleteModule(element) {
    let moduleWrapper = document.createElement('div')
    moduleWrapper.classList.add('module-wrapper')
    let module = document.createElement('div')
    module.classList.add('module')
    module.innerHTML = `
        <h2>Delete comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div class="btn-group delete-btn-group">
            <button class="btn cancel">no, cancel</button>
            <button class="btn delete">yes, delete</button>
        </div>
    `
    let comment = element.parentElement.parentElement.parentElement;
    moduleWrapper.append(module)
    // let comment = element.parentElement.parentElement.parentElement.parentElement.parentElement;
    // comment.insertAdjacentElement('beforeend', module)
    comment.insertAdjacentElement('beforeend', moduleWrapper)
}

// ========= CREATING EDIT MODULE ===============
function createEditModule(editBtn) {
    // creating .textarea
    let editTextArea = document.createElement('textarea')
    editTextArea.classList.add('textarea', 'edit-textarea')

    // creating .update-btn
    let updateBtn = document.createElement('button')
    updateBtn.classList.add('btn', 'update-btn')
    updateBtn.innerText = 'update';

    // comment-text element
    let commentText = editBtn.parentElement.parentElement.parentElement.children[1].children[1];
    editTextArea.value = commentText.innerText; // adding .comment-text element textContent which is trimmed to created textarea element

    // reply-text element
    let replyToText = editBtn.parentElement.parentElement.parentElement.children[1].children[0];

    // .comment-body element
    let commentBody = editBtn.parentElement.parentElement.parentElement.children[1];

    // ADDING CLASSES FOR ELEMENTS
    editBtn.classList.add('pointer-events')
    commentText.classList.add('hide')
    replyToText.classList.add('hide')

    // adding created textarea and .update-btn to .comment-body
    commentBody.append(editTextArea, updateBtn)
}

function updateEdit(element) {
    let editIcon = element.parentElement.parentElement.children[0].children[1].children[1]; // edit icon
    let textarea = element.previousElementSibling;  // textarea element
    let commentText = element.previousElementSibling.previousElementSibling; // comment-text element
    let replyTo = element.parentElement.children[0]; // replying-to element   

    commentText.innerText = textarea.value;

    commentText.classList.remove('hide');
    replyTo.classList.remove('hide');
    editIcon.classList.remove('pointer-events')

    textarea.remove()
    element.remove()
}

// global eventListener
document.addEventListener('click', e => {
    if(e.target.matches('.icon-plus')) {
        let dataValue = e.target.nextElementSibling.dataset.value;
        let scoreValue = e.target.nextElementSibling.innerText;
        if(e.target.nextElementSibling.innerText > dataValue-1){
            e.target.style.pointerEvents = "none";
        }
        e.target.nextElementSibling.innerText = ++scoreValue;
        e.target.nextElementSibling.nextElementSibling.style.pointerEvents = 'all';
    } 
    else if(e.target.matches('.icon-minus')) {
        let dataValue = e.target.previousElementSibling.dataset.value;
        let scoreValue = e.target.previousElementSibling.innerText;
        if(e.target.previousElementSibling.innerText < dataValue+1){
            e.target.style.pointerEvents = "none";
        }
        e.target.previousElementSibling.innerText = --scoreValue;
        e.target.previousElementSibling.previousElementSibling.style.pointerEvents = 'all';
    }
    // DELETE BTN
    else if(e.target.matches('.delete-icon')) {
        createDeleteModule(e.target)
    }
    // CANCEL BTN
    else if(e.target.matches('.cancel')){
        e.target.parentElement.parentElement.parentElement.remove()
    }
    // DELETE BTN INSIDE DELETE MODULE
    else if (e.target.matches('.delete')) {
        let rootElement = e.target.parentElement.parentElement.parentElement.parentElement;
        console.log(rootElement);
        rootElement.classList.add('remove-anime')
        // removing element from DOM
        setTimeout(() => {
            rootElement.classList.remove('remove-anime')
            rootElement.remove()
        }, 501);
    }
    // EDIT BTN 
    else if(e.target.matches('.edit-icon')) {
        createEditModule(e.target)
    }   
    // UPDATE BTN
    else if(e.target.matches('.update-btn')) {
        updateEdit(e.target)
    }
    // REPLY BTN
    else if(e.target.matches('.icon-reply')) {
        replyTextArea.classList.toggle('hide')
        let parentContainer = e.target.parentElement.parentElement;
        // after clicking on reply button it will insert replyText area after that container which contains reply btn
        parentContainer.insertAdjacentElement('afterend', replyTextArea)
    }
})

// ========= REPLY BUTTON EVENT ===========
btnReply.forEach(btn => {
    btn.addEventListener('click', (e) => {
        replyTextArea.classList.toggle('hide')
        
        let parentContainer = e.target.parentElement.previousElementSibling; // comment container
    
        let className = 'reply-container-2';
        let position = 'afterend';
        
        createArticle(parentContainer, textareaReply, className, position)
        replyTo()
    
    })
})

function replyTo() {
    let replyContainer = document.querySelectorAll('.reply-container-2')
    replyContainer.forEach(rep => {
        let replyingTo = rep.children[1].children[0];
        let containerUserName = rep.previousElementSibling.children[0].children[0].children[1].innerText;
        replyingTo.innerText = `@${containerUserName}`;
    })
}