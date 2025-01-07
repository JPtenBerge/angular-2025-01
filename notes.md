# Notes

## Coole links

- State of JS survey: https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/
- Frontend benchmarks: https://github.com/krausest/js-framework-benchmark
- Angular Material: https://material.angular.io/
- Angular roadmap: https://angular.dev/roadmap
- State management NgRx: https://ngrx.io/
- Angular-query van TanStack, tof voor HTTP-requests: https://tanstack.com/query/latest/docs/framework/angular/overview. Houdt zelf states bij als `isPending()` en `isSuccess()` (tof voor loading indicators) en kan GET-requests retryen.

## Playwright vs Cypress

-- warning: sterk mening gebonden --

- qua architectuur batchen ze commando's om naar de browser te sturen:
  ```js
  cy.get('...')....
  ```
  Interactie aangaan met pagina-elementen is irritant:
  ```js
  let tabelCountBefore = countTableRows();
  submitForm();
  expect(tabelCountBefore + 1);
  ```
- [geen native Promises](https://docs.cypress.io/api/utilities/promise)
- paywall: mag bijv. maar 1 domein bezoeken per test
  ```js
  cy.visit('https://localhost:28484');
  ```
- TypeScript is meh. Je beschrijft hoe jouw custom functies eruit zien, maar haakt er niet rechtstreeks op in.
- testrunner is wel erg fraai!

Maar Playwright:
- geen paywalls
- zowel TS, C# als Python
- interacties met pagina kan prima
- testrunner wordt steeds beter
- support meer browsers

## Over Angular

- gemaakt door Google
- AngularJS: 2009
- Angular: 2016
  - TypeScript
- rijkere/grotere architectuur

**Angular vs andere frameworks/libraries**

- Vue React Lit Qwik Vue Svelte Solid Inferno ... Knockout Blazor
- andere libs vaak lichtgewicht
- features: forms/backendcommunicatie/dependency injection
- Angular lijkt meer populair te zijn in enterprise

wat te kiezen overwegingsfactoren:
- features
- welke kennis is al aanwezig in je team/organisatie
- bedrijf
- populariteit
- docs/stackoverflow/AI-hulp
- support
- performance

**waarom JP Angular beter vindt dan de rest**

- alles testen
- algemene syntax
- algemene architectuur
- opinionated

**nadelen Angular**

- heel snel heel veel
- groot
  - leercurve++;
- veel importen
- opinionated
- waar we momenteel staan. "Angular Renaissance"
  - meerdere manieren hebt om dingen te doen
  - keuzes: end-to-end testen. unittesten	Jest Vitest

- backwards-compatible
  - Angular is behoorlijk
  - Angular Material MWOA

## Project maken

`@angular/cli` to the rescue!

- `ng new <projectnaam>`
- `ng serve` - start een webservertje en deployt jouw app
- `ng g c components/bla`
- `ng test`
  - `ng test --code-coverage`
- `ng e2e`
- `ng build`
- `ng add - schematic`


HET probleem wat ze proberen op te lossen: HET ALMACHTIGE DOM
- Document Object Model <== alle HTML-elementen op jouw pagina

```js
document.querySelector()
document.createElement()
.innerHTML
.innerText
.textContent
.setAttribute()
.className
.classList.add()
```

## Pipes

Handig voor data formatten!

default pipes:
- `uppercase`
- `lowercase`
- `date`
- `currency`
- `number`
- `percentage`
- `json` (debugging)
- `async`  (promises/observables)

## Unittesten

- steeds meer logica in onze frontends, dus steeds belangrijker om te testen
- testtooling is in limbo op het moment.
  - default keuze: Karma, hun eigen deprecated testrunner, + Jasmine (testframework)
  - andere opties:
    - Jest - heeft officiele, maar experimental runner
    - Vitest - Meta-framework Analog heeft dit geimplementeerd, maar er is nog bizar weinig over geschreven.

## Soorten webapps

SPA - Single Page App
- Angular React Vue Svelte
- die initiele paginaladen

SSR - Server-side Rendering
- complementair aan de SPA
- React Next.js, Vue Nuxt.js, Angular @angular/ssr, Svelte SvelteKit, Qwik QwikCity, 
  Solid SolidStart
- doet die allereerste paginabezoek wordt server-side gerenderd. Op de achtergrond wordt dan al die interactieve shizzle opgestuurd
    - hydration - incremental hydration / partial hydration - streaming hydration

SSG - Static Site Generation
- voor ieder product wordt er @ buildtime een `.html`-bestand gegenereerd
- 11ty Astro HUGO

MPA - Multi Page App
- PHP Spring ASP.NET WebForms/MVC/Core

## How to clone an object

```ts
let clone1 = { ...this.newConnector }; // shallow copy
let clone2 = lodash _.cloneDeep();
let clone3 = JSON.parse(JSON.stringify(this.newConnector)) // deep clone, maar beperkt qua datatypen: { x: 0n }
```

## Services/DI

Worden gebruikt voor:
- functionele services (NavigateService, berekeningen)
- data access layer - HTTPS/WebSockets/gRPC/WebTransport
- state management
  - wizards
  - data - store pattern - history
    - NgRx

## Backendcommunicatie

"hoe ververs ik mijn lijstje?"

1. direct toevoegen aan lokale array
   - nadeel: bij server error = ohoh
   - heul goed communiceren
   - voordeel: big snel
   - optimistic UI
2. wat er bij POST terugkomt, toevoegen aan lokale array
   - voordeel: redelijk sneller, 1 request maar
   - nadeel: niet volledig in sync met server - filtered/groepeerd/sortering
3. gewoon weer een GET en alle data ophalen
   - voordeel: meest in sync met de server
   - voordeel: dit is vaak het gemakkelijkst te implementeren - getAll()
   - nadeel: slooooooooooom. maximaal serverbelastend

waarom `HttpClient`? is `fetch()` niet voldoende?
- `HttpClient` werkt met Observables / RxJS
- `fetch()` - 500 wordt niet gezien als een error
- `HttpClient` heeft interceptors
  - request  JWT
  - response  '2024-01-06' datumstrings parsen
- JSON wordt al geparset voor je
- TypeScript, aangeven wat je terug verwacht: `this.http.get<Product[]>(...);`

## Routing

Best wat features!

- basaal routing
- parameters
- child routes
- lazy loading
- route resolvers
  - alvast wat data vroeg beginnen in te laden
- route guards
  - routes afschermen. niet ingelogd? dan mag je niet naar /admin

[De router was ook de reden dat Angular 3 niet uitkwam](https://stackoverflow.com/questions/41164866/why-was-angular-3-skipped-and-what-are-the-major-differences-in-angular-4-beta).

### Routing in een SPA

- bepaalde HTML-stukjes inladen
- andere components laten zien
- pagina's kan simuleren
- GEEN paginarefreshes

manieren:

1. alle 200 pagina-HTML ergens in je DOM opnemen
    ```html
    <div id="page-109" style="display: none;">...</div>
    <div id="page-10">...</div>
    <div id="page-11" style="display: none;">...</div>
    <div id="page-12" style="display: none;">...</div>
    <div id="page-13" style="display: none;">...</div>
    ```
2. alle 200 pagina-HTML ergens in je JS opnemen
   - dus heel veel template-strings
3. bij navigeren de HTML-template van de server ophalen - lazy-loading


Een pattern wat PWAs vaak gebruiken - PRPL:

- Push critical resources  <== SSR
- Render initial route   <== SSR
- Pre-cache additional routes
- Lazy-load the rest

In Angular routing aan de praat krijgen:

1. `<router-outlet />`  <== waar jouw pagina's/views in worden geplaatst
2. routes `app.routes.ts`  `provideRouter(routes)`
3. alles van `AppComponent` opsplitsen naar andere files

