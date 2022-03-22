import { Pipe, PipeTransform } from "@angular/core";
import moment from 'moment';
@Pipe({
    name: 'formatDate'
})
export class FormatDate implements PipeTransform{
    transform(date: string): string {
        return moment(date).fromNow();
    }

}