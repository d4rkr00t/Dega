describe('Dega', function() {
    var globalElem,
        body = document.querySelector('body');

    beforeEach(function() {
        globalElem = document.createElement('DIV');
        globalElem.classList.add('event-container');

        body.appendChild(globalElem);
    });

    afterEach(function() {
        body.removeChild(globalElem);
    });

    it('Dega should be loaded', function() {
        expect(window.Dega).toBeDefined();
    });
});
