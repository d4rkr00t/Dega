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

    describe('#ON', function() {
        describe('Click', function() {
            describe('Simple subscription', function() {
                var called;

                beforeEach(function() {
                    called = false;

                    var el = document.createElement('A');
                    el.classList.add('link');
                    el.href = '#test';

                    globalElem.appendChild(el);

                    Dega('.event-container').on('click', '.link', function() {
                        called = true;
                    });

                    el.click();
                });

                it('should handle click', function() {
                    expect(called).toBe(true);
                });

                it('should change url', function() {
                    expect(window.location.hash).toBe('#test');
                });
            });

            describe('Subscription with prevent default', function() {
                var called;

                beforeEach(function() {
                    called = false;

                    var el = document.createElement('A');
                    el.classList.add('link');
                    el.href = '#test1';

                    globalElem.appendChild(el);

                    Dega('.event-container').on('click', '.link', function(e) {
                        e.preventDefault();
                        called = true;
                    });

                    el.click();
                });

                it('should handle click', function() {
                    expect(called).toBe(true);
                });

                it('should change url', function() {
                    expect(window.location.hash).not.toBe('#test1');
                });
            });

            describe('Subscription with nested elements', function() {

                describe('Simple click', function() {
                    var called;

                    beforeEach(function() {
                        called = false;

                        var el = document.createElement('A'),
                            div = document.createElement('DIV');

                        div.classList.add('link');
                        el.href = '#test3';

                        div.appendChild(el);
                        globalElem.appendChild(div);

                        Dega('.event-container').on('click', '.link', function() {
                            called = true;
                        });

                        el.click();
                    });

                    it('should handle click', function() {
                        expect(called).toBe(true);
                    });

                    it('should change url', function() {
                        expect(window.location.hash).toBe('#test3');
                    });
                });

                describe('Click with prevent', function() {
                    var called;
                    beforeEach(function() {
                        called = false;

                        var el = document.createElement('A'),
                            div = document.createElement('DIV');

                        div.classList.add('link');
                        el.href = '#test4';

                        div.appendChild(el);
                        globalElem.appendChild(div);

                        Dega('.event-container').on('click', '.link', function(e) {
                            called = true;
                            e.preventDefault();
                        });

                        el.click();
                    });

                    it('should handle click', function() {
                        expect(called).toBe(true);
                    });

                    it('should change url', function() {
                        expect(window.location.hash).not.toBe('#test4');
                    });
                });
            });

            describe('Subscription by #ID', function() {
                var called;

                beforeEach(function() {
                    called = false;

                    var el = document.createElement('A');
                    el.id = 'id1';
                    el.href = '#test5';

                    globalElem.appendChild(el);

                    Dega('.event-container').on('click', '#id1', function() {
                        called = true;
                    });

                    el.click();
                });

                it('should handle click', function() {
                    expect(called).toBe(true);
                });

                it('should change url', function() {
                    expect(window.location.hash).toBe('#test5');
                });
            });

            describe('Subscription by TAG', function() {
                var called;

                beforeEach(function() {
                    called = false;

                    var el = document.createElement('A');
                    el.href = '#test6';

                    globalElem.appendChild(el);

                    Dega('.event-container').on('click', 'a', function() {
                        called = true;
                    });

                    el.click();
                });

                it('should handle click', function() {
                    expect(called).toBe(true);
                });

                it('should change url', function() {
                    expect(window.location.hash).toBe('#test6');
                });
            });
        });
    });

    describe('#OFF', function() {
        describe('Click', function() {
            describe('unsubscribe', function() {
                var called, el, handler;

                beforeEach(function() {
                    called = 0;
                    handler = function() {
                        called += 1;
                    };

                    el = document.createElement('A');
                    el.classList.add('link');
                    el.href = '#test';

                    globalElem.appendChild(el);

                    Dega('.event-container').on('click', '.link', handler);
                    el.click();

                    Dega('.event-container').off('click', '.link', handler);
                    el.click();
                    el.click();
                    el.click();
                    el.click();
                });

                it('should unsubscribe from event', function() {
                    expect(called).toBe(1);
                });
            });

            describe('not unsubscribe', function() {
                var called, el, handler;

                beforeEach(function() {
                    called = 0;
                    handler = function() {
                        called += 1;
                    };

                    el = document.createElement('A');
                    el.classList.add('link');
                    el.href = '#test';

                    globalElem.appendChild(el);

                    Dega('.event-container').on('click', '.link', handler);
                    el.click();

                    Dega('.event-container').off('click', '.link', function() {
                        called += 1;
                    });
                    el.click();
                });

                it('should not unsubscribe from event with incorrect params', function() {
                    expect(called).toBe(2);
                });
            });
        });
    });
});
