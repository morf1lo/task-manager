class TaskManager {
    constructor() {
        this.taskForm = document.getElementById('adding-task-form');
        this.taskList = document.getElementById('task-list');
        this.loadTasks();
        this.execute();
    }

    execute() {
        const self = this;

        this.taskForm.addEventListener('submit', function(event) {
            event.preventDefault();

            try {
                self.createTaskElement();
            } catch (error) {
                console.error(error);
            }
        });
    }

    saveTasks() {
        const tasks = [];
        const taskContainers = this.taskList.querySelectorAll('.option-container');

        try {
            taskContainers.forEach(container => {
                const taskText = container.querySelector('.task-item').textContent;
                const isCompleted = container.querySelector('.custom-checkbox').checked;
                tasks.push({ text: taskText, completed: isCompleted });
            });
    
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error(error);
            return;
        }
    }

    loadTasks() {
        const self = this;
        const savedTasks = localStorage.getItem('tasks');
        
        if (savedTasks) {
            try {
                const tasks = JSON.parse(savedTasks);

                tasks.forEach(task => {
                    self.createTaskElement(task.text, task.completed);
                });
            } catch (error) {
                console.error(error);
                return;
            }
        }
    }

    createTaskElement(tasktext, isCompleted) {
        const self = this;

        const taskInput = document.getElementById('adding-task-field');
        const taskText = taskInput.value.trim();

        const text = tasktext ? tasktext : taskText;
        const iscompleted = isCompleted ? isCompleted : false;

        if (text != '') {
            const optionContainer = document.createElement('div');
            const taskCompletedContainer = document.createElement('div');
            const taskCompleted = document.createElement('input');
            const taskValue = document.createElement('p');
            const deleteImage = document.createElement('img');
    
            optionContainer.classList.add('option-container');
    
            taskCompletedContainer.classList.add('task-completed-container');
            taskCompleted.classList.add('custom-checkbox');
            taskCompleted.type = 'checkbox';
            taskCompleted.checked = iscompleted;
            taskCompleted.addEventListener('change', function() {
                self.saveTasks();
            });
    
            taskValue.classList.add('task-item');
            taskValue.textContent = text;
    
            deleteImage.classList.add('delete-image');
            deleteImage.src = 'img/delete.svg';
            deleteImage.draggable = false;
            deleteImage.onclick = function() {
                self.deleteTask(optionContainer);
            }
    
            self.taskList.appendChild(optionContainer);
    
            optionContainer.appendChild(taskCompletedContainer);
    
            taskCompletedContainer.appendChild(taskCompleted);
            optionContainer.appendChild(taskValue);
    
            optionContainer.appendChild(deleteImage);

            taskInput.value = '';
    
            self.saveTasks();

            return optionContainer;
        }
    }

    deleteTask(element) {
        try {
            element.remove();
            this.saveTasks();
        } catch (error) {
            console.error(error);
            return;
        }
    }
}

new TaskManager();
