import { IsString } from "class-validator";

export class CreateRamoDto {

    @IsString()
    ramo: string;
}
