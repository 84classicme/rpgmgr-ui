import { FocusMonitor } from '@angular/cdk/a11y';
import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateProficiencies2(): (group: FormGroup) => void {
  console.log("validateProficiencies");
  return (group: FormGroup) => {
    console.log("validateProficiencies2");
    
    
    console.log(group.get("artisantools"));
    console.log(group.get("instruments"));
    console.log(group.get("othertools"));
    console.log(group.get("languages")); 
    return null;
  };
}  

export const validateProficiencies: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log("validateProficiencies");
  const languages = control.get('languages');
  let numlangs = 0;
  const artisantools = control.get('artisantools');
  let numarts = 0;
  const othertools = control.get('othertools');
  let numothers = 0;
  const instruments = control.get('instruments');
  let numinsts = 0;
  if (languages && languages.value.length) {
    numlangs = languages.value.length;
  }
  if (artisantools && artisantools.value.length) {
    numarts = artisantools.value.length;
  }
  if (othertools && othertools.value.length) {
    numothers = othertools.value.length;
  }
  if (instruments && instruments.value.length) {
    numinsts = instruments.value.length;
  }
  return numlangs + numarts + numothers + numinsts > 2 ? { moreThan2Proficiencies: true } : null;
};

export const validateClassSkillDuplicates: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log("validateDuplicates");
  let value1 = "1";
  let value2 = "2";
  const options: FormArray = control.get('classSkillOptions') as FormArray;
  if(options && options.at(0)?.value && options.at(1)?.value){
    value1 = options.at(0).value;
    value2 = options.at(1).value;
  }
  return value1 === value2 ? { duplicateChoices: true } : null;
};