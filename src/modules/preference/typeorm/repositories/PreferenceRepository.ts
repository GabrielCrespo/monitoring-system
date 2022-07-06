import { EntityRepository, Repository } from "typeorm";
import Preference from "../entities/Preference";

@EntityRepository(Preference)
class PreferenceRepository extends Repository<Preference> {
  public async findById(id: number): Promise<Preference | undefined> {
    const preference = await this.findOne({
      where: {
        id,
      },
    });

    return preference;
  }
}

export default PreferenceRepository;
