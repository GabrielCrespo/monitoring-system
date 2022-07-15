import { getCustomRepository } from "typeorm";
import MonitoringTime from "../typeorm/entities/MonitoringTime";
import MonitoringTimeRepository from "../typeorm/repositories/MonitoringTimeRepository";

class ListMonitoringTimeService {
  public async execute(): Promise<MonitoringTime[]> {
    const monitoringTimeRepository = getCustomRepository(
      MonitoringTimeRepository
    );

    const monitoringTimes = await monitoringTimeRepository.find();

    return monitoringTimes;
  }
}

export default ListMonitoringTimeService;
