const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tasksFile = path.join(__dirname, 'tasks.json');
if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify([])); 
}
function readTasks() {
    const data = fs.readFileSync(tasksFile, 'utf-8');
    return JSON.parse(data);
}
function writeTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function showMenu() {
    console.log('\nTask Manager');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');
    rl.question('Choose an option: ', handleChoice);
}
function handleChoice(option) {
    switch (option.trim()) {
        case '1':
            rl.question('Enter the task description: ', addTask);
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            rl.question('Enter the task number to mark as complete: ', markTaskComplete);
            break;
        case '4':
            rl.question('Enter the task number to remove: ', removeTask);
            break;
        case '5':
            console.log('Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid choice. Please try again.');
            showMenu();
    }
}

function addTask(description) {
    const tasks = readTasks();
    tasks.push({ description, completed: false });
    writeTasks(tasks);
    console.log('Task added successfully.');
    showMenu();
}
function viewTasks() {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('\nTask List:');
        tasks.forEach((task, index) => {
            const status = task.completed ? '[✓]' : '[ ]';
            console.log(`${index + 1}. ${status} ${task.description}`);
        });
    }
    showMenu();
}


function markTaskComplete(number) {
    const tasks = readTasks();
    const index = parseInt(number.trim()) - 1;

    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        writeTasks(tasks);
        console.log('Task marked as complete.');
    } else {
        console.log('Invalid task number.');
    }
    showMenu();
}


function removeTask(number) {
    const tasks = readTasks();
    const index = parseInt(number.trim()) - 1;

    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        writeTasks(tasks);
        console.log('Task removed successfully.');
    } else {
        console.log('Invalid task number.');
    }
    showMenu();
}


showMenu();
