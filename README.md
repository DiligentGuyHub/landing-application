# Application Set-up
1. Rename `/server/config.template.json` to `/server/config.json`. Connection string isn't required by default as far as it's also configured as process environment variable in `docker-compose.yml`. By default you may want to leave email dispatch disabled.
2. Run `docker-compose up --build` in the root folder of the application.
