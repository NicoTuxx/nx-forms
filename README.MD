# nx-forms

## Installation

To install this library, run:

```bash
$ npm install nx-forms --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install nx-forms
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NxFormsModule } from 'nx-forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NxFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<nx-input
  type="text"
  label="Input"
  [model]="nxInput"
  (ngModelChange)="nxInput = $event"
  [required]="true"
  help="you can see the result below.">
</nx-input>
```

For more informations, you can run the playground page to see other examples.

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [NicoTuxx](mailto:nicotuxxdev@gmail.com)
