import produce from 'immer';
import { F, R } from '@mobily/ts-belt';

const todos = [
    {
        text: 'learn immer',
        done: false,
    },
    {
        text: 'simplify all code',
        done: false,
    },
];

const nextTodos = produce(todos, (draft) => {
    draft.push({ text: 'get coffee', done: true });
    draft[0].done = true;
});

console.log(nextTodos.length);
console.log(todos[0].done);
console.log(nextTodos[0].done);

console.log(nextTodos === todos);
console.log(nextTodos[0] === todos[0]);
console.log(nextTodos[1] === todos[1]);

const result = R.fromExecution(() => nextTodos[0].done = false);
console.log(R.isOk(result));
console.log(R.match(result,
                    okValue => `${okValue}`,
                    errorValue =>
                        `Error: name=${errorValue.name}, message=${errorValue.message}`));
