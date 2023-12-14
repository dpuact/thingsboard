import { EntityType } from '@shared/models/entity-type.models';
import { EntityId } from './entity-id';

export class ReportId implements EntityId {
  entityType = EntityType.REPORT;
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}
