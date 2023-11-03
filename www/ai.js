export default class ai {
   

    constructor() {
        this.population_size = 10;
        this.number_of_generations = 100;
        this.px = 8;
        this.py = 3;
        this.nparams = this.px * this.py;
    
        this.population = this.generate_initial_population(this.population_size, this.nparams);
        this.population_index = 0;
        this.current_generation = 0;
        this.playing;

        setTimeout(async () => {
            for (let i = 0; i < this.number_of_generations; i++) {
  
                await this.play_generation();
            }
        }, 2000);
    

        window.addEventListener('game_start', () => {
           //console.log('Game started!'); 
        });

        window.addEventListener('game_over', (e) => {
            let score = e.detail.score;
            //console.log('Game over!', score); 
            this.fitness.push(score);
            console.info("partita n." + this.population_index+"/"+this.population_size+" score: "+score);
            //console.log("fitness",this.fitness);
            setTimeout(() => {
            this.playing = false;
            },1000);

         });
    }

    async play_generation() {
        console.log("Generazione: "+this.current_generation);
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

        // console.log("generation done",this.current_generation);
        this.current_generation++;
        if (this.current_generation == this.number_of_generations) {
            console.log("Done");
            console.log("citizens", this.population, this.fitness);
            return;
        }


        
        //console.log("citizens", this.population, this.fitness);
        let new_population = [];
        let sorted_population_by_fitness = this.population.slice().sort((a,b) => {
            return -1*(this.fitness[this.population.indexOf(a)] - this.fitness[this.population.indexOf(b)]);
        });

        //console.log("sorted_citizens", this.sorted);
        // keep the first 50
        console.log("And the winner is: ", sorted_population_by_fitness[0],"best score: ", this.fitness.sort( (a,b) => {return b-a})[0]);


        let first = sorted_population_by_fitness.slice(0,this.population_size/2);
        // create a new population with the first 50 and the rest 50 a slightly mutated version of each
        for (let citizen of first) {
            new_population.push(citizen);
            // select a random citizen from the first array but different than the the one contained in citizen variable
            let random_citizen = first[parseInt(Math.random()*first.length)];
            while (random_citizen == citizen) {
                random_citizen = first[parseInt(Math.random()*first.length)];
            }
            let new_citizen = this.crossover(citizen, random_citizen);
            let mutated_citizen = this.mutate(new_citizen);
            new_population.push(this.mutate(mutated_citizen));
        }
        this.population = new_population;
        this.fitness = [];
    }

    crossover(citizen1, citizen2) {
        let new_citizen = [];
        // Create a split point between 0 and citizen1.length
        let split_point = parseInt(Math.random()*citizen1.length);
        for (let i = 0; i < citizen1.length; i++) {
            if (i>split_point) {
                new_citizen.push(citizen1[i]);
            } else {
                new_citizen.push(citizen2[i]);
            }
        }
        return new_citizen;
    }

    mutate(citizen) {
        // get one of the params and mutate it
        let param_index = parseInt(Math.random()*this.nparams);
        let param = citizen[param_index];
        let new_param = param + parseInt(Math.random()*50) - 25;
        citizen[param_index] = new_param;
        
        return citizen;
    }

    play_citizen(citizen) {
            //console.log("Play citizen");
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
                params.push(parseInt(Math.random()*50));
            }
            population.push(params);
        }
        return population;
    }

    pressSpace() {
        document.body.dispatchEvent(new KeyboardEvent('keydown', {key: " "}));
    }




}