import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Entity, EntityDocument } from "../schemas/entity.schema";
import { CategoriesService } from "../services/categories.service";

@Injectable()
export class EntitiesService {
  constructor(@InjectModel(Entity.name) private readonly entityModel: Model<EntityDocument>,
              private readonly categoriesService: CategoriesService) {
  }
  getAllEntities() {
    return this.entityModel.find();
  }

  async getTotalNumber() {
    return this.entityModel.countDocuments();
  }

  async getCategories() {
    const result = await this.entityModel.distinct('category');
    return this.categoriesService.getGroupedItems(result);
  }

  async getRandomEntity() {
    const result = await this.entityModel.countDocuments();
    return this.entityModel.findOne({ id: Math.ceil(Math.random() * result) });
  }
}