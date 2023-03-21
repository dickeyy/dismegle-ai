const convertPunishmentInt = function(punishment) {
    // convert the punishment int to a string
    toString(punishment);
    switch (punishment) {
        case '0':
            return 'None';
        case '1':
            return 'Omegle Vocabulary';
        case '2':
            return 'Advertising';
        case '3':
            return 'NSFW';
    }
}

exports.convertPunishmentInt = convertPunishmentInt;