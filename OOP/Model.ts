console.clear(); 

class Animal {

  constructor(
    public name: string,
    public isAggressive: boolean,
    public breed: string,
    public vaccinated: boolean = false
  ){}
}


class Chiuahua extends Animal {
  constructor(
    public name: string,
    public isAggressive: boolean,
  ){
    super(name, isAggressive, "dog");
  }
}

class Cat extends Animal {
  constructor(
    public name: string,
    public isAggressive: boolean,
  ){
    super(name, isAggressive, "cat");
  }
}

class VetSurgery {
  private surgeryRoom: Animal[] = [];
  private recoveryRoom: Animal[] = [];

  constructor(
    private waitingRoom: Animal[],
    private capacity: number
  ){}


  public canNext() {
    return this.waitingRoom?.length > 0 && !this.surgeryRoom?.length;
  }

  public takeNext() {
    const todoAnimals = this.waitingRoom.filter(x => !x.vaccinated);

    const aggressiveAnimals = todoAnimals.filter(x => x.isAggressive);
    const calmAnimals = todoAnimals.filter(x => !x.isAggressive);

    if (aggressiveAnimals.length >= calmAnimals.length) {
      // If the count it's the same, takes aggressive to reduce risks 
      this.surgeryRoom.push(
        ...aggressiveAnimals.splice(0, this.capacity),
      );
    } else {
      // Otherwise checks how many calms animal can takes to keep equilibrium
      const diff = calmAnimals.length - aggressiveAnimals.length;

      const nextCalmsCount = this.capacity >= diff ? diff : this.capacity;

      this.surgeryRoom.push(
        ...calmAnimals.splice(0, nextCalmsCount),
        // To ensure the max capacity, in case calmAnimals be not enogh
        ...aggressiveAnimals.splice(0, this.capacity - nextCalmsCount)
      )
    }

    // Update waiting room 
    this.waitingRoom = [...aggressiveAnimals, ...calmAnimals];
  }

  public returnOne() {
    if (this.surgeryRoom?.length) {
      const calm = this.surgeryRoom.filter(x => !x.isAggressive);

      
    }

    return this.surgeryRoom?.length && this.waitingRoom.push(this.surgeryRoom.pop()!);
  }

  public recoverOne() {
    return this.surgeryRoom?.length && this.recoveryRoom.push(this.surgeryRoom.pop()!);
  }
}


function start() {
  console.log("Start program");
  
  const veterinary = new VetSurgery([
    new Chiuahua("c1", true),
    new Chiuahua("c2", true),
    new Chiuahua("c3", true),
    new Cat("cat1", false),
    new Cat("cat2", false),
    new Cat("cat3", false),
  ], 2);

  veterinary.takeNext();

  while(veterinary.canNext()) {
    veterinary.takeNext();

    veterinary.recoverOne();

    veterinary.returnOne();
  }

  console.log("End program");
}


start();

