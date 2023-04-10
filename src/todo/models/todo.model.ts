export enum TodoStatusEnum {
  'actif' = 'En Cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export class TodoModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
}
