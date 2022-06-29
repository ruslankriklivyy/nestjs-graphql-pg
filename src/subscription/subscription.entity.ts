import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'subscriptions' })
export class SubscriptionEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: string;

  @Column
  title: string;

  @Column
  price: number;

  @Column
  hexColor: string;
}
