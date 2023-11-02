export default class ai {
    constructor() {
        this.name = 'AI';
        

        window.addEventListener('game_start', () => {
           console.log('Game started!'); 
        });

        window.addEventListener('game_over', (e) => {
            let score = e.detail.score;
            console.log('Game over!', score); 
         });

         console.log("listeners installed");
         setInterval(() => {
             console.log("pressing space");
             this.pressSpace();
         }, 300);
    }

    pressSpace() {
        document.body.dispatchEvent(new KeyboardEvent('keydown', {key: " "}));
    }
}