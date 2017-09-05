// Functions for random things

export function random_int_from_interval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function random_element_from_list(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export function get_position_in_direction(position, direction, distance = {'x': 1, 'y': 1}) {
    if (direction == 'n') {
        return {'x': position.x, 'y': position.y - distance.y};
    }
    if (direction == 'ne') {
        return {'x': position.x + distance.x, 'y': position.y - distance.y};
    }
    if (direction == 'e') {
        return {'x': position.x + distance.x, 'y': position.y};
    }
    if (direction == 'se') {
        return {'x': position.x + distance.x, 'y': position.y + distance.y};
    }
    if (direction == 's') {
        return {'x': position.x, 'y': position.y + distance.y}
    }
    if (direction == 'sw') {
        return {'x': position.x - distance.x, 'y': position.y + distance.y}
    }
    if (direction == 'w') {
        return {'x': position.x - distance.x, 'y': position.y};
    }
    if (direction == 'nw') {
        return {'x': position.x - distance.x, 'y': position.y - distance.y};
    }
}

export function get_opposite_direction(direction) {
    // i could have done this with a switch statement
    // but this is shorter and has also the same readability
    // i also could have done this with an integer between 1-8
    // and some math magic
    if (direction == 'n') return 's';
    if (direction == 'ne') return 'sw';
    if (direction == 'e') return 'w';
    if (direction == 'se') return 'nw';
    if (direction == 's') return 'n';
    if (direction == 'sw') return 'ne';
    if (direction == 'w') return 'e';
    if (direction == 'nw') return 'se';
}