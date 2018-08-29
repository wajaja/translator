const { removeAccents } = require('./utils/funcs');
/*
 * http://jsfiddle.net/pkfst550/99/
 * Binary search in JavaScript.
 * Returns the index of of the element in a sorted array or (-n-1) where n is the insertion point for the new element.
 * Parameters:
 *     ar - A sorted array
 *     el - An element to search for
 *     strict - constraint ...
 *     _match - indexed nature of word to match in key, "e.g: 'v.' for verb"
 *     compare_fn - A comparator function. The function takes two arguments: (a, b) and returns:
 *        a negative number  if a is less than b;
 *        0 if a is equal to b;
 *        a positive number of a is greater than b.
 * The array may contain duplicate elements. If there are more than one equal elements in the array,
 * the returned value can be the index of any one of the equal elements.
 */
function binarySearch(ar, el, strict) {
    // var i       = 0;
    var low     = 0;
    var high    = ar.length - 1;
    var mid;
    var $return = -1;

    //for composed words
    if(el.split('-').length >= 2) {
        for (var i = 0; i < ar.length; i++) {
            if(ar[i].startsWith(el)) {
                $return = i;
                break;
            }
        }
        return $return;
    } else {
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            // var cmp = el > ar[mid].substring(0, el.length);
            var cmp = removeAccents(el).localeCompare(removeAccents(ar[mid].substring(0, el.length)));
            if (cmp > 0) {
                low = mid + 1;
                // console.log('31', removeAccents(el),  removeAccents(ar[mid].substring(0, el.length)));
            } else if(cmp < 0) {
                high = mid - 1;
                // console.log('34', removeAccents(el),  removeAccents(ar[mid].substring(0, el.length)));
            } else {
                if(strict) {
                    let _el = ar[mid],  //get e.g: "habile  [abil] adj.";
                    _val    = _el.split(' ')[0]; //from e.g: "habile  [abil] adj." to habile
                    if(_val.endsWith(el)) {
                        return mid;
                    } else {
                        //iterate all keys startsWith el
                        while (removeAccents(ar[(mid+1)]).startsWith(removeAccents(el))) {
                            mid++;
                            let _el = ar[mid],  //get e.g: "habile  [abil] adj.";
                            _val = _el.split(' ')[0]; //from e.g: "habile  [abil] adj." to habile
                            //
                            if(_val.endsWith(el)) //return index of key ended by el string
                                return mid;
                        }

                        while (removeAccents(ar[(mid-1)]).startsWith(removeAccents(el))) {
                            mid--;
                            let _el = ar[mid],  //get e.g: "habile  [abil] adj.";
                            _val = _el.split(' ')[0]; //from e.g: "habile  [abil] adj." to habile
                            if(_val.endsWith(el))
                                return mid;
                        }
                        return mid;
                    }
                    return mid;
                } else {
                    return mid;
                }
            }
        }
        //return false if no result founded
        return - 1;
    }

}

// function checkWord(ar, el) {
//     let _el = ar[mid],  //get e.g: "habile  [abil] adj.";
//     _val = _el.split(' ')[0]; //from e.g: "habile  [abil] adj." to habile
//     //
//     if(_val.endsWith(el))
//         return mid;
// }

exports.binarySearch = binarySearch;
