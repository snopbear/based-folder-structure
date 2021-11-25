import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class FakeApiService implements InMemoryDbService {
  constructor() {}
  createDb() {
    return {
      employees: [
        {
          id: 1,
          fullName: 'Mark',
          contactPreference: 'email',
          email: 'mark@email.com',
          phone: '5641238971',
          skills: [
            {
              skillName: 'C#',
              experienceInYears: 1,
              proficiency: 'beginner',
            },
            {
              skillName: 'Java',
              experienceInYears: 2,
              proficiency: 'intermediate',
            },
          ],
        },
        {
          id: 2,
          fullName: 'John',
          contactPreference: 'phone',
          email: 'john@email.com',
          phone: '3242138971',
          skills: [
            {
              skillName: 'Angular',
              experienceInYears: 2,
              proficiency: 'beginner',
            },
            {
              skillName: 'HTML',
              experienceInYears: 2,
              proficiency: 'intermediate',
            },
            {
              skillName: 'LINQ',
              experienceInYears: 3,
              proficiency: 'advanced',
            },
          ],
        },
      ],
    };
  }
}
