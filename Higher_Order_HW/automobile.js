function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*Logs the automobile, b is bool whether or not to log the type*/
Automobile.prototype.logMe = function ( b ){
    var x = this.year + " ";
    x += this.make + " ";
    x += this.model + " ";
    if (b){
        x += this.type;
    }
    console.log(x);
}

// automobiles[0].logMe(false);

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    /*your code here*/
    var x = 0;
    var temp;
    /* Bubble sort */
    for(var i = array.length - 1; i >= 0; i--){
        for(var x = 0; x < i; x++){
            if(comparator(array[x], array[x+1])){
                temp = array[x];
                array[x] = array[x+1];
                array[x+1] = temp;
                temp = 0;
                // console.log("success");
            }
        }
    }

}
// console.log(automobiles);

// console.log(automobiles);

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* your code here*/
    if(auto1.year > auto2.year ){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/
    var a1year = auto1.make.toLowerCase();
    var a2year = auto2.make.toLowerCase();
    if(a1year > a2year ){
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    /* your code here*/
    var carTypes = [
        "wagon",
        "suv",
        "pickup",
        "roadster"
    ]
    var a1Rank = auto1.type.toLowerCase();
    var a2Rank = auto2.type.toLowerCase();
    /* Compare model years if type is the same */
    if(a1Rank == a2Rank){
        return yearComparator(auto1, auto2)
    }

    for(var i = 0; i < carTypes.length; i++){
        if(a1Rank == carTypes[i]){
            a1Rank = i;
        }
        if(a2Rank == carTypes[i]){
            a2Rank = i;
        }
    }
    /* If not on the ranked list, swap because it goes to the bottom */
    if( !(a1Rank > a2Rank) && !(a2Rank > a1Rank) ){
        return true;
    }
    return a1Rank < a2Rank;
}

/* prints the results into the console log */
function logResults( array, sorter, torf ){
    var intro = "The cars sorted by ";
    console.log(intro + sorter + " are:");
    for(x = 0; x < array.length; x++){
        array[x].logMe(torf);
    }
}

/* Does the magic */
sortArr(yearComparator, automobiles);
logResults(automobiles, "year", true);
console.log();
sortArr(makeComparator, automobiles);
logResults(automobiles, "make", false);
console.log();
sortArr(typeComparator, automobiles);
logResults(automobiles, "type", true);

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */
