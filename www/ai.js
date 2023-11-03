export default class ai {
   

    constructor() {
        this.population_size = 100;
        this.number_of_generations = 100;
        this.px = 2;
        this.py = 7;
        this.nparams = this.px * this.py;
    
        this.population = this.generate_initial_population(this.population_size, this.nparams);
        this.population_index = 0;
        this.curremt_generation = 0;
        this.playing;

        setTimeout(async () => {
            for (let i = 0; i < this.number_of_generations; i++) {
  
                await this.play_generation();
            }
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

        console.log("generation done",this.curremt_generation);
        this.current_generation++;
        if (this.current_generation == this.number_of_generations) {
            console.log("Done");
            console.log("citizens", this.population, this.fitness);
            return;
        }


        
        console.log("citizens", this.population, this.fitness);
        let new_population = [];
        let sorted_population_by_fitness = this.population.slice().sort((a,b) => {
            return -1*(this.fitness[this.population.indexOf(a)] - this.fitness[this.population.indexOf(b)]);
        });

        console.log("sorted_citizens", this.sorted);


        let first = sorted_population_by_fitness.slice(0,this.population_size/2);
        // create a new population with the first 50 and the rest 50 a slightly mutated version of each
        for (let citizen of first) {
            new_population.push(citizen);
            new_population.push(this.mutate(citizen));
        }
        this.population = new_population;
        this.fitness = [];
    }

    mutate(citizen) {
        let mapped_citizen = citizen.map((x) => {
            return x + parseInt(Math.random()*50) - 25;
        });
        return mapped_citizen;
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