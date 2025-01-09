# Todo

- RxJS
- 👀 Youri een frontendguy maken
- waarom Angular?
- ✔ wat zijn fatsoenlijke common practices
  - ✔ moderne shit: Zoneless, signals, zoveel mogelijk standalone, 
- fatsoenlijk testen
- wanneer iets in een component, wanneer in een service
  - als je iets wil renderen - HTML? component
  - anders service
  - ook service: als component te groot wordt
- ✔ subscribe en listenen
  - consistentie is key
  - mooie operators
  - geen .subscribe() mag doen in een component.ts
- CLI-snufjes
- devsetup
  - ESLint


React wil graag microcomponentjes:

```html
<ul>
	<ListItem />
</ul>
```

## Reactive Forms
- gaan dingen minder snel kapot want je zit in code?
- Reactive Forms makkelijker te herbruiken
- scheiding fijner: overzichtelijker/leesbaarder
- veel makkelijker unittestbaar
- custom validators is gewoon een functie ipv directive

## Modules

- makkelijk importeerbaar - `CommonModule` `FormsModule`
  - voordeel: `JsonPipe` `DatePipe` `CurrencyPipe`  - `CommonModule`
- lijkt op C# namespace/Java package
- eigenlijk enkel maar een kapstok, functioneel doet het niks
- routing lazy loading
  - standalone component lazy loading werkt ook tegenwoordig!
- OCD
- standalone is tegenwoordig de default  `@Pipe({ ..., standalone: true })`


## Signals

- veranderende waarden
- `BehaviorSubject`, maar:
  - ingebakken bij Angular, dus geen RxJS-lib
  - versimpeld. geen operators.
- versimpelde reactivity
  - NOOIT TE UNSUBSCRIBEN
  - geen `markForCheck()`

3 main signalsfunctie:
- `signal()` - gewoon een signal met waarde, schrijfbaar
- `computed()`
- `effect()`

Maar sinds kort ook:
- input signal
- output signal
- `linkedSignal()` - `computed()` met `.set()`
- `resource()`

Ga ik met signals aan de slag of met RxJS Observables?
- hoe complex is de use case?
  - 7 streams met vele bewerkingsslagen => RxJS met fancy operators
- nieuw project?
  - hele strakke deadline? nee.
  - anders: ja
- bestaand project?
  - zijn ze al over aan het gaan naar signals? ja
  - nee.

## E2E - Playwright

Page object model is fijn voor onderhoudbaarheid:

```js
test('adds a connector to the table when the form is submitted', async ({ page }) => {
	await po.fillForm({ name: '...', type: '...' });
	await po.submitForm();
	await po.countConnectors();
});
```

## change detection

- WPF `INotifyPropertyChanged`
- Knockout.js  `this.name('Frank');`
- Vue  Proxy
- React `.setState()`
- Lit `.updateAndRender()`
- Svelte   assignment detection
  - `variabele = 4`
  - `products = products;`
- Angular  complex algoritme
  ```html
  <button (click)="doeIets()">
  ```

Elke change detection cycle evalueert alle databindingexpressies:
```text
{{text}}
@if ()
@for()
[src]=""
```
```html
<crud-grid>

<td>
	{{column.displayValue}}

	@if (row.inEditMode) {
		<input type="text">
		@if (column.type === 'password') {
			<input type="password">
		}
		@if (column.type === 'password') {
			<input type="password">
		}
		@if (column.type === 'password') {
			<input type="password">
		}
		@if (column.type === 'password') {
			<input type="password">
		}
		@if (column.type === 'password') {
			<input type="password" formControlName="">
		}
		@if (column.type === 'password') {
			<input type="password">
		}
	}
</td>
```

7 kolommen x 50 rijen x 7 expressies per cel = 2450 expressies

## Zone.js

"open-heart surgery on the browser"

```ts
// wat Zone.js doet:
let originalTimeout = window.setTimeout;

window.setTimeout = (callback, ms) => {
	originalTimeout(() => {
		callback();
		runChangeDetectionCycle();
	}, ms);
};

		setTimeout(() => {
			this.name = 'Tijmen';
		}, 1000);
```
```ts
undefined = 'hoi';
```
```ts
// AngularJS?
$timeout(() => { ... }, 2000);
```
