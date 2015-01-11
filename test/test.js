Dega(document).on('click', '.click-target-1', function() {
    console.log('click 1');
});

Dega(document).on('click', '.click-target-2', function() {
    console.log('click 2');
});

Dega(document).on('click', '.click-target-3', function(e) {
    console.log('click 3');
    e.preventDefault();
});


var onceEvent1 = function(e) {
    console.log(4, 'Fires Once');
    e.preventDefault();

    Dega(document).off('click', '.click-target-4', onceEvent1);
};
Dega(document).on('click', '.click-target-4', onceEvent1);

var onceEvent2 = function(e) {
    console.log(5, 'Fires Once');
    e.preventDefault();

    Dega(document).off('click', '.click-target-5', onceEvent2, true);
};
Dega(document).on('click', '.click-target-5', onceEvent2, true);

var onceEvent3 = function(e) {
    console.log(6, 'Fires Once');
    e.preventDefault();

    Dega(document).off('click', '.click-target-6', onceEvent3, false);
};
Dega(document).on('click', '.click-target-6', onceEvent3, false);

Dega(document).on('focus', '.focus-target', function() {
    console.log('Focus');
});

Dega(document).on('blur', '.blur-target', function() {
    console.log('Blur');
});
