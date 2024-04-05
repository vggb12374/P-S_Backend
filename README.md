# psbackend

### Setup and run project:
1. run < npm install >
2. configure .env file by .env.example
3. run < npx prisma migrate deploy >
4. run < npx prisma generate >
5. run < npm start > for production
6. run < npm run dev > for development

### Migrations for the database:
1. run < npx prisma db pull >
2. run < npx prisma migrate dev --name migration_name >