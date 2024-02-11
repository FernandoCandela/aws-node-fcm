import { schema } from "../models/people.model";
import PeopleRepository from "../../infrastructure/repositories/people.repository";

const peopleRepository: PeopleRepository = new PeopleRepository();

export async function savePeople(people: any): Promise<any> {
  await schema.validate(people, { abortEarly: false });

  people = await peopleRepository.createPeople(people);

  return people;
}
