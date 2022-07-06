import Course from "@modules/course/typeorm/entities/Course";
import CourseRepository from "@modules/course/typeorm/repositories/CourseRepository";
import Gender from "@modules/gender/typeorm/entities/Gender";
import GenderRepository from "@modules/gender/typeorm/repository/GenderRepository";
import Quota from "@modules/quota/typeorm/entities/Quota";
import QuotaRepository from "@modules/quota/typeorm/repositories/QuotaRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Preference from "../typeorm/entities/Preference";
import PreferenceRepository from "../typeorm/repositories/PreferenceRepository";

interface IRequest {
  curso: Course;
  genero: Gender;
  cota: Quota;
}

class CreatePreferenceService {
  public async execute({ curso, genero, cota }: IRequest): Promise<Preference> {
    const preferenceRepository = getCustomRepository(PreferenceRepository);

    const courseRepository = getCustomRepository(CourseRepository);
    const generoRepository = getCustomRepository(GenderRepository);
    const quotaRepository = getCustomRepository(QuotaRepository);

    const courseExists = await courseRepository.findOne(curso.id);

    if (!courseExists) {
      throw new AppError("Não foi possível encontrar o curso!");
    }

    const generoExists = await generoRepository.findById(genero.id);

    if (!generoExists) {
      throw new AppError("Não foi possível encontrar o gênero!");
    }

    const quotaExists = await quotaRepository.findOne(cota.id);

    if (!quotaExists) {
      throw new AppError("Não foi possível encontrar o tipo de cota!");
    }

    const preference = preferenceRepository.create({
      curso,
      genero,
      cota,
    });

    await preferenceRepository.save(preference);

    return preference;
  }
}

export default CreatePreferenceService;
