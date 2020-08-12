import { Observable } from "rxjs";

//Uncomment the ex functions as you want. Ex- ex1(), ex2() etc.  

/**
 * Ex1: In this snippet we will crate an observable and subscribe (listen) an obsever to it.
 * We will complete the observable as well.
 */

const ex1 = function() {
  const observable = new Observable(subscriber => {
    subscriber.next("Hello");
    subscriber.next("World");
    subscriber.complete();
    subscriber.next("After completion");
  });

  // style 1 : pass the observer object
  const observer = {
    next: result => console.log(result),
    error: errorMsg => console.log(errorMsg),
    complete: () => console.log("Finished")
  };

  observable.subscribe(observer);

  //style 2: pass the callbacks
  observable.subscribe(
    result => console.log(result),
    errorMsg => console.log(errorMsg),
    () => console.log("Finished")
  );
};

// ex1();
/**
 * Ex1 observations:
 * Eech observer prints the observations (result)
 * "After completion" is not executed as observable completes before it
 */

/**
 * Ex2: In this snippet we will crate an observable and subscribe (listen) to it.
 * We will also pass an error
 */

const ex2 = function() {
  const observable = new Observable(subscriber => {
    subscriber.next("Hello");
    subscriber.next("World");
    subscriber.error("Some error msg");

    subscriber.next("After Error");
    subscriber.complete();
    subscriber.next("After completion");
  });

  const observer = {
    next: result => console.log(result),
    error: errorMsg => console.log(errorMsg),
    complete: () => console.log("Finished")
  };

  observable.subscribe(observer);
};

// ex2();
/**
 * Ex2 observations:
 * Observer prints the observations (result)
 * Neither "After Error" nor "After completion" is not printed as observable completes with an error
 */

/**
 * Ex3: In this snippet we will crate an observable emit a series of numbers and subscribe (listen) to it.
 * We will also complete the observable.
 */

const ex3 = function() {
  const observable = new Observable(subscriber => {
    let count = 0;
    setInterval(() => {
      if(count >= 10 ) subscriber.complete(); 
      subscriber.next(count++);
    }, 1000);
  });

  const observer = {
    next: result => console.log(result),
    error: errorMsg => console.log(errorMsg),
    complete: () => console.log("Finished")
  };

  observable.subscribe(observer);
  console.log( 'after subscribe');
};

// ex3();
/**
 * Ex3 observations:
 * Observer prints a series of numbers asychronously, even after subscribing
 * "After completion" is not executed as observable completes before it
 */

/**
 * Ex4: In this snippet we will crate an observable and subscribe (listen) to it from two observers with a delay of 5 seconds in between.
 */

const ex4 = function() {
  const observable = new Observable(subscriber => {
    let count = 0;
    console.log('subscriber id= ' + Math.random() );
    setInterval(() => {
      if(count >= 10 ) subscriber.complete(); 
      subscriber.next(count++);
    }, 1000);
  });

  const observer = {
    next: result => console.log(result),
    error: errorMsg => console.log(errorMsg),
    complete: () => console.log("Finished")
  };

  observable.subscribe(observer);

  setTimeout(
    () => observable.subscribe(observer),
    5000
  );
};

ex4();
/**
 * Two series of number will independantly be printed for each observer (subscription). 
 * Means there will be a subscriber (inside the Observable) created for each observer (subscription)
 * Note the subscriber id
 */