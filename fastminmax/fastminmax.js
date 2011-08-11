(function () {
    var
        doc = document,
        btn = doc.getElementById('run'),
        arraycreation = doc.getElementById('arraycreation'),
        forloop = doc.getElementById('forloop'),
        optloop = doc.getElementById('optloop'),
        mathmax = doc.getElementById('mathmax'),
        error = doc.getElementById('error'),

        compare = function () {
            var i, max, begin, end,
                a = [],
                len = parseInt(doc.getElementById('arraysize').value, 10);
             
            try {
                /* create an array of len random numbers */
                begin = new Date();
                for (i = 0; i < len; i += 1) {
                    a[i] = Math.floor(Math.random() * len);
                }
                end = new Date();
                arraycreation.innerHTML = (end - begin);
                 
                /* for loop */
                max = -Infinity;
                begin = new Date();
                for (i = 0; i < len; i += 1) {
                    if (a[i] > max) {
                        max = a[i];
                    }
                }
                end = new Date();
                forloop.innerHTML = (end - begin);
                 
                /* optimized loop */
                max = -Infinity;
                i = len;
                begin = new Date();
                while (i--) {
                    if (a[i] > max) {
                        max = a[i];
                    }
                }
                end = new Date();
                optloop.innerHTML = (end - begin);
                 
                /* Math.max */
                begin = new Date();
                max = Math.max.apply(Math, a);
                end = new Date();
                mathmax.innerHTML = (end - begin);
            } catch (e) {
                error.innerHTML = 'Error: ' + e.message;
            }

            /* restore run button */
            btn.innerHTML = 'Run';
            btn.disabled = false;
        },
        
        start = function () {
            error.innerHTML = '';
            btn.innerHTML = 'Running...';
            btn.disabled = true;
            setTimeout(compare, 25);
        };

    /* add click event to run button */
    if (btn.addEventListener) {
        btn.addEventListener('click', start, false);
    } else if (btn.attachEvent) {
        btn.attachEvent('onclick', start);
    } else {
        btn.onclick = start;
    }
}());
