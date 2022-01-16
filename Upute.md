# Pokretanje aplikacije

Za pokretanje ove aplikacije na vlastitom računalo potrebno je slijediti ove upute. Upute su napisane sa gledišta korisnika Windows OS-a.

1. Instalirati neku distribuciju Linuxa na VM VirtualBox ili sl. - korišten je Ubuntu 20.04 LTS
2. U postavka VM-a za Ubuntu, postaviti u mrežnim opcijama **Adapter** na **Premošćeni adapter**
3. U Postgres terminalu kreirati novu ulogu i dodijeliti joj lozinku
4. Kreirati novu bazu i pokrenuti skriptu **nadaSvakeMameDB.sql**
5. Na Linuxu dopustiti SSH povezivanje i otvoriti port 5432 u firewallu
6. Instalirati Putty
7. Podesiti Putty postavke kako slijedi: Connection > SSH > Tunnels (Source port: 5432, Destination port: localhost:5432 -> kliknuti Add)
8. Unijeti IP adresu virtualne mašine i spojiti se (**ip a** u Linux terminalu)
9. Na Windows OSu Instalirati NodeJS LTS
10. U projektu pronaći datoteku **database.js** na lokaciji **/lib/Database/database.js** i promijeniti connectionString u retku 4 prema uputama
11. Otvoriti projekt u nekom Editoru, npr. VS Code
12. Pozicionirati se u mapu **nada_svake_mame** (root) i u terminalu pokrenuti komandu **npm i**
13. Nakon instalacije, u istom terminalu izvršiti komandu **npm run dev**, alternativno **npm build** te nakon toga **npm start** (duže traje da se pokrene ali brže radi)
14. U web pregledniku upisati adresu **localhost:3000**
15. Za korištenje dijela aplikacije namijenjenog za administratore, potrebno se prijaviti
    odlaskom na adresu localhost:3000/auth/login sa sljede ́cim korisni ˇckim podacima
    –> email: a1zan.zlender@gmail.com, lozinka: 12345678

## Projekt je moguće preuzeti na ovom linku https://github.com/zanzlender/nada_svake_mame
