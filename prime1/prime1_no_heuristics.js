/*globals document*/

function getPrimes(n) {
	var arr = [],
		p = 2;
	// Populating array
	arr[0] = false;
	arr[1] = false;
	for (var i = 2; i <= n; i++) {
		arr[i] = true;
	}
	while ((p * p)  <= n) {
		// Strike from the list all multiples of p less than or equal to n
		for (var j = (p * p); j <= n; j += p) {
			arr[j] = false;
		}
		// Find the first number remaining on the list greater than p (this number is the next prime); replace p with this number.
		for (var k = (p + 1); k <= n; k++) {
			if (arr[k]) {
				p = k;
				break;
			}
		}
	}
	return arr;
}


var a,
	endTime, 
	time = document.getElementById('times'), 
	startTime = new Date();

getPrimes(1000000);

endTime = new Date().getTime() - startTime.getTime();
document.write('<br>total time: ' + endTime);
