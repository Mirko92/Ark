console.clear();

class Animal {

  constructor(
    public name: string,
    public isAggressive: boolean,
    public vaccinated: boolean = false
  ) { }
}

class Chiuahua extends Animal {
  constructor(
    public name: string,
    public isAggressive: boolean,
  ) {
    super(name, isAggressive);
  }
}

class Cat extends Animal {
  constructor(
    public name: string,
    public isAggressive: boolean,
  ) {
    super(name, isAggressive);
  }
}

function PrintNamesOf(animals: Animal[]) {
  return animals.map(x => x.name).join(";");
}

class VetSurgery {
  private waitingRoom: Animal[] = [];
  private surgeryRoom: Animal[] = [];
  private recoveryRoom: Animal[] = [];

  constructor() { }

  public addAnimals(...animals: Animal[]) {
    this.waitingRoom.push(...animals);
    this.sortAnimals();
  }

  private sortAnimals() {
    this.waitingRoom.sort((x, y) => {
      if (x.isAggressive && !y.isAggressive) { return -1; }
      else if (!x.isAggressive && y.isAggressive) { return 1; }
      else return 0;
    })
  }

  public canNext() {
    return this.waitingRoom?.filter(x => !x.vaccinated)?.length > 0 && this.surgeryRoom?.length == 0;
  }

  willCauseAttack(animal1: Animal, animal2: Animal): boolean {
    // Get current situation on waiting room
    const aggressiveWaiting = this.waitingRoom.filter(x => x.isAggressive).length;
    const calmWaiting = this.waitingRoom.filter(x => !x.isAggressive).length;

    // Calc effect on removing animale from the waiting room 
    const newAggressiveWaiting = aggressiveWaiting - [animal1, animal2].filter(x => x.isAggressive).length;
    const newCalmWaiting = calmWaiting - [animal1, animal2].filter(x => !x.isAggressive).length;

    return (
      newAggressiveWaiting > newCalmWaiting && newCalmWaiting > 0  // there is a concrete risk in the waiting room
    );
  }

  public takeNext() {
    const todoAnimals = this.waitingRoom.filter(a => !a.vaccinated);
    console.log("Remaining todo animals: ", todoAnimals.length);

    let nextFound: Animal[];

    // One of each to keep equal numbers on waiting room
    const animal1 = todoAnimals.find(x => x.isAggressive)!;
    const animal2 = todoAnimals.find(x => !x.isAggressive)!;

    if (!this.willCauseAttack(animal1, animal2)) {
      nextFound = [animal1, animal2];
    } else {
      throw "No combinations found to avoid any attacks in waiting room.";
    }

    this.updateSurgeryRoom(nextFound);
    this.updateWaitingRoom();
  }

  private updateSurgeryRoom(animals: Animal[]) {
    this.surgeryRoom = animals;
    console.log("Surgery room: ", PrintNamesOf(this.surgeryRoom));
  }

  private updateWaitingRoom() {
    this.waitingRoom = this.waitingRoom.filter(a => !this.surgeryRoom.includes(a));
    console.log("Waiting room: ", PrintNamesOf(this.waitingRoom));
  }

  public vaccinate() {
    if (!this.surgeryRoom?.length) {
      throw "Surgery room is empty";
    }

    this.surgeryRoom?.forEach(a => {
      console.log(`Vaccinating ${a.name}...`);
      a.vaccinated = true;
    });
  }

  public moveAnimals() {
    let toRecovery: Animal = this.surgeryRoom.find(x => x.isAggressive)!;
    let toWaiting : Animal = this.surgeryRoom.find(x => !x.isAggressive)!;; 

    console.log(`${toRecovery.name} is going to recovery room`);
    console.log(`${toWaiting.name} is going to waiting room`);

    this.recoveryRoom.push(toRecovery!);
    this.waitingRoom.push(toWaiting!);

    this.surgeryRoom = [];
    
    console.log("Surgery room: ", PrintNamesOf(this.surgeryRoom));
    console.log("Waiting room: ", PrintNamesOf(this.waitingRoom));
    console.log("Recovery room: ", PrintNamesOf(this.recoveryRoom));

  }

}


function start() {
  console.log("Start program");

  const veterinary = new VetSurgery();

  veterinary.addAnimals(
    new Chiuahua("dog1", true),
    new Chiuahua("dog2", true),
    new Chiuahua("dog3", true),
    new Cat("cat1", false),
    new Cat("cat2", false),
    new Cat("cat3", false),
  );

  while (veterinary.canNext()) {

    // Takes next couple, and avoid isse
    veterinary.takeNext();

    // Operates
    veterinary.vaccinate();

    // Move an animal to waiting room and the other in recovery
    veterinary.moveAnimals();
  }

  console.log("End program");
}

start();

