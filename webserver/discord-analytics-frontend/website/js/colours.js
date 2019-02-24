// COLOURS!
function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.8 + ')';
}

function generate_color_list(list) {
    var color_list = []
    for (var i = 0; i < list.length; i++) {
        color_list.push(random_rgba());
    }
    return color_list
}

function generate_one_color_list(list, color) {
    var color_list = []
    for (var i = 0; i < list.length; i++) {
        color_list.push(color);
    }
    return color_list
}

function generate_rainbow(size) {
    function sin_to_hex(i, phase, size) {
        var sin = Math.sin(Math.PI / size * 2 * i + phase);
        var int = Math.floor(sin * 127) + 128;
        var hex = int.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    }

    function hexToRgbA(hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.6)';
        }
        throw new Error('Bad Hex');
    }

    var rainbow = new Array(size);
    for (var i = 0; i < size; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3, size); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3, size); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3, size); // 240 deg

        rainbow[i] = hexToRgbA("#" + red + green + blue);
    }

    return rainbow
}