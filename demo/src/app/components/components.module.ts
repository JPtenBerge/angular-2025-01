import { NgModule } from "@angular/core";
import { AutocompleterComponent } from "./autocompleter/autocompleter.component";
import { LifeComponent } from "./life/life.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";


@NgModule({
    declarations: [AutocompleterComponent, LifeComponent], // (niet standalone!) components pipes directives
    imports: [JsonPipe, FormsModule, ReactiveFormsModule], // andere modules / standalone shizzle
    providers: [], // DI instellingen
    exports: [AutocompleterComponent, LifeComponent], // beschikbaar wil maken voor buitenwereld
})
export class ComponentsModule {

}