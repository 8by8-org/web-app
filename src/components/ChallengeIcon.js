import React from 'react';
import Icon1_0 from '../assets/images/challenge/icon_1_0.svg';
import Icon2_0 from '../assets/images/challenge/icon_2_0.svg';
import Icon3_0 from '../assets/images/challenge/icon_3_0.svg';
import Icon4_0 from '../assets/images/challenge/icon_4_0.svg';
import Icon5_0 from '../assets/images/challenge/icon_5_0.svg';
import Icon6_0 from '../assets/images/challenge/icon_6_0.svg';
import Icon7_0 from '../assets/images/challenge/icon_7_0.svg';
import Icon8_0 from '../assets/images/challenge/icon_8_0.svg';
import Icon1_1 from '../assets/images/challenge/icon_1_1.svg';
import Icon2_1 from '../assets/images/challenge/icon_2_1.svg';
import Icon3_1 from '../assets/images/challenge/icon_3_1.svg';
import Icon4_1 from '../assets/images/challenge/icon_4_1.svg';
import Icon5_1 from '../assets/images/challenge/icon_5_1.svg';
import Icon6_1 from '../assets/images/challenge/icon_6_1.svg';
import Icon7_1 from '../assets/images/challenge/icon_7_1.svg';
import Icon8_1 from '../assets/images/challenge/icon_8_1.svg';

const uncompletedIcons = [Icon1_0, Icon2_0, Icon3_0, Icon4_0, Icon5_0, Icon6_0, Icon7_0, Icon8_0];
const completedIcons = [Icon1_1, Icon2_1, Icon3_1, Icon4_1, Icon5_1, Icon6_1, Icon7_1, Icon8_1];

export default function ChallengeIcon({ day, completed }) {
    day = parseInt(day);
    if (isNaN(day)) {
        throw new TypeError('day attribute must be an integer');
    }
    if (day > 8 || day < 1) {
        throw new TypeError('day attribute must be between 1 and 8 inclusive');
    }

    // we will do all the styling and attributes here without passing unnecessary props
    return (
        <img src={(completed ? completedIcons : uncompletedIcons)[day - 1]} alt='Challenge Icon' width={100} />
    )
}
