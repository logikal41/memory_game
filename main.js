$(document).ready( function() {

    // Object to store picture information
    var pictures = {
        1: {name: "crampons", loc: "pictures/crampons.jpg"},
        2: {name: "tool", loc: "pictures/fuel_hammer.jpg"},
        3: {name: "harness", loc: "pictures/harness.jpg"},
        4: {name: "screw", loc: "pictures/ice_screw.jpg"},
        5: {name: "rope", loc: "pictures/rope.jpg"},
        6: {name: "cam", loc: "pictures/ulc4.jpeg"}
    };

    // track quantity of each card type
    var cardCount = {
        crampons: 0,
        tool: 0,
        harness: 0,
        screw: 0,
        rope: 0,
        cam: 0
    };

    // select a valid image
    function randomize() {
        while(true) {
            var image = Math.floor(Math.random()*6) + 1;
            ++cardCount[pictures[image].name];
            if(cardCount[pictures[image].name] <= 2){
                return image;
            };
        }; 
    };

    // add image to html
    function addImages(row) {
        for(i = 0; i < 4; i++) {
            var image = randomize();
            row.append( 
                '<div class="card" id="' + pictures[image].name + cardCount[pictures[image].name] +'"> <img src="'+ pictures[image].loc +
                '"/> </div>');
            console.log('<div class="card" id="' + pictures[image].name + cardCount[pictures[image].name] +'"> <img src="'+ pictures[image].loc +
            '"/> </div>');
        };
    };

    //function to hide images and reset variables
    function hideImages(selections) {
        for(i=0; i < selections.length; i++) { // flip the cards back over
            document.getElementById(selections[i]).childNodes[1].style.visibility = "hidden";
        };
    };

    //function to compare cards
    function compareCards(compare, selections) {
        console.log(compare + "FUNCTION");
        if(compare[0] == compare[1]) {
            if(selections[0] != selections[1]){
                console.log("its a MATCH!!!");
            }
            else {
                console.log('invalid selection.');
                hideImages(selections);
            }
        } else {
            console.log("try again");
            hideImages(selections);
        };
    };

    // shuffle cards
    function shuffle() {
        var firstRow = $('#firstRow');
        var secondRow = $('#secondRow');
        var thirdRow = $('#thirdRow');
        addImages(firstRow);
        addImages(secondRow);
        addImages(thirdRow);
    };

    // start the game
    shuffle()

    // array for comparing cards
    var compare =[];
    // array for storing ids of selected image
    var selections =[];

    // get the class name on click
    $(document).on('click', '.card', function() {
        var cardId = $(this).attr('id');
        selections.push(cardId);
        console.log(selections); // debugging
        // make the image visible (flip the card)
        document.getElementById(cardId).childNodes[1].style.visibility = "visible";
        newId = cardId.replace(/\d/g,'');
        console.log(newId); // debugging
        compare.push(newId); // push item to compare array
        if(compare.length == 2) { // compare items in array
            compareCards(compare,selections);
            compare = [];
            selections= [];
        }; 
    }); 
 
});