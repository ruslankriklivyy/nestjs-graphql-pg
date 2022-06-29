import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { SubscriptionEntity } from './subscription.entity';
import { Subscription } from './models/subscription.model';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('SUBSCRIPTIONS_REPOSITORY')
    private subscriptionsRepository: typeof SubscriptionEntity,
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.findAll({});
  }

  async findOne(id: string): Promise<Subscription> {
    return this.subscriptionsRepository.findOne({ where: { id } });
  }

  async createOne(
    body: Omit<Subscription, 'id' | 'userId'>,
  ): Promise<Subscription> {
    return this.subscriptionsRepository.create(body);
  }

  async updateOne(
    id: string,
    body: Omit<Subscription, 'id' | 'userId'>,
  ): Promise<Subscription> {
    try {
      await this.subscriptionsRepository.update(body, {
        where: { id },
        returning: true,
      });
      return this.subscriptionsRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Subscription not updated',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOne(id: string) {
    const deletedCount = await this.subscriptionsRepository.destroy({
      where: { id },
    });
    return { deletedCount };
  }
}
