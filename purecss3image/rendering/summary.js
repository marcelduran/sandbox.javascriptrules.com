#!/usr/bin/env node

var LOGS = './logs/',
    fs = require('fs'),
    files =  fs.readdirSync(LOGS);

// header
console.log([
    'FILE\t',
    'COUNT',
    'SUM',
    'MEDIAN',
    'AVG',
    'MIN',
    'MAX',
    'CCOUNT',
    'CSUM',
    'CMEDIAN',
    'CAVG',
    'CMIN',
    'CMAX'
].join('\t'));

// loop log files
files.forEach(function (file) {
    var len, min, max, median, avg,
        crender, clen, cmin, cmax, cmedian, cavg,
        content = fs.readFileSync(LOGS + file),
        log = JSON.parse(content),
        sum = 0,
        csum = 0,
        layout = 0,
        render = [];

    // loop logs
    log.forEach(function (item) {
        var time;

        if (item.type === 'Layout' || item.type === 'RecalculateStyles') {
            layout += item.endTime - item.startTime;
        } else if (item.type === 'Paint') {
            time = item.endTime - item.startTime + layout;
            sum += time;
            render.push(time);
            layout = 0;
        }
    });

    // sort
    render.sort(function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    });

    // get values
    len = render.length,
    min = render[0];
    median = render[parseInt(len / 2, 10)];
    max = render[len - 1];
    avg = sum / len,

    // clean noise
    crender = render.slice(Math.round(len * .05), Math.round(len * .95));
    clen = crender.length;
    cmin = crender[0];
    cmedian = crender[parseInt(clen / 2, 10)];
    cmax = crender[clen - 1];
    crender.forEach(function (value) {
        csum += value;
    });
    cavg = csum / clen;

    // output
    console.log([
        file,
        len,
        sum.toFixed(3),
        median.toFixed(3),
        avg.toFixed(3),
        min.toFixed(3),
        max.toFixed(3),
        clen,
        csum.toFixed(3),
        cmedian.toFixed(3),
        cavg.toFixed(3),
        cmin.toFixed(3),
        cmax.toFixed(3)
    ].join('\t'));
});
