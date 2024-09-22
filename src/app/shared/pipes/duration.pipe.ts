import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(mins: string): string {

    const time = Number(mins);
    if (!time || time < 0) {
      return '0 min';
    }

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    let result = '';

    if (hours > 0) {
      result += `${hours}h `;
    }

    if (minutes > 0) {
      result += `${minutes}min`;
    }

    return result.trim();
  }

}
