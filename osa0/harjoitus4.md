```mermaid
sequenceDiagram
    title Full Stack open / Osa 0, harjoitus 4

    participant selain
    participant palvelin

    note left of selain: Käyttäjä syöttää sovellukseen muistiinpanon ja painaa Save-nappia

    selain->>palvelin: POST /exampleapp/new_note<br> payload: note=Test
    activate palvelin
    note right of palvelin: Palvelin tallentaa muistiinpanon
    palvelin-->>selain: Uudelleenohjaus: /exampleapp/notes
    deactivate palvelin

    selain->>palvelin: GET /exampleapp/notes
    activate palvelin
    palvelin-->>selain: HTML-koodi
    deactivate palvelin

    selain->>palvelin: GET /exampleapp/main.css
    activate palvelin
    palvelin-->>selain: main.css
    deactivate palvelin

    selain->>palvelin: GET /exampleapp/main.js
    activate palvelin
    palvelin-->>selain: main.js
    deactivate palvelin

    note left of selain: Selain suorittaa JavaScript-koodin, joka kysyy muistiinpanoja palvelimelta

    selain->>palvelin: GET /exampleapp/data.json
    activate palvelin
    note right of palvelin: Palvelin palauttaa max 100 muistiinpanoa
    palvelin-->>selain: [ { "content": "Test", "date": "2024-01-07T12:44:25.508Z" }, ... ]
    deactivate palvelin

    note left of selain: Selain suorittaa tapahtumankäsittelijän, joka renderöi muistiinpanot
```