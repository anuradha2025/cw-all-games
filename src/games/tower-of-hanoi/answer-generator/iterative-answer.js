import { hanoiIterative } from '../algorithms.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter number of disks: ', (answer) => {
    const numDisks = parseInt(answer);
    if (isNaN(numDisks)) {
        console.error('Invalid number of disks. Please enter a valid number.');
        rl.close();
        return;
    }
    const moves = hanoiIterative(numDisks, 'A', 'B', 'C');
    console.log(moves.join(', '));
    rl.close();
});