/**
 * Created by ivan on 01.03.17.
 */

import {Component, Input} from '@angular/core';
import {defaultPhoto} from '../../config';

@Component({
    selector: 'winners-list',
    templateUrl: './winners_list.html'
})
export class WinnersList {
    @Input() winners;

    baseFriend = {
        photo: defaultPhoto,
        level: 0
    };
}