export default class ai {
   

    constructor() {
        this.population_size = 100;
        this.px = 2;
        this.py = 7;
        this.nparams = this.px * this.py;
    
        this.population = this.generate_initial_population(this.population_size, this.nparams);
        this.population_index = 0;
        this.playing;

        setTimeout(() => {
            console.log("timeout");
            this.play_generation();
        }, 2000);
    

        window.addEventListener('game_start', () => {
           console.log('Game started!'); 
        });

        window.addEventListener('game_over', (e) => {
            let score = e.detail.score;
            console.log('Game over!', score); 
            this.fitness.push(score);
            console.log("fitness",this.fitness);
            setTimeout(() => {
            this.playing = false;
            },1000);

         });
    }

    async play_generation() {
        console.log(this.population);
        this.population_index = 0;
        this.playing = false;
        this.fitness = [];
        for (let citizen of this.population) {
            await this.play_citizen(citizen);
            this.population_index++;
            if (this.population_index >= this.population_size) {
                break;
            }
        }
    }

    play_citizen(citizen) {
            console.log("Play citizen");
            this.playing = true;
            this.current_citizen = citizen;
            this.pressSpace();
            return new Promise((resolve, reject) => {
                let i = setInterval(() => {
                    if (this.playing == false ) {
                        clearInterval(i);
                        resolve();
                    }
                }, 1000);
            });
        }
    

    generate_initial_population(population_size, nparams) {
        let population = [];
        for (let i = 0; i < population_size; i++) {
            let params = [];
            for (let j = 0; j < nparams; j++) {
                params.push(parseInt(Math.random()*300));
            }
            population.push(params);
        }
        return population;
    }

    pressSpace() {
        document.body.dispatchEvent(new KeyboardEvent('keydown', {key: " "}));
    }




}