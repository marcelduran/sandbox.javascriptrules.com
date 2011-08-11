/*globals YUI getPrimes console document*/
var button, reports,
	ta = document.getElementById('output'),
	printPrimes = function(ev, o) {
		var startTime = endTime = totalTime = avgTime = m = n = numberOfRuns = null,
			arr = [],
			buffer = [],
			setUp = function() {
				button.setAttribute('disabled', 'disabled');
				button.set('innerHTML', 'Running...');
			},
			tearDown = function() {
				button.removeAttribute('disabled');
				button.set('innerHTML', 'Get primes');
			},
			outputReport = function(o) {
				var et = o.et,
					st = o.st,
					nruns = o.nruns;
				totalTime = et - st;
				avgTime = totalTime / nruns;
				reports.insert('<div class="report">' + 
				'<strong>Runs: </strong>' + nruns + '<br>' + 
				'<strong>Range: </strong>' + o.start + ' - ' + o.end + '<br>' + 
				'<strong>Total: </strong>' + totalTime + 'ms<br>' + 
				'<strong>Avg: </strong>' + avgTime + 'ms</div>', 0);
			},
			textAreaOutput = (function() {
				ta.value = '';
				if (document.getElementById('cbox').checked) {
					return function(str) {
						ta.value += str;
					};
				} else {
					return function() {return null;};
				}
			}());


		setUp();

		YUI().use('node', function(Y) {
			numberOfRuns = Y.one('#runs').get('value');
			m = parseInt(Y.one('#rngStart').get('value'), 10);
			n = parseInt(Y.one('#rngEnd').get('value'), 10);
		});

		m = m < 2 || m === null ? 2 : m; // the funcion is only in domain [2..1bi]

		startTime = new Date().getTime();

		for (var j = 0; j < numberOfRuns; j++) {
			arr = getPrimes(m, n);
			buffer = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i]) {
					buffer[buffer.length] = i + m;
				}
			}
			textAreaOutput(buffer.join(', '));
			textAreaOutput('\n');
		}

		endTime = new Date().getTime();

		outputReport({
			st: startTime,
			et: endTime,
			nruns: numberOfRuns,
			start: m,
			end: n
		});

		tearDown();
	};

YUI().use('node', function(Y) {
	Y.on('domready', function() {
		button = Y.one('#run');
		button.removeAttribute('disabled');
		reports = Y.one('#reports');
	});
	Y.on("click", printPrimes, "#run", Y, {});
});
