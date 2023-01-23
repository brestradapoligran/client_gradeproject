import ClaimerModel from "./claimer.model";
import FeatureModel from "./feature.model";
import FeaturesModel from "./features.model";

export default class ObjectModel {
    id: string;
    name: string;
    description: string;
    status: string;
    type: string;
    claimer: ClaimerModel;
    features: FeatureModel[];

    constructor(id: string, name: string, description: string, status: string, type: string, claimer: ClaimerModel, features: FeaturesModel[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.type = type;
        this.claimer = claimer;
        this.features = features;
    }
}