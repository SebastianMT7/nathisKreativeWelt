import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ImprintComponent } from './legal/imprint/imprint.component';
import { PrivacyPolicyComponent } from './legal/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: MainComponent, title: 'Nathis kreative Welt' },
    { path: 'main', component: MainComponent },
    { path: 'imprint', component:  ImprintComponent},
    { path: 'privacy-policy', component:  PrivacyPolicyComponent},    
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback-Route
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }