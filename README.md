# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Autore
Nome: Luca Canzoneri
Email: luca.canzoneri1@gmail.com
Tel: 3420943393

## Descrizione progetto
Come richiesto, per sviluppare questa web application è stato utilizzato React Js.

Per prendere i dati relativi al meteo è stato utilizzato il servizio https://openweathermap.org con la "One Call API", la quale passando come parametri latitudine e longitudine oppure il nome della città (oltre all'Api key fornita in fase di registrazione e alcuni parametri opzionali) fornisce le specifiche informazioni.

Appena si atterra sulla pagina, in base alla posizione vengono mostrate le informazioni relative al meteo. Dato che la posizione viene determinata grazie a latitudine e longitudine, è stato cercato un servizio che ne ricavasse il nome della città (https://us1.locationiq.com/) che purtroppo non è funzionante.

Cercando una città per nome nell'apposito campo input viene effettuata la chiamata al servizio di openWeather, passando come parametro la città, il quale rifornisce le informazioni. 
Cliccando sul pulsante add localization vengono ricalcolate le informazioni in base alla posizione attuale.

## Utilizzo di Redux
Date le richieste, è stato utilizzato Redux per salvare le città decise dall'utente.
Il numero massimo di città selezionabili è 2.
######Per salvare le città basta cliccare su "Aggiungi città".
Dunque, vengono salvate le informazioni in un oggetto per poi essere stampate, e quindi ricordate dall'utente.

## Slider
Per lo slider è stato utilizzato "React multi-carousel", una libreria che genera uno slider responsive fornendone le configurazioni.

## Organizzazione del progetto
- components: cartella con i componenti utilizzati, ognuno con il proprio .css
- homepage: cartella con le logiche della homepage
- images
- redux: cartella contenente le logiche di redux

## Altre librerie
Un'altra libreria utilizzata nel progetto è Bootstrap, per velocizzare e semplificare lo stile dei componenti.

