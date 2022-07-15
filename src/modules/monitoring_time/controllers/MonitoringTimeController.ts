import { Request, Response } from "express";
import ListMonitoringTimeService from "../services/ListMonitoringTimeService";

class MonitoringTimeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMonitoringTimeService = new ListMonitoringTimeService();

    const monitoringTime = await listMonitoringTimeService.execute();

    return response.json(monitoringTime);
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const showGenderService = new ShowGenderService();

  //   const gender = await showGenderService.execute({ id: Number.parseInt(id) });

  //   return response.json(gender);
  // }

  // public async create(request: Request, response: Response): Promise<Response> {
  //   const { dia_da_semana, hora_inicio, hora_fim } = request.body;
  //   console.log(hora_inicio);

  //   const createMonitoringTimeService = new CreateMonitoringTimeService();

  //   const monitoringTime = await createMonitoringTimeService.execute({
  //     dia_da_semana,
  //     hora_inicio,
  //     hora_fim,
  //   });

  //   return response.json(monitoringTime);
  // }

  //   public async update(request: Request, response: Response): Promise<Response> {
  //     const { descricao } = request.body;
  //     const { id } = request.params;

  //     const updateGenderService = new UpdateGenderService();

  //     const gender = await updateGenderService.execute({
  //       id: Number.parseInt(id),
  //       descricao,
  //     });

  //     return response.json(gender);
  //   }

  //   public async delete(request: Request, response: Response): Promise<Response> {
  //     const { id } = request.params;

  //     const deleteGenderService = new DeleteGenderService();

  //     await deleteGenderService.execute({ id: Number.parseInt(id) });

  //     return response.json([]);
  //   }
}

export default MonitoringTimeController;
