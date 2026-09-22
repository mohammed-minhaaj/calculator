let input=document.getElementById("inputBox");
let buttons=document.querySelectorAll('button');

let string="";
let arr = [...buttons];

function precedence(op) {
    if (op === '+' || op === '-') {
        return 1;
    } else if (op === '*' || op === '/' || op === '%') {
        return 2;
    }
    return 0;
}

function infixToPostfix(exp) {
    let stack = [];
    let result = "";

    for (let i = 0; i < exp.length; i++) {
        let ch = exp[i];

        if (ch === ' ') {
            continue;
        }

        // multi-digit number
        if (ch >= '0' && ch <= '9') {
            while (i < exp.length && exp[i] >= '0' && exp[i] <= '9') {
                result += exp[i];
                i++;
            }
            result += " ";
            i--;
        }
        else if (ch === '(') {
            stack.push(ch);
        }
        else if (ch === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                result += stack.pop() + " ";
            }
            stack.pop();
        }
        else {
            while (
                stack.length &&
                precedence(stack[stack.length - 1]) >= precedence(ch)
            ) {
                result += stack.pop() + " ";
            }
            stack.push(ch);
        }
    }

    while (stack.length) {
        result += stack.pop() + " ";
    }

    return result.trim();
}

function evaluatePostfix(exp) {
    let stack = [];
    let tokens = exp.split(" ");

    tokens.forEach(token => {
        if (!isNaN(token)&& token!=="") {
            stack.push(Number(token));
        } else {
            let val2 = stack.pop();
            let val1 = stack.pop();

            if (token === '+') {
                stack.push(val1 + val2);
            } else if (token === '-') {
                stack.push(val1 - val2);
            } else if (token === '*') {
                stack.push(val1 * val2);
            } else if (token === '/') {
                stack.push(val1 / val2);
            } else if (token === '%') {
                stack.push(val1 % val2);
            }
        }
    });

    return stack.pop();
}


arr.forEach(button => {
    button.addEventListener('click',(e)=>{
        //console.log(e)
        let value = e.target.innerText.trim();
        if (value == '=') {
            try {
                let postfix = infixToPostfix(string);
                string = evaluatePostfix(postfix);
                input.value = string;
            }catch {
                input.value = "Error";
                string = "";
            }
        }else if(value== 'AC'){
            string="";
            input.value=string;
        }else if(value=='DEL'){
            string = string.slice(0, -1);
            input.value=string;
        }else{
            // selecting and displaying
            string+=value;
            input.value=string;
        }
  
        
    })
})