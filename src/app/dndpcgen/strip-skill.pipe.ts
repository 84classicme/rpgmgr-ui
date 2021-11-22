import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripSkill'
})
export class StripSkillPipe implements PipeTransform {

  transform(value: string): string {
    if (value.substring(0,7) === "Skill: ") return value.substring(7)
    return value;
  }

}
