'use strict';

const btnToDoCard = document.querySelector('#add-label');
const inputTask = document.querySelector('.label-name-input');
const disableCard = document.querySelector('.disabled-todo-card');
const btnEraseAll = document.querySelector('#clear-all-tasks');

function init() {
    addListeners();
}

function addListeners() {
    btnToDoCard.addEventListener('click', leftMouseClick);
    inputTask.addEventListener('keydown', pressEnter);
    btnEraseAll.addEventListener('click', removeAllCards);
}

function leftMouseClick() {
    checkInputEnterToDo();
}

function pressEnter(e) {
    if (e.keyCode === 13) checkInputEnterToDo();
}

function checkInputEnterToDo() {
    const enterTodo = document.querySelector('.label-name-input');

    if (enterTodo.value === '') return alert(`'Enter ToDo' field is empty!`);

    enterTodo.addEventListener('change', function (e) {
        console.log(this.value);
        //console.log(e.target.value);
    });

    makeCard({
        parent: 'todo-placeholder',
        cardName: 'todo-card',
        titleName: 'title',
        taskList: 'tasks',
    });
}

function makeCard({ parent, cardName, titleName, taskList }) {
    removeDisabledCard();

    const cardWrapper = document.querySelector(`.${parent}`);

    function newElement(
        parentElement,
        newElement,
        childClassName,
        childClassName1
    ) {
        const newElm = document.createElement(newElement);
        if (childClassName)
            if (!childClassName1) {
                newElm.classList.add(childClassName);
            } else {
                newElm.classList.add(childClassName, childClassName1);
            }

        parentElement.appendChild(newElm);
    }

    newElement(cardWrapper, 'div', cardName);

    function titleBar() {
        const cardsElement = document.querySelectorAll(`.${cardName}`);

        cardsElement.forEach(cardElement => {
            if (!cardElement.querySelector(`.${titleName}`)) {
                newElement(cardElement, 'div', titleName);

                const titleElement = cardElement.querySelector(`.${titleName}`);
                if (!titleElement.querySelector('h1'))
                    return (titleElement.appendChild(
                        document.createElement('h1')
                    ).innerText = inputTask.value);
            }
        });
    }

    titleBar(titleName);

    function inputBtnBar() {
        const cardsElement = document.querySelectorAll(`.${cardName}`);

        cardsElement.forEach(cardElement => {
            if (!cardElement.querySelector('.btn-input')) {
                newElement(cardElement, 'div', 'btn-input');

                const cardElementChild =
                    cardElement.querySelector('.btn-input');
                cardElementChild
                    .appendChild(document.createElement('input'))
                    .classList.add('item-input');

                cardElementChild.appendChild(
                    document.createElement('button')
                ).innerHTML = 'Add';

                cardElementChild
                    .querySelector('button')
                    .classList.add('btn', 'btn-light');
            }
        });
    }

    inputBtnBar(cardName);

    function toDoCardList() {
        const cardsElement = document.querySelectorAll(`.${cardName}`);

        cardsElement.forEach(cardElement => {
            const currentCardTaskList = cardElement.querySelector(
                `.${taskList}`
            );

            if (!currentCardTaskList) {
                newElement(cardElement, 'div', taskList);

                const enterTask = cardElement.querySelector('.item-input');
                const buttonAdd = cardElement.querySelector(
                    '.btn',
                    '.btn-light'
                );

                enterTask.addEventListener('keydown', pressEnter);
                buttonAdd.addEventListener('click', leftMosueClick);

                const currentTitleName = cardElement
                    .querySelector(`.${titleName}`)
                    .querySelector('h1').innerText;

                function pressEnter(e) {
                    if (e.keyCode === 13) {
                        if (enterTask.value === '')
                            return alert(
                                `Please insert task for ${currentTitleName}`
                            );
                        newTask();
                    }
                }

                function leftMosueClick() {
                    if (enterTask.value === '')
                        return alert(
                            `Please insert task for ${currentTitleName}`
                        );
                    newTask();
                }

                function newTask() {
                    cardElement
                        .querySelector(`.${taskList}`)
                        .appendChild(document.createElement('div'))
                        .classList.add('task-list');

                    const tasksListEach = cardElement
                        .querySelector(`.${taskList}`)
                        .querySelectorAll('.task-list');

                    tasksListEach.forEach(taskListEach => {
                        if (taskListEach.childNodes.length === 0) {
                            taskListEach.appendChild(
                                document.createElement('p')
                            );

                            taskListEach.querySelector('p').innerText =
                                cardElement
                                    .querySelector('.btn-input')
                                    .querySelector('.item-input').value;

                            taskListEach
                                .appendChild(document.createElement('button'))
                                .classList.add('btn', 'btn-light');

                            taskListEach.querySelector(
                                '.btn',
                                '.btn-light'
                            ).innerText = 'x';

                            const buttonDeleteTask = taskListEach.querySelector(
                                '.btn',
                                '.btn-light'
                            );

                            buttonDeleteTask.addEventListener(
                                'click',
                                eraseTask
                            );

                            function eraseTask() {
                                taskListEach.remove();
                            }
                        }
                    });
                }
            }
        });
    }

    toDoCardList(cardName, titleName, taskList);
}

function removeAllCards() {
    const disabledCardConstruction = disableCard.innerHTML;

    if (!document.querySelector('.disabled-todo-card')) {
        Array.from(document.querySelectorAll('.todo-card')).forEach(el =>
            el.remove()
        );

        const newDisabledToDoCard = document
            .querySelector('.todo-placeholder')
            .appendChild(document.createElement('div'));
        newDisabledToDoCard.classList.add('disabled-todo-card');

        const newDisableCard = document.querySelector('.disabled-todo-card');
        newDisableCard.insertAdjacentHTML(
            'beforeend',
            disabledCardConstruction
        );
    }
}

function removeDisabledCard() {
    const disableCard = document.querySelector('.disabled-todo-card');
    if (disableCard) disableCard.remove();
}

init();
