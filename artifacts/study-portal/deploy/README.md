# Nginx example

The app uses Replit's managed path router when running on Replit. This example
is for a separate host where Nginx serves the built frontend and the Node API
listens on port `8080`.

Build the frontend with:

```sh
pnpm --filter @workspace/study-portal run build
```

Copy the contents of `artifacts/study-portal/dist/public` to
`/var/www/study-portal`, then adapt `nginx.conf.example` for your domain and
host paths. Keep `/api/` pointed at this app's own backend; this configuration
does not proxy arbitrary user-supplied destinations.
