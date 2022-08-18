
# Konkursni zadatak Inviggo - Petar Maletin

## Lokalno pokretanje

Uputstvo za pokretanje aplikacije:

1) Klonirajte moj git repozitorijum u željeni direktorijum.                 
1.1)
``` git clone https://github.com/ppettarrm/Inviggo```

2) Kreirajte nalog na MongoDB Atlasu.
2.1) Dodajte svoju trenutnu IP adresu u Network Access  
2.2) Kreirajte nalog u Database security odeljku    
2.2) Idite na Database -> kliknite Connect -> Connect your Application  
2.3) Izmenite <password> sa lozinkom koju ste kreirali u koraku 2.2)    
2.4) Između ...mongodb.net/ i ? stavite naziv kako želite da vam se zove database     
2.5) Kopirajte URL 

3) Otvorite projekat u nekom IDE                            
3.1) Idite u Inviggo/apps/server/app.js     
3.2) Umesto linka koji je trenutno parametar funkcije connect, nalepite Vaš 
URL koji ste prethodno kopirali             
3.3) U terminalu, pokrenite aplikaciju tako što ćete ukucati (bez Terminal>):       
```Terminal> npm run dev```     
3.4) U terminalu ćete dobiti povratnu informaciju o tome da li su 
server i client pokrenuti   
3.5) Kliknite na link, koji će Vas odvesti na web aplikaciju.

    
## Tech Stack - MERN

**Client:** React

**Server:** NodeJS, Express

**Database:** MongoDB

## Authors

- [@ppettarr](https://www.github.com/ppettarrm)

