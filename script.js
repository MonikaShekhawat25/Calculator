let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('.buttons button, .scientific-buttons button');
let themeToggleBtn = document.getElementById('themeToggleBtn');
let toggle3DEffectBtn = document.getElementById('toggle3DEffect');
let clockButton = document.getElementById('clockButton');
let historyPanel = document.getElementById('historyPanel');
let historyList = document.getElementById('historyList');
let clearHistoryButton = document.getElementById('clearHistory');

// Variables
let string = '';
let colorIndex = 0;
let memory = 0;
let is3D = false;

// Color themes
const colorThemes = [
    {
        '--bg-color': '#ffffff',
        '--text-color': '#272727',
        '--button-bg': '#f7f7f7',
        '--button-text': '#272727',
        '--opr-bg': '#ffab40',
        '--opr-text': '#ffffff',
        '--eq-bg': '#ff5252',
        '--eq-text': '#ffffff',
        '--pm-bg': '#ff4081',
        '--pm-text': '#ffffff',
        '--box-shadow': '0 4px rgba(0, 0, 0, 0.3)',
        '--button-shadow': '0 5px #ccc',
        '--button-active-shadow': '0 2px #999'
    },
    {
        '--bg-color': '#ffe5e5',
        '--text-color': '#333333',
        '--button-bg': '#ffcccc',
        '--button-text': '#333333',
        '--opr-bg': '#ff8c8c',
        '--opr-text': '#ffffff',
        '--eq-bg': '#ff6666',
        '--eq-text': '#ffffff',
        '--pm-bg': '#ff4d4d',
        '--pm-text': '#ffffff',
        '--box-shadow': '0 4px rgba(0, 0, 0, 0.3)',
        '--button-shadow': '0 5px #ccc',
        '--button-active-shadow': '0 2px #999'
    },
    {
        '--bg-color': '#e5f7ff',
        '--text-color': '#272727',
        '--button-bg': '#cceeff',
        '--button-text': '#272727',
        '--opr-bg': '#40a1ff',
        '--opr-text': '#ffffff',
        '--eq-bg': '#528cff',
        '--eq-text': '#ffffff',
        '--pm-bg': '#4070ff',
        '--pm-text': '#ffffff',
        '--box-shadow': '0 4px rgba(0, 0, 0, 0.3)',
        '--button-shadow': '0 5px #ccc',
        '--button-active-shadow': '0 2px #999'
    },
    {
        '--bg-color': '#e5ffe5',
        '--text-color': '#272727',
        '--button-bg': '#ccffcc',
        '--button-text': '#272727',
        '--opr-bg': '#40ff80',
        '--opr-text': '#ffffff',
        '--eq-bg': '#52ff99',
        '--eq-text': '#ffffff',
        '--pm-bg': '#40ff66',
        '--pm-text': '#ffffff',
        '--box-shadow': '0 4px rgba(0, 0, 0, 0.3)',
        '--button-shadow': '0 5px #ccc',
        '--button-active-shadow': '0 2px #999'
    }
];

// Functions
function changeTheme() {
    colorIndex = (colorIndex + 1) % colorThemes.length;
    const theme = colorThemes[colorIndex];
    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
    }
}

function toggle3DEffect() {
    is3D = !is3D;
    document.body.classList.toggle('threeD', is3D);
}

function updateHistory(result) {
    let listItem = document.createElement('li');
    listItem.textContent = result;
    historyList.appendChild(listItem);
}

function toggleHistoryPanel() {
    historyPanel.style.display = (historyPanel.style.display === 'block') ? 'none' : 'block';
}

function clearHistory() {
    historyList.innerHTML = '';
}

// Event Listeners
themeToggleBtn.addEventListener('click', changeTheme);
toggle3DEffectBtn.addEventListener('click', toggle3DEffect);
clockButton.addEventListener('click', toggleHistoryPanel);
clearHistoryButton.addEventListener('click', clearHistory);

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerText;
        if (value === '=') {
            try {
                string = eval(string);
                inputBox.value = string;
                updateHistory(string); 
            } catch (error) {
                inputBox.value = 'Error';
                string = '';
            }
        } else if (value === 'AC') {
            string = '';
            inputBox.value = '0';
        } else if (value === 'DEL') {
            string = string.slice(0, -1);
            inputBox.value = string || '0';
        } else if (value === 'M+') {
            memory += parseFloat(inputBox.value);
        } else if (value === 'M-') {
            memory -= parseFloat(inputBox.value);
        } else if (value === 'MR') {
            inputBox.value = memory;
        } else if (value === 'MC') {
            memory = 0;
        } else if (e.target.classList.contains('scientific')) {
            let func = e.target.getAttribute('data-func');
            try {
                switch (func) {
                    case 'sqrt':
                        string = Math.sqrt(eval(string)).toString();
                        break;
                    case 'square':
                        string = Math.pow(eval(string), 2).toString();
                        break;
                    case 'reciprocal':
                        string = (1 / eval(string)).toString();
                        break;
                    case 'sin':
                        string = Math.sin(eval(string)).toString();
                        break;
                    case 'cos':
                        string = Math.cos(eval(string)).toString();
                        break;
                    case 'tan':
                        string = Math.tan(eval(string)).toString();
                        break;
                    case 'log':
                        string = Math.log(eval(string)).toString();
                        break;
                    case 'exp':
                        string = Math.exp(eval(string)).toString();
                        break;
                }
                inputBox.value = string;
            } catch (error) {
                inputBox.value = 'Error';
                string = '';
            }
        } else {
            if (inputBox.value === '0' && value !== '.') {
                string = value;
            } else {
                string += value;
            }
            inputBox.value = string;
        }
    });
});

