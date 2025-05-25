This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
Brezeanu Anca Elena, grupa 1132 SIMPRE
https://proiect-cloud-two.vercel.app/
https://www.youtube.com/watch?v=64S_rnNAOZY
https://github.com/ancabrezeanu/proiect-cloud
  
DAILY TASKS WEB APPLICATION

INTRODUCERE
Aplicația daily tasks web application este realizată pentru a veni în ajutorul organizării eficiente a obiceiurilor sănătoase zilnice. Este concepută pentru a fi ușor de folosit și urmărit de către orice utilizator. 
Userul poate selecta diferite obiective ce vrea să le bifeze zilnic în lista din pagina principală. Opțiunile din listă pot fi modificate, șterse sau marcate ca și finalizate. Se pot adăuga obiceiuri noi cu data în care se vrea a fi realizate, iar cele completate sunt trimise în lista obiceiuri finalizate pentru a ține evidența progresului făcut până în acel moment. 
În plus, utilizatorul poate folosi openAI chatbot pentru a cere sfaturi sau idei noi de obiceiuri, pe care le-ar putea adăuga în lista sa zilnică. 
API
API-ul folosit în această aplicație este un API REST simplu, care gestionează obiectivele zilnice ale utilizatorilor. Prin intermediul acestui API, se pot realiza operațiuni de creare, citire, actualizare și ștergere (CRUD) asupra obiectivelor salvate în baza de date MongoDB. Astfel, utilizatorii pot adăuga obiective noi, le pot vizualiza pe cele existente, pot modifica starea acestora sau le pot elimina.
Pentru obținerea tuturor obiectivelor, API-ul oferă un endpoint de tip GET care returnează lista completă a obiectivelor disponibile în baza de date. Adăugarea unui obiectiv se face printr-un endpoint POST, care primește un obiect JSON ce conține titlul obiectivului, data creării acestuia și starea de finalizare, care este setată implicit ca nefinalizat. După crearea obiectivului, API-ul returnează obiectivul nou cu un identificator unic generat.
Actualizarea unui obiectiv se face printr-un endpoint PUT, unde este necesar să se transmită identificatorul obiectivului și câmpurile ce urmează a fi modificate, cum ar fi starea de finalizare. Răspunsul de la API conține obiectivul actualizat conform modificărilor. Ștergerea unui obiectiv se realizează printr-un endpoint DELETE care primește identificatorul obiectivului în query string și îl elimină din baza de date.
Datele manipulate de API respectă un format JSON și conțin câmpurile principale ale unui obiectiv: titlul (un text descriptiv), data în format ISO a creării obiectivului și starea de finalizare, exprimată ca valoare booleană. Pentru securizarea accesului și protejarea datelor, aplicația folosește serviciul Clerk, care gestionează autentificarea utilizatorilor și controlează accesul la API prin intermediul unui middleware specializat.
Prin acest API, aplicația asigură funcționalități complete pentru gestionarea obiectivelor zilnice, permițând utilizatorilor să adauge rapid obiective predefinite sau personalizate, să marcheze obiectivele ca finalizate sau în curs, să le elimine pe cele vechi și să vizualizeze toate obiectivele în timp real, într-o interfață React modernă și intuitivă.
FLUX DE DATE
Fluxul de date în cadrul aplicației se desfășoară prin intermediul unor cereri HTTP către API-ul REST dezvoltat special pentru gestionarea obiectivelor utilizatorilor. Când utilizatorul interacționează cu interfața aplicației, acțiunile acestuia declanșează cereri de tip GET, POST, PUT sau DELETE către server, care returnează răspunsuri ce conțin datele solicitate sau confirmarea operațiunii efectuate.
Un exemplu de cerere este un GET care solicită lista tuturor obiectivelor stocate, răspunsul fiind o colecție JSON cu obiectivele și detaliile acestora, precum titlul, data și starea de finalizare. Pentru adăugarea unui obiectiv, interfața trimite o cerere POST cu un payload JSON ce conține datele obiectivului nou. Răspunsul este obiectivul adăugat, inclusiv cu un identificator unic generat. Modificările asupra unui obiectiv sunt trimise prin cererea PUT, în care se specifică id-ul obiectivului și câmpurile ce se doresc actualizate. Ștergerea se face prin cererea DELETE, care primește în query string identificatorul obiectivului ce trebuie eliminat.
Metodele HTTP utilizate sunt standard în arhitectura REST: GET pentru citirea datelor, POST pentru crearea de noi înregistrări, PUT pentru actualizarea acestora și DELETE pentru ștergere. Aceste metode permit o gestionare clară și simplă a resurselor din cadrul aplicației.
Pentru autentificarea și autorizarea accesului, aplicația folosește serviciul Clerk, care integrează un middleware în cadrul Next.js pentru a proteja rutele și API-urile. Astfel, doar utilizatorii autentificați pot accesa funcționalitățile aplicației legate de manipularea obiectivelor, prevenind accesul neautorizat și asigurând confidențialitatea datelor personale. Clerk gestionează fluxurile de autentificare, login, logout și validarea token-urilor pentru fiecare cerere făcută către API.


TEHNOLOGII FOLOSITE
Pentru dezvoltarea aplicației am ales Next.js, un framework modern pentru React, care oferă o experiență performantă și scalabilă, fiind ideal pentru aplicații web dinamice. Next.js ne permite să construim atât partea de client, cât și cea de server într-un mod integrat, facilitând gestionarea rutelor și API-urilor.
Partea de stocare a datelor este realizată cu MongoDB Atlas, o soluție cloud de baze de date NoSQL complet gestionată, care oferă flexibilitate, scalabilitate și securitate. Folosind MongoDB Atlas, datele utilizatorilor și obiectivele lor sunt stocate în siguranță, iar accesul este rapid și fiabil indiferent de locația utilizatorului.
Pentru autentificare și gestionarea securității utilizatorilor, am integrat Clerk, o platformă cloud dedicată autentificării moderne, care oferă funcționalități de login, logout, protecție și management al sesiunilor, toate cu o integrare simplă și sigură pentru aplicațiile Next.js.
Pentru găzduirea și distribuirea aplicației am folosit Vercel, o platformă cloud specializată pe aplicații Next.js, care asigură un proces de deploy rapid și simplu, cu scalare automată și performanță optimă. Vercel oferă un mediu de hosting global, astfel încât aplicația se încarcă rapid indiferent de locația utilizatorului final, iar actualizările sunt implementate instantaneu prin integrarea cu GitHub. Folosind Vercel, am putut să ne concentrăm pe dezvoltarea funcționalităților, în timp ce infrastructura cloud se ocupă de partea de hosting și livrare.
De asemenea, pentru funcționalitatea de asistent AI am folosit serviciile OpenAI, care rulează în cloud și oferă capabilități avansate de procesare a limbajului natural. Astfel, utilizatorii pot primi sugestii inteligente pentru obiective personalizate, fără a necesita o infrastructură complexă de procesare locală.
Prin folosirea acestor tehnologii cloud, aplicația este construită să fie scalabilă, sigură și ușor de întreținut, oferind o experiență fluidă și modernă pentru utilizatori.

CAPTURI DE ECRAN
 
	REFERINȚE
Pentru realizarea acestui proiect am folosit mai multe resurse și documentații oficiale care mi-au oferit informațiile și suportul necesar pentru implementarea corectă a funcționalităților. Documentația oficială Next.js a fost esențială pentru structura și dezvoltarea aplicației web, oferind ghiduri clare privind gestionarea paginilor, API routes și middleware. De asemenea, pentru stilizarea aplicației am folosit Tailwind CSS, iar documentația oficială Tailwind a fost un reper important pentru definirea designului responsive și modern.
Pentru partea de autentificare și securitate, am integrat serviciul Clerk, utilizând ghidurile și exemplele oferite de site-ul oficial Clerk.dev, care m-au ajutat să configurez rapid autentificarea utilizatorilor și protejarea rutelor în aplicația Next.js. În plus, pentru gestionarea datelor și operațiilor CRUD, am folosit MongoDB Atlas ca soluție de baze de date în cloud, iar documentația MongoDB a fost un ajutor important pentru conexiunea și manipularea datelor în mod eficient.
Nu în ultimul rând, pentru integrarea inteligenței artificiale și generarea automată a răspunsurilor, am folosit API-ul OpenAI, iar documentația OpenAI a fost esențială pentru configurarea corectă și optimizarea cererilor către modelul GPT. În plus față de aceste surse principale, am consultat diverse tutoriale, forumuri și articole online care au contribuit la înțelegerea și rezolvarea unor probleme specifice apărute pe parcursul dezvoltării proiectului.

