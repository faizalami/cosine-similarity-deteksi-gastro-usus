var dataInput = [];
var metaDataLv1 = {
    //   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
    20: [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    21: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    22: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    23: [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    24: [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    25: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    26: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    27: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    28: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    29: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    30: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    31: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    32: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
};

var metaDataLv2 = {
    //  20 21 22 23 24 25 26 27 28 29 30 31 32
    33: [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    34: [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    35: [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    36: [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    37: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
}

var indikasi = {
    33: 'Keracunan Staphylococcus aureus',
    34: 'Keracunan jamur beracun',
    35: 'Keracunan Salmonellae',
    36: 'Keracunan Clostridium botulinum',
    37: 'Keracunan Campylobacter',
}

$(document).ready(function(){

    $('#button').click(function(e){
        e.preventDefault();
        _.forEach($('#form').serializeArray(), function(value, key){
            dataInput[key] = parseInt(value.value)
        })

        console.log(dataInput);
        // var resultLv1 = innerProduct(dataInput, metaDataLv1);

        // console.log(resultLv1);

        // var resultLv2 = innerProduct(resultLv1, metaDataLv2);

        // console.log(resultLv2);

        var resultLv1 = cosine(dataInput, metaDataLv1);
        _.forEach(resultLv1, function(value, key) {
            $('#' + key).html(value);
        })

        console.log(resultLv1);

        var resultLv2 = cosine(resultLv1, metaDataLv2);
        _.forEach(resultLv2, function(value, key) {
            $('#' + key).html(value);
        })

        var result = _.map(resultLv2, function(val, key){
            return {key, val};
        });
        var maxResult = _.maxBy(result, function(n){ return n.val });

        $('#tampil-perhitungan').show();

        $('#indikasi').html('Anda terindikasi ' + indikasi[parseInt(maxResult.key)]);

        console.log(resultLv2, maxResult);
    })

    $('#tampil-perhitungan').click(function(){
        $('#perhitungan').slideToggle()
    })
})

function innerProduct(input, metaData) {
    var result = {};
    _.forEach(metaData, function(value, key){
        var total = 0;
        var i = 0;
        _.forEach(input, function(item, index){
            if (result[key] == undefined) {
                result[key] = item * value[i];
            } else {
                result[key] += item * value[i];
            }
            i++;
        })
    })

    return result;
}

function cosine(input, metaData) {
    var result = {};
    _.forEach(metaData, function(value, key){
        var rootX = 0, rootY = 0, i = 0;
        _.forEach(input, function(item, index){
            if (result[key] == undefined) {
                result[key] = item * value[i];
            } else {
                result[key] += item * value[i];
            }
            rootX += Math.pow(item, 2);
            rootY += Math.pow(value[i], 2);
            i++;
        })
        rootX = Math.sqrt(rootX);
        rootY = Math.sqrt(rootY);

        result[key] /= (rootX * rootY);
    })

    return result;
}