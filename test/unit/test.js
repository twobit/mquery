test('invalid input', function() {
    equal(mQuery(null).media(), '', 'null');
    equal(mQuery(undefined).media(), '', 'undefined');
    equal(mQuery(NaN).media(), '', 'NaN');
    equal(mQuery('').media(), '', 'empty string');
});

test('media type', function() {
    equal(mQuery('all').media(), 'all', 'only media type');
    equal(mQuery('not print').media(), 'not print', 'not operator and media type');
    equal(mQuery('only screen').media(), 'only screen', 'only operator and media type');
});

test('features', function() {
    equal(mQuery({'min-width': '600px'}).media(), '(min-width: 600px)', 'only feature');
    equal(mQuery({'min-width': '600px', 'max-width': '700px'}).media(), '(min-width: 600px) and (max-width: 700px)', 'only features');
    equal(mQuery({color: ''}).media(), '(color)', 'empty  stringvalue');
    equal(mQuery({color: null}).media(), '(color)', 'null value');
    equal(mQuery({color: undefined}).media(), '(color)', 'undefined value');
    equal(mQuery({color: NaN}).media(), '(color)', 'NaN value');
    equal(mQuery({color: 0}).media(), '(color: 0)', '0 value');
    equal(mQuery({MozWindowsCompositor: ''}).media(), '(-moz-windows-compositor)', 'uncamel');
    equal(mQuery({minWidth: function() {return '600px';}}).media(), '(min-width: 600px)', 'function value');

    // Webkit: (min-wdith: min-width) -> (min-width) Firefox: (min-width: min-width) -> not all
    // ok(mQuery({minWidth: function(feature) {return feature;}}).error(), 'function error');
});

test('media query', function() {
    equal(mQuery('not all and (-moz-windows-compositor)').media(), 'not all and (-moz-windows-compositor)', 'only media query');
    equal(mQuery('not all and (-moz-windows-compositor)', {'min-width': '600px'}).media(), 'not all and (-moz-windows-compositor) and (min-width: 600px)', 'append to media query');
    equal(mQuery('print').query('screen').query('tv').media(), 'print, screen, tv', 'multiple simple media queries');
    equal(mQuery('all').bind(function() {}).query('tv').media(), 'all', 'query after match not accepted');
});

test('matches', function() {
    equal(mQuery('all').matches(), true, 'simple match');
    equal(mQuery('print').matches(), false, 'failed match');
    equal(mQuery('all)').matches(), false, 'invalid match');
    ok(mQuery('all)').error(), 'invalid match error');
});

test('bind/unbind', 1, function() {
    // Add bind after invalid media query

    stop();

    var win = window.open();

    if (typeof win === 'undefined') {
        ok(win, 'Disable popup blocker and allow windows to be resized');
        start();
        return;
    }

    mQueryWindow(win);
    var mq = win.mQuery('screen', {maxWidth: '550px'});
    mq.bind(function() {
        ok(this.matches(), 'bind');
        start();
        win.close();
    });
    win.resizeTo(500, 500);
});